#!/usr/bin/env node

import { execFile, spawn } from 'node:child_process';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { promisify } from 'node:util';
import process from 'node:process';
import nodemailer from 'nodemailer';
import { validateDrafts } from './news-worker-validation.mjs';

const run = promisify(execFile);
const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '');

const readEnv = (name, fallback) => process.env[`NEWS_${name}`] ?? process.env[`BLOG_${name}`] ?? fallback;

try {
  const envFile = await readFile(`${root}/.env.local`, 'utf8');
  for (const line of envFile.split('\n')) {
    const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
    if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const varDir = `${root}/var/news-worker`;
const statePath = `${varDir}/state.json`;
const schemaPath = `${root}/scripts/news-article.schema.json`;
const contentRoot = `${root}/src/content/news`;
const contentRootPath = resolve(contentRoot);
const maxArticles = Number(readEnv('MAX_ARTICLES', '3'));
const dryRun = readEnv('DRY_RUN', 'false') === 'true';
const codexBin = readEnv('CODEX_BIN', 'codex');
const codexTimeoutMs = Number(readEnv('CODEX_TIMEOUT_MS', '180000'));
const branch = readEnv('BRANCH', 'automation/news');
const smtpHost = readEnv('SMTP_HOST', 'smtp.dondominio.com');
const smtpPort = Number(readEnv('SMTP_PORT', '587'));
const smtpSecure = readEnv('SMTP_SECURE', 'false') === 'true';
const smtpUser = readEnv('SMTP_USER', 'alerts@conquense.dev');
const smtpPassword = readEnv('SMTP_PASSWORD');
const mailFrom = readEnv('MAIL_FROM', smtpUser);
const mailTo = readEnv('MAIL_TO', 'rafaelgarcia1985@hotmail.com');

const fail = (message) => {
  throw new Error(message);
};

async function readState() {
  try {
    return JSON.parse(await readFile(statePath, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return { proposedSourceUrls: [], runs: [] };
    throw error;
  }
}

async function existingArticles() {
  const languages = ['es', 'en'];
  const articles = [];
  for (const lang of languages) {
    const dir = `${contentRoot}/${lang}`;
    let files = [];
    try {
      files = await readdir(dir);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    for (const file of files.filter((name) => name.endsWith('.md'))) {
      const content = await readFile(`${dir}/${file}`, 'utf8');
      const sourceUrl = content.match(/^sourceUrl:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1];
      const translationId = content.match(/^translationId:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1];
      if (sourceUrl) articles.push({ lang, sourceUrl, translationId });
    }
  }
  return articles;
}

function promptForArticles(knownUrls, knownTranslationIds) {
  return `You are the research and editorial stage of a local technical news worker.

Use live web search. Find up to ${maxArticles} recent, genuinely useful technology news items about software engineering, JavaScript, TypeScript, frontend architecture, browser APIs, web tooling, testing, maintainability, applied AI, security, systems, or web performance. Include frontend and JavaScript ecosystem stories when they contain substantial technical lessons, not merely release announcements.

Reserve at most one of the ${maxArticles} total slots for a regional story when one meets the same editorial bar. A regional story must be connected to Cuenca, its province, or Castilla-La Mancha and must have technology at its centre: software, AI, cybersecurity, data centres or cloud infrastructure, digital fabrication, robotics, university research, health technology, agri-tech, tourism technology, or rural digitisation. If no suitable regional story exists, fill the available slots with general technical news.

Rules:
- Return ONLY valid JSON matching the supplied schema. No Markdown fences and no commentary.
- Write an original 400-700 word article in Spanish and a faithful English translation.
- Do not copy source text, invent facts, or use a source without a canonical URL, publisher, title and publication date.
- Prefer primary sources or reliable technical reporting. Explain why each item matters technically without strong unsupported opinions.
- For regional stories, prefer primary sources such as UCLM, ITECAM, FabLab Cuenca, the Junta de Comunidades, CRID or the companies involved. Do not turn a political announcement or a generic event notice into a technical story.
- Reject items that are primarily gadgets, marketing announcements without technical substance, politics, finance, or duplicate coverage.
- Include the short AI transparency note: "Contenido generado automáticamente con IA." for Spanish and "AI-generated content." for English.
- Use lowercase URL-safe slugs, with the same translationId in both language objects.
- For a regional story, include "cuenca" or "castilla-la-mancha" as a tag in both language objects. Keep the tag spelling stable so the archive filter can identify it.
- Skip any source URL already known: ${JSON.stringify(knownUrls)}.
- Do not reuse any existing translationId: ${JSON.stringify(knownTranslationIds)}.
- If no item meets the bar, return {"articles":[]}.

The result must contain one article object per language for each story, so every story has exactly one es and one en object sharing translationId.`;
}

async function generateDrafts(knownUrls, knownTranslationIds) {
  const prompt = promptForArticles(knownUrls, knownTranslationIds);
  const raw = await new Promise((resolve, reject) => {
    const child = spawn(codexBin, [
      '--search',
      '-a', 'never',
      '-C', root,
      'exec',
      '--ephemeral',
      '-s', 'read-only',
      '--output-schema', schemaPath,
      '-',
    ], { cwd: root, stdio: ['pipe', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    let settled = false;
    const timer = setTimeout(() => {
      child.kill('SIGTERM');
      if (!settled) {
        settled = true;
        reject(new Error(`Codex superó el tiempo máximo de ${Math.round(codexTimeoutMs / 1000)} segundos.`));
      }
    }, codexTimeoutMs);
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('error', (error) => {
      clearTimeout(timer);
      if (!settled) { settled = true; reject(error); }
    });
    child.on('close', (code, signal) => {
      clearTimeout(timer);
      if (settled) return;
      settled = true;
      if (code !== 0) {
        reject(new Error(stderr.trim() || `Codex terminó con código ${code ?? 'desconocido'}${signal ? ` (${signal})` : ''}.`));
        return;
      }
      resolve(stdout);
    });
    child.stdin.end(prompt);
  });
  const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start < 0 || end <= start) fail('Codex no devolvió un objeto JSON.');
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    fail('Codex no devolvió JSON válido.');
  }
}

async function writeDrafts(groups) {
  const files = [];
  try {
    for (const group of groups) {
      for (const article of [group.es, group.en]) {
        const dir = resolve(contentRootPath, article.lang);
        const path = resolve(dir, `${article.slug}.md`);
        if (!path.startsWith(`${contentRootPath}${sep}`)) fail('La ruta del borrador queda fuera del contenido de noticias.');
        try {
          await readFile(path);
          fail(`El archivo del borrador ya existe: ${path}`);
        } catch (error) {
          if (error.code !== 'ENOENT') throw error;
        }
        await mkdir(dir, { recursive: true });
        const frontmatter = [
          '---',
          `translationId: ${article.translationId}`,
          `lang: ${article.lang}`,
          `slug: ${article.slug}`,
          `title: ${JSON.stringify(article.title)}`,
          `description: ${JSON.stringify(article.description)}`,
          `publishedAt: ${article.publishedAt}`,
          `sourceName: ${JSON.stringify(article.sourceName)}`,
          `sourceTitle: ${JSON.stringify(article.sourceTitle)}`,
          `sourceUrl: ${JSON.stringify(article.sourceUrl)}`,
          ...(article.author ? [`author: ${JSON.stringify(article.author)}`] : []),
          `tags: [${article.tags.map((tag) => JSON.stringify(tag)).join(', ')}]`,
          `readingTime: ${article.readingTime}`,
          `aiDisclosure: ${JSON.stringify(article.aiDisclosure)}`,
          '---',
          '',
          article.body.trim(),
          '',
        ].join('\n');
        await writeFile(path, frontmatter, 'utf8');
        files.push(path);
      }
    }
  } catch (error) {
    await Promise.all(files.map((file) => rm(file, { force: true })));
    throw error;
  }
  return files;
}

async function cleanupDrafts(files) {
  for (const file of files) {
    const status = (await git(['status', '--porcelain', '--', file])).stdout.trim();
    if (status.startsWith('?? ')) await rm(file, { force: true });
  }
}

async function git(args) {
  return run('git', args, { cwd: root, maxBuffer: 10 * 1024 * 1024 });
}

async function publish(files, groups) {
  await git(['add', ...files]);
  await git(['commit', '-m', 'feat(news): add reviewed news proposals']);
  await git(['push', '--set-upstream', 'origin', branch]);
  const existing = JSON.parse((await run('gh', ['pr', 'list', '--head', branch, '--state', 'open', '--json', 'number,url'], { cwd: root })).stdout);
  const title = `feat(news): technical news proposals (${new Date().toISOString().slice(0, 10)})`;
  const body = [
    '## Automated editorial proposal',
    '',
    'This PR contains AI-generated technical news drafts.',
    '',
    ...groups.map(({ es }) => `- ${es.title} — ${es.sourceUrl}`),
    '',
    'Checks required: `pnpm lint` and `pnpm build`.',
  ].join('\n');
  const bodyPath = `${varDir}/pr-body.md`;
  await writeFile(bodyPath, body, 'utf8');
  let pr;
  if (existing[0]) {
    await run('gh', ['pr', 'edit', String(existing[0].number), '--title', title, '--body-file', bodyPath], { cwd: root });
    pr = existing[0];
  } else {
    const url = (await run('gh', ['pr', 'create', '--base', 'main', '--head', branch, '--title', title, '--body-file', bodyPath], { cwd: root })).stdout.trim();
    pr = JSON.parse((await run('gh', ['pr', 'view', url, '--json', 'number,url'], { cwd: root })).stdout);
  }
  await rm(bodyPath, { force: true });
  return pr;
}

async function ensureBranch() {
  const current = (await git(['branch', '--show-current'])).stdout.trim();
  const status = (await git(['status', '--porcelain'])).stdout.trim();
  if (status) fail('El árbol de trabajo no está limpio; no se puede publicar automáticamente.');
  if (current === branch) return;
  const branches = (await git(['branch', '--list', branch])).stdout.trim();
  if (branches) await git(['switch', branch]);
  else {
    const remote = (await git(['ls-remote', '--heads', 'origin', `refs/heads/${branch}`])).stdout.trim();
    if (remote) {
      await git(['fetch', 'origin', `${branch}:${branch}`]);
      await git(['switch', branch]);
    } else {
      await git(['switch', '-c', branch]);
    }
  }
}

async function restoreBranch(originalBranch) {
  const current = (await git(['branch', '--show-current'])).stdout.trim();
  if (!originalBranch || current === originalBranch) return;
  const status = (await git(['status', '--porcelain'])).stdout.trim();
  if (status) {
    console.error(`No se restaura ${originalBranch}: el checkout conserva cambios para revisión.`);
    return;
  }
  await git(['switch', originalBranch]);
}

async function sendMail(subject, text) {
  if (!smtpPassword) fail('NEWS_SMTP_PASSWORD no está configurada.');
  const transporter = nodemailer.createTransport({ host: smtpHost, port: smtpPort, secure: smtpSecure, auth: { user: smtpUser, pass: smtpPassword } });
  await transporter.sendMail({ from: mailFrom, to: mailTo, subject, text });
}

async function main() {
  await mkdir(varDir, { recursive: true });
  const state = await readState();
  const existing = await existingArticles();
  const knownUrls = [...new Set([...state.proposedSourceUrls, ...existing.map((article) => article.sourceUrl)])];
  const knownTranslationIds = [...new Set(existing.map((article) => article.translationId).filter(Boolean))];
  const result = await generateDrafts(knownUrls, knownTranslationIds);
  const { groups, rejected } = validateDrafts(result, { knownUrls, knownTranslationIds, maxArticles });
  for (const item of rejected) console.warn(`Propuesta descartada (${item.translationId}): ${item.reason}.`);
  if (groups.length === 0) {
    console.log('No hay noticias elegibles.');
    return;
  }
  if (dryRun) {
    console.log(JSON.stringify({ dryRun: true, articles: groups.map(({ es }) => ({ title: es.title, sourceUrl: es.sourceUrl })) }, null, 2));
    return;
  }
  const originalBranch = (await git(['branch', '--show-current'])).stdout.trim();
  if (!originalBranch) fail('El checkout está detached; no se puede restaurar la rama original.');
  let files = [];
  try {
    await ensureBranch();
    files = await writeDrafts(groups);
    await run('pnpm', ['lint'], { cwd: root, maxBuffer: 10 * 1024 * 1024 });
    await run('pnpm', ['build'], { cwd: root, maxBuffer: 10 * 1024 * 1024 });
    const pr = await publish(files, groups);
    state.proposedSourceUrls = [...new Set([...knownUrls, ...groups.map(({ es }) => es.sourceUrl)])];
    state.runs = [...state.runs.slice(-29), { at: new Date().toISOString(), pr: pr.url, count: groups.length }];
    await writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
    await sendMail(`Noticias técnicas: ${groups.length} propuesta${groups.length === 1 ? '' : 's'}`, [
      'Se ha preparado una nueva propuesta editorial para Conquense Dev.',
      '',
      ...groups.map(({ es }) => `- ${es.title}\n  Fuente: ${es.sourceUrl}`),
      '',
      `Pull request: ${pr.url}`,
    ].join('\n'));
    console.log(`PR creada o actualizada: ${pr.url}`);
  } catch (error) {
    if (files.length > 0) {
      try {
        await cleanupDrafts(files);
      } catch (cleanupError) {
        console.error(`No se pudieron limpiar todos los borradores: ${cleanupError.message}`);
      }
    }
    throw error;
  } finally {
    try {
      await restoreBranch(originalBranch);
    } catch (error) {
      console.error(`No se pudo restaurar la rama ${originalBranch}: ${error.message}`);
      process.exitCode = 1;
    }
  }
}

main().catch(async (error) => {
  console.error(error.stack ?? error.message);
  if (!dryRun && smtpPassword) {
    try { await sendMail('Error en el worker de noticias técnicas', `La ejecución automática ha fallado:\n\n${error.stack ?? error.message}`); } catch (mailError) { console.error(`No se pudo enviar la alerta: ${mailError.message}`); }
  }
  process.exitCode = 1;
});

#!/usr/bin/env node

import { execFile } from 'node:child_process';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import process from 'node:process';
import nodemailer from 'nodemailer';

const run = promisify(execFile);
const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '');

try {
  const envFile = await readFile(`${root}/.env.local`, 'utf8');
  for (const line of envFile.split('\n')) {
    const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
    if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const varDir = `${root}/var/blog-worker`;
const statePath = `${varDir}/state.json`;
const schemaPath = `${root}/scripts/blog-article.schema.json`;
const contentRoot = `${root}/src/content/blog`;
const maxArticles = Number(process.env.BLOG_MAX_ARTICLES ?? '3');
const dryRun = process.env.BLOG_DRY_RUN === 'true';
const codexBin = process.env.BLOG_CODEX_BIN ?? 'codex';
const codexTimeoutMs = Number(process.env.BLOG_CODEX_TIMEOUT_MS ?? '180000');
const branch = process.env.BLOG_BRANCH ?? 'automation/blog-news';
const smtpHost = process.env.BLOG_SMTP_HOST ?? 'smtp.dondominio.com';
const smtpPort = Number(process.env.BLOG_SMTP_PORT ?? '587');
const smtpSecure = process.env.BLOG_SMTP_SECURE === 'true';
const smtpUser = process.env.BLOG_SMTP_USER ?? 'alerts@conquense.dev';
const smtpPassword = process.env.BLOG_SMTP_PASSWORD;
const mailFrom = process.env.BLOG_MAIL_FROM ?? smtpUser;
const mailTo = process.env.BLOG_MAIL_TO ?? 'rafaelgarcia1985@hotmail.com';

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
      if (sourceUrl) articles.push({ lang, sourceUrl });
    }
  }
  return articles;
}

function promptForArticles(knownUrls) {
  return `You are the research and editorial stage of a local technical blog worker.

Use live web search. Find up to ${maxArticles} recent, genuinely useful technology news items about software engineering, architecture, applied AI, security, systems, or web performance.

Rules:
- Return ONLY valid JSON matching the supplied schema. No Markdown fences and no commentary.
- Write an original 400-700 word article in Spanish and a faithful English translation.
- Do not copy source text, invent facts, or use a source without a canonical URL, publisher, title and publication date.
- Prefer primary sources or reliable technical reporting. Explain why each item matters technically without strong unsupported opinions.
- Reject items that are primarily gadgets, marketing announcements without technical substance, politics, finance, or duplicate coverage.
- Include a short AI transparency note saying the text is AI-generated and reviewed before publication.
- Use lowercase URL-safe slugs, with the same translationId in both language objects.
- Skip any source URL already known: ${JSON.stringify(knownUrls)}.
- If no item meets the bar, return {"articles":[]}.

The result must contain one article object per language for each story, so every story has exactly one es and one en object sharing translationId.`;
}

async function generateDrafts(knownUrls) {
  const outputPath = `${varDir}/codex-output.json`;
  await mkdir(varDir, { recursive: true });
  await run(codexBin, [
    '--search',
    '--cd', root,
    '--sandbox', 'read-only',
    '--ask-for-approval', 'never',
    'exec',
    '--ephemeral',
    '--output-schema', schemaPath,
    '--output-last-message', outputPath,
    promptForArticles(knownUrls),
  ], { cwd: root, timeout: codexTimeoutMs, killSignal: 'SIGTERM', maxBuffer: 10 * 1024 * 1024 });
  const raw = await readFile(outputPath, 'utf8');
  await rm(outputPath, { force: true });
  try {
    return JSON.parse(raw);
  } catch {
    fail('Codex no devolvió JSON válido.');
  }
}

function validateDrafts(result, knownUrls) {
  if (!result || !Array.isArray(result.articles)) fail('La salida de Codex no contiene articles[].');
  if (result.articles.length > maxArticles * 2) fail('Codex ha excedido el máximo de traducciones permitido.');
  const groups = new Map();
  for (const article of result.articles) {
    const required = ['translationId', 'lang', 'slug', 'title', 'description', 'publishedAt', 'sourceName', 'sourceTitle', 'sourceUrl', 'tags', 'readingTime', 'aiDisclosure', 'body'];
    if (required.some((key) => article[key] === undefined)) fail(`Faltan campos en la propuesta ${article.translationId ?? 'desconocida'}.`);
    if (!['es', 'en'].includes(article.lang)) fail('Idioma de artículo no permitido.');
    if (!/^https?:\/\//.test(article.sourceUrl)) fail('La fuente no usa una URL HTTP(S).');
    if (knownUrls.includes(article.sourceUrl)) fail(`Fuente duplicada: ${article.sourceUrl}`);
    if (!Array.isArray(article.tags) || article.tags.length < 1 || article.tags.length > 5) fail('Etiquetas inválidas.');
    if (typeof article.body !== 'string' || article.body.length < 500) fail(`Cuerpo demasiado corto en ${article.translationId}.`);
    const group = groups.get(article.translationId) ?? [];
    group.push(article);
    groups.set(article.translationId, group);
  }
  for (const [translationId, articles] of groups) {
    if (articles.length !== 2 || new Set(articles.map((article) => article.lang)).size !== 2) fail(`La noticia ${translationId} no tiene exactamente ES y EN.`);
    if (new Set(articles.map((article) => article.sourceUrl)).size !== 1) fail(`Las traducciones de ${translationId} no comparten fuente.`);
  }
  return [...groups.values()].map(([es, en]) => ({ es, en }));
}

async function writeDrafts(groups) {
  const files = [];
  for (const group of groups) {
    for (const article of [group.es, group.en]) {
      const dir = `${contentRoot}/${article.lang}`;
      const path = `${dir}/${article.slug}.md`;
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
  return files;
}

async function git(args) {
  return run('git', args, { cwd: root, maxBuffer: 10 * 1024 * 1024 });
}

async function publish(files, groups) {
  await git(['add', ...files]);
  await git(['commit', '-m', 'feat(blog): add reviewed news proposals']);
  await git(['push', '--set-upstream', 'origin', branch]);
  const existing = JSON.parse((await run('gh', ['pr', 'list', '--head', branch, '--state', 'open', '--json', 'number,url'], { cwd: root })).stdout);
  const title = `feat(blog): technical news proposals (${new Date().toISOString().slice(0, 10)})`;
  const body = [
    '## Automated editorial proposal',
    '',
    'This PR contains AI-generated technical news drafts. It requires manual editorial review before merge.',
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
  if (current === branch) return;
  const status = (await git(['status', '--porcelain'])).stdout.trim();
  if (status) fail('El árbol de trabajo no está limpio; no se puede publicar automáticamente.');
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

async function sendMail(subject, text) {
  if (!smtpPassword) fail('BLOG_SMTP_PASSWORD no está configurada.');
  const transporter = nodemailer.createTransport({ host: smtpHost, port: smtpPort, secure: smtpSecure, auth: { user: smtpUser, pass: smtpPassword } });
  await transporter.sendMail({ from: mailFrom, to: mailTo, subject, text });
}

async function main() {
  const state = await readState();
  const existing = await existingArticles();
  const knownUrls = [...new Set([...state.proposedSourceUrls, ...existing.map((article) => article.sourceUrl)])];
  const result = await generateDrafts(knownUrls);
  const groups = validateDrafts(result, knownUrls).slice(0, maxArticles);
  if (groups.length === 0) {
    console.log('No hay noticias elegibles.');
    return;
  }
  if (dryRun) {
    console.log(JSON.stringify({ dryRun: true, articles: groups.map(({ es }) => ({ title: es.title, sourceUrl: es.sourceUrl })) }, null, 2));
    return;
  }
  await ensureBranch();
  const files = await writeDrafts(groups);
  await run('pnpm', ['lint'], { cwd: root, maxBuffer: 10 * 1024 * 1024 });
  await run('pnpm', ['build'], { cwd: root, maxBuffer: 10 * 1024 * 1024 });
  const pr = await publish(files, groups);
  state.proposedSourceUrls = [...new Set([...knownUrls, ...groups.map(({ es }) => es.sourceUrl)])];
  state.runs = [...state.runs.slice(-29), { at: new Date().toISOString(), pr: pr.url, count: groups.length }];
  await writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
  await sendMail(`Blog técnico: ${groups.length} propuesta${groups.length === 1 ? '' : 's'}`, [
    'Se ha preparado una nueva propuesta editorial para Conquense Dev.',
    '',
    ...groups.map(({ es }) => `- ${es.title}\n  Fuente: ${es.sourceUrl}`),
    '',
    `Pull request: ${pr.url}`,
  ].join('\n'));
  console.log(`PR creada o actualizada: ${pr.url}`);
}

main().catch(async (error) => {
  console.error(error.stack ?? error.message);
  if (!dryRun && smtpPassword) {
    try { await sendMail('Error en el worker del blog técnico', `La ejecución automática ha fallado:\n\n${error.stack ?? error.message}`); } catch (mailError) { console.error(`No se pudo enviar la alerta: ${mailError.message}`); }
  }
  process.exitCode = 1;
});

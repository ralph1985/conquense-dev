#!/usr/bin/env node

import { readdir, readFile } from 'node:fs/promises';

const root = new URL('../src/content/blog/', import.meta.url);
const languages = ['es', 'en'];
const articles = [];

const readFrontmatter = (content, file) => {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`${file}: falta el frontmatter.`);
  const fields = new Map();
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.+)$/);
    if (field) fields.set(field[1], field[2].trim().replace(/^['"]|['"]$/g, ''));
  }
  return fields;
};

for (const lang of languages) {
  const directory = new URL(`${lang}/`, root);
  const files = (await readdir(directory)).filter((file) => file.endsWith('.md')).sort();
  for (const file of files) {
    const fields = readFrontmatter(await readFile(new URL(file, directory), 'utf8'), `${lang}/${file}`);
    const slug = fields.get('slug');
    const translationId = fields.get('translationId');
    if (fields.get('lang') !== lang) throw new Error(`${lang}/${file}: lang no coincide con su directorio.`);
    if (!slug || !translationId || !fields.get('sourceUrl')) throw new Error(`${lang}/${file}: faltan slug, translationId o sourceUrl.`);
    if (file !== `${slug}.md`) throw new Error(`${lang}/${file}: el nombre debe coincidir con slug (${slug}.md).`);
    articles.push({ file: `${lang}/${file}`, lang, slug, translationId, sourceUrl: fields.get('sourceUrl') });
  }
}

const duplicateKeys = new Map();
for (const article of articles) {
  const key = `${article.lang}:${article.slug}`;
  const files = duplicateKeys.get(key) ?? [];
  files.push(article.file);
  duplicateKeys.set(key, files);
}
for (const [key, files] of duplicateKeys) {
  if (files.length > 1) throw new Error(`slug duplicado para ${key}: ${files.join(', ')}`);
}

const translations = new Map();
for (const article of articles) {
  const group = translations.get(article.translationId) ?? [];
  group.push(article);
  translations.set(article.translationId, group);
}
for (const [translationId, group] of translations) {
  const langs = new Set(group.map((article) => article.lang));
  if (group.length !== 2 || langs.size !== 2 || !langs.has('es') || !langs.has('en')) {
    throw new Error(`translationId ${translationId} debe tener exactamente una versión ES y una EN.`);
  }
  if (new Set(group.map((article) => article.sourceUrl)).size !== 1) {
    throw new Error(`translationId ${translationId} tiene fuentes distintas entre traducciones.`);
  }
}

console.log(`Blog content validado: ${articles.length} artículos, ${translations.size} traducciones.`);

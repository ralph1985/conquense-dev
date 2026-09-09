const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const unsafeBodyPattern = /<\s*\/?\s*(?:script|iframe|object|embed|svg|math|style|form)\b|<[^>]+\bon[a-z]+\s*=|(?:href|src|action)\s*=\s*["']\s*(?:java|vb)script\s*:|\]\(\s*(?:java|vb)script\s*:/i;
const localNewsTags = new Set(['cuenca', 'castilla-la-mancha']);

function normalizeNewsTag(tag) {
  return tag
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function isRegionalArticle(article) {
  return article.tags.some((tag) => localNewsTags.has(normalizeNewsTag(tag)));
}

function articleError(article, knownUrls) {
  if (!article || typeof article !== 'object') return 'objeto de artículo inválido';
  const required = ['translationId', 'lang', 'slug', 'title', 'description', 'publishedAt', 'sourceName', 'sourceTitle', 'sourceUrl', 'tags', 'readingTime', 'aiDisclosure', 'body'];
  if (required.some((key) => article[key] === undefined)) return 'faltan campos obligatorios';
  if (typeof article.translationId !== 'string' || article.translationId.length === 0) return 'translationId inválido';
  if (!['es', 'en'].includes(article.lang)) return 'idioma no permitido';
  if (typeof article.slug !== 'string' || article.slug.length > 100 || !slugPattern.test(article.slug)) return 'slug inválido';
  if (typeof article.title !== 'string' || article.title.length < 10 || article.title.length > 140) return 'título inválido';
  if (typeof article.description !== 'string' || article.description.length < 40 || article.description.length > 180) return 'descripción inválida';
  if (typeof article.publishedAt !== 'string' || Number.isNaN(Date.parse(article.publishedAt))) return 'fecha inválida';
  if (typeof article.sourceName !== 'string' || article.sourceName.length < 2 || article.sourceName.length > 80) return 'nombre de fuente inválido';
  if (typeof article.sourceTitle !== 'string' || article.sourceTitle.length < 5 || article.sourceTitle.length > 180) return 'título de fuente inválido';
  if (typeof article.sourceUrl !== 'string' || !/^https?:\/\//i.test(article.sourceUrl)) return 'URL de fuente inválida';
  if (knownUrls.has(article.sourceUrl)) return 'fuente ya utilizada';
  if (!Array.isArray(article.tags) || article.tags.length < 1 || article.tags.length > 5 || article.tags.some((tag) => typeof tag !== 'string' || tag.length < 1 || tag.length > 32)) return 'etiquetas inválidas';
  if (!Number.isInteger(article.readingTime) || article.readingTime < 1 || article.readingTime > 30) return 'tiempo de lectura inválido';
  if (typeof article.aiDisclosure !== 'string' || article.aiDisclosure.length < 20 || article.aiDisclosure.length > 240) return 'declaración de IA inválida';
  if (typeof article.body !== 'string' || article.body.length < 500) return 'cuerpo demasiado corto';
  if (unsafeBodyPattern.test(article.body)) return 'contenido HTML no permitido';
  return null;
}

export function validateDrafts(result, { knownUrls = [], knownTranslationIds = [], maxArticles = 3 } = {}) {
  if (!result || !Array.isArray(result.articles)) throw new Error('La salida de Codex no contiene articles[].');
  if (result.articles.length > maxArticles * 2) throw new Error('Codex ha excedido el máximo de traducciones permitido.');

  const knownUrlSet = new Set(knownUrls);
  const knownIdSet = new Set(knownTranslationIds);
  const groups = new Map();
  for (const [index, article] of result.articles.entries()) {
    const translationId = typeof article?.translationId === 'string' && article.translationId.length > 0
      ? article.translationId
      : `invalid-${index}`;
    const group = groups.get(translationId) ?? [];
    group.push(article);
    groups.set(translationId, group);
  }

  const validGroups = [];
  const rejected = [];
  for (const [translationId, articles] of groups) {
    const reason = articles.map((article) => articleError(article, knownUrlSet)).find(Boolean);
    if (reason) {
      rejected.push({ translationId, reason });
      continue;
    }
    if (knownIdSet.has(translationId)) {
      rejected.push({ translationId, reason: 'translationId ya utilizado' });
      continue;
    }
    if (articles.length !== 2 || new Set(articles.map((article) => article.lang)).size !== 2) {
      rejected.push({ translationId, reason: 'no contiene exactamente una versión ES y una EN' });
      continue;
    }
    if (new Set(articles.map((article) => article.sourceUrl)).size !== 1) {
      rejected.push({ translationId, reason: 'las traducciones no comparten fuente' });
      continue;
    }
    if (isRegionalArticle(articles[0]) !== isRegionalArticle(articles[1])) {
      rejected.push({ translationId, reason: 'las traducciones no comparten clasificación regional' });
      continue;
    }
    const [es, en] = articles[0].lang === 'es' ? articles : [articles[1], articles[0]];
    validGroups.push({ es, en });
  }

  let regionalFound = false;
  const groupsToKeep = [];
  for (const group of validGroups) {
    if (isRegionalArticle(group.es)) {
      if (regionalFound) {
        rejected.push({ translationId: group.es.translationId, reason: 'segunda propuesta regional de la ejecución' });
        continue;
      }
      regionalFound = true;
    }
    groupsToKeep.push(group);
  }

  return { groups: groupsToKeep, rejected };
}

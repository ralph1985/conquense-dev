import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateDrafts } from './news-worker-validation.mjs';

const body = 'x'.repeat(500);

function article(overrides = {}) {
  return {
    translationId: 'fresh-story',
    lang: 'es',
    slug: 'fresh-story',
    title: 'Una noticia técnica suficientemente larga',
    description: 'Una descripción técnica suficientemente larga para superar la validación editorial.',
    publishedAt: '2026-09-09',
    sourceName: 'Fuente técnica',
    sourceTitle: 'Título de la fuente técnica',
    sourceUrl: 'https://example.com/fresh-story',
    tags: ['software-engineering'],
    readingTime: 4,
    aiDisclosure: 'Contenido generado automáticamente con IA.',
    body,
    ...overrides,
  };
}

function pair(overrides = {}) {
  return [
    article(overrides),
    article({ ...overrides, lang: 'en', slug: 'fresh-story-en' }),
  ];
}

test('descarta un translationId ya publicado y conserva las parejas válidas', () => {
  const result = validateDrafts({ articles: [
    ...pair({ translationId: 'already-published', sourceUrl: 'https://example.com/old' }),
    ...pair({ translationId: 'new-story', slug: 'new-story', sourceUrl: 'https://example.com/new' }),
  ] }, {
    knownTranslationIds: ['already-published'],
    maxArticles: 2,
  });

  assert.equal(result.groups.length, 1);
  assert.equal(result.groups[0].es.translationId, 'new-story');
  assert.deepEqual(result.rejected, [{ translationId: 'already-published', reason: 'translationId ya utilizado' }]);
});

test('descarta la segunda pareja regional y mantiene la primera', () => {
  const result = validateDrafts({ articles: [
    ...pair({ translationId: 'local-one', slug: 'local-one', sourceUrl: 'https://example.com/local-one', tags: ['cuenca'] }),
    ...pair({ translationId: 'local-two', slug: 'local-two', sourceUrl: 'https://example.com/local-two', tags: ['castilla-la-mancha'] }),
  ] }, { maxArticles: 2 });

  assert.equal(result.groups.length, 1);
  assert.equal(result.groups[0].es.translationId, 'local-one');
  assert.deepEqual(result.rejected, [{ translationId: 'local-two', reason: 'segunda propuesta regional de la ejecución' }]);
});

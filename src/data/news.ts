import type { CollectionEntry } from 'astro:content';
import type { Language } from '@/data/i18n';

export const NEWS_PAGE_SIZE = 6;

export type NewsEntry = CollectionEntry<'news'>;

const localNewsTags = new Set(['cuenca', 'castilla-la-mancha']);

function normalizeNewsTag(tag: string) {
  return tag
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function isLocalNewsEntry(entry: NewsEntry) {
  return entry.data.tags.some((tag) => localNewsTags.has(normalizeNewsTag(tag)));
}

export function getLocalNewsEntries(entries: NewsEntry[]) {
  return entries.filter(isLocalNewsEntry);
}

export function sortNewsEntries(entries: NewsEntry[]) {
  return [...entries].sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export function getNewsPageCount(entries: NewsEntry[], pageSize = NEWS_PAGE_SIZE) {
  return Math.max(1, Math.ceil(entries.length / pageSize));
}

export function getNewsPageEntries(entries: NewsEntry[], page: number, pageSize = NEWS_PAGE_SIZE) {
  const start = (page - 1) * pageSize;
  return sortNewsEntries(entries).slice(start, start + pageSize);
}

export function getNewsArchivePath(lang: Language, page: number) {
  const prefix = lang === 'en' ? '/en' : '';
  const section = lang === 'en' ? 'news' : 'noticias';
  return page === 1 ? `${prefix}/${section}/` : `${prefix}/${section}/page/${page}/`;
}

export function getNewsLocalArchivePath(lang: Language, page: number) {
  const prefix = lang === 'en' ? '/en' : '';
  const section = lang === 'en' ? 'news/local' : 'noticias/locales';
  return page === 1 ? `${prefix}/${section}/` : `${prefix}/${section}/page/${page}/`;
}

export function getNewsSearchPath(lang: Language) {
  return lang === 'en' ? '/en/news/search/' : '/noticias/buscar/';
}

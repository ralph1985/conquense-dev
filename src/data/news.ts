import type { CollectionEntry } from 'astro:content';
import type { Language } from '@/data/i18n';

export const NEWS_PAGE_SIZE = 6;

export type NewsEntry = CollectionEntry<'news'>;

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

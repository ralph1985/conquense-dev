import type { CollectionEntry } from 'astro:content';
import type { Language } from '@/data/i18n';

export const BLOG_PAGE_SIZE = 6;

export type BlogEntry = CollectionEntry<'blog'>;

export function sortBlogEntries(entries: BlogEntry[]) {
  return [...entries].sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export function getBlogPageCount(entries: BlogEntry[], pageSize = BLOG_PAGE_SIZE) {
  return Math.max(1, Math.ceil(entries.length / pageSize));
}

export function getBlogPageEntries(entries: BlogEntry[], page: number, pageSize = BLOG_PAGE_SIZE) {
  const start = (page - 1) * pageSize;
  return sortBlogEntries(entries).slice(start, start + pageSize);
}

export function getBlogArchivePath(lang: Language, page: number) {
  const prefix = lang === 'en' ? '/en' : '';
  return page === 1 ? `${prefix}/blog/` : `${prefix}/blog/page/${page}/`;
}

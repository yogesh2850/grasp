import { basePath } from '@/constant/config';

/** Prefix public asset paths for GitHub Pages project sites. */
export function asset(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

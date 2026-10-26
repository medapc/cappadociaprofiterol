// Shared by Astro config, metadata routes and the publication checks.
export function publication(origin, indexable = false) {
  let url;
  if (origin) {
    url = new URL(origin);
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
      throw new Error('SITE_URL must be an HTTPS origin without a path, query, or credentials.');
    }
    if (['example.com', 'localhost', '127.0.0.1'].includes(url.hostname)) {
      throw new Error('SITE_URL must be your real public domain. Leave it empty for local preview.');
    }
  }
  if (indexable && !url) throw new Error('SITE_INDEXABLE=true requires SITE_URL.');
  return { origin: url, indexable: Boolean(url && indexable) };
}

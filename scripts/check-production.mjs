import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { publication } from '../config/publication.mjs';

if (existsSync('.env')) loadEnvFile('.env');
const { origin, indexable } = publication(process.env.SITE_URL, process.env.SITE_INDEXABLE === 'true');
if (!indexable || !origin || /\.(test|invalid|example)$/.test(origin.hostname)) {
  throw new Error('Production needs a real HTTPS SITE_URL and SITE_INDEXABLE=true. Use pnpm build for previews.');
}
console.log(`Production origin verified: ${origin.origin}`);

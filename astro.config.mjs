import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { publication } from './config/publication.mjs';

// Node's loader preserves environment variables provided by Cloudflare/CI.
if (existsSync('.env')) loadEnvFile('.env');
const { origin } = publication(process.env.SITE_URL, process.env.SITE_INDEXABLE === 'true');

export default defineConfig({
  site: origin?.href,
  output: 'static',
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: 'always' },
});

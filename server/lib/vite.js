import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Genera las etiquetas de Vite para desarrollo o producción.
 */
export function viteAssets() {
  const isDev = process.env.NODE_ENV !== 'production';

  const viteDevServer = (
    process.env.VITE_DEV_SERVER || 'http://localhost:5173'
  ).replace(/\/+$/, '');

  if (isDev) {
    return `
      <script type="module" src="${viteDevServer}/@vite/client"></script>
      <script type="module" src="${viteDevServer}/main.js"></script>
    `;
  }

  const manifestPath = path.resolve(
    __dirname,
    '../../dist/.vite/manifest.json'
  );

  if (!fs.existsSync(manifestPath)) {
    process.stderr.write(
      'No se encontró el manifiesto de Vite. Ejecuta npm run build.\n'
    );

    return '';
  }

  const manifest = JSON.parse(
    fs.readFileSync(manifestPath, 'utf8')
  );

  const mainEntry = manifest['main.js'];

  if (!mainEntry) {
    process.stderr.write(
      'No se encontró main.js en el manifiesto de Vite.\n'
    );

    return '';
  }

  const cssFiles = new Set();
  const visited = new Set();

  /**
   * Recopila estilos sin repetir archivos ni recorrer ciclos.
   */
  function collectStyles(entry) {
    (entry.css || []).forEach((cssFile) => {
      cssFiles.add(cssFile);
    });

    (entry.imports || []).forEach((importKey) => {
      if (!visited.has(importKey)) {
        visited.add(importKey);

        const importedEntry = manifest[importKey];

        if (importedEntry) {
          collectStyles(importedEntry);
        }
      }
    });
  }

  collectStyles(mainEntry);

  const styleTags = Array.from(cssFiles)
    .map((cssFile) => `<link rel="stylesheet" href="/${cssFile}">`)
    .join('\n');

  const scriptTag = (
    `<script type="module" src="/${mainEntry.file}"></script>`
  );

  return [styleTags, scriptTag].filter(Boolean).join('\n');
}

/**
 * Registra el helper que utiliza server/app.js.
 */
export function registerViteAssetsHelper(hbs) {
  hbs.registerHelper(
    'viteAssets',
    () => new hbs.SafeString(viteAssets())
  );
}

// Conserva compatibilidad con el nombre anterior.
export const registerViteHelper = registerViteAssetsHelper;
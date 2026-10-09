// Utilidades de archivos y rutas
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
 * Genera las etiquetas de Vite.
 * Desarrollo: utiliza el servidor de Vite.
 * Producción: utiliza los archivos compilados.
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
    console.warn(
      'No se encontró el manifiesto de Vite. Ejecuta npm run build.'
    );
    return '';
  }

  const manifest = JSON.parse(
    fs.readFileSync(manifestPath, 'utf8')
  );

  const mainEntry = manifest['main.js'];

  if (!mainEntry) {
    console.warn(
      'No se encontró main.js en el manifiesto de Vite.'
    );
    return '';
  }

  // Incluye los estilos de la entrada y sus dependencias.
  const cssFiles = new Set();
  const visited = new Set();

  function collectStyles(entry) {
    for (const cssFile of entry.css || []) {
      cssFiles.add(cssFile);
    }

    for (const importKey of entry.imports || []) {
      if (visited.has(importKey)) continue;
      visited.add(importKey);

      const importedEntry = manifest[importKey];

      if (importedEntry) {
        collectStyles(importedEntry);
      }
    }
  }

  collectStyles(mainEntry);

  let tags = '';

  for (const cssFile of cssFiles) {
    tags += `<link rel="stylesheet" href="/${cssFile}">\n`;
  }

  tags += `<script type="module" src="/${mainEntry.file}"></script>`;

  return tags;
}

/*
 * Registra el helper con el nombre que importa server/app.js.
 */
export function registerViteAssetsHelper(hbs) {
  hbs.registerHelper('viteAssets', () => {
    return new hbs.SafeString(viteAssets());
  });
}

// Conserva compatibilidad con el nombre anterior.
export const registerViteHelper = registerViteAssetsHelper;
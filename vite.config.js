// Configurador de Vite
import { defineConfig } from 'vite';

// Utilidades para rutas
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
//importando tailwindcss
import tailwindcss from '@tailwindcss/vite'


// Directorio del archivo de configuración
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    // Directorio de los archivos del frontend
    root: 'src',
    //agregando a vite el plugin de tailwindcss
    plugins: [ tailwindcss()],

    // Servidor de desarrollo
    server: {
        port: 5173,
        strictPort: true,
    },

    // Configuración para producción
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        manifest: true,

        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/main.js'),
            },
        },
    },

    // Desactivar el directorio de archivos públicos
    publicDir: false,
});
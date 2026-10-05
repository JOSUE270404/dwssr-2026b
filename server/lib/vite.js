//Biblioteca file stream
import  fs from 'node:fs';
//Biblioteca de rutas 
import path from 'node:path';
import { fileURLToPath } from 'node:url';
//crando las variables de ruta
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/** 
 * Helper para HandLebars que genera las etiquetas de Vite 
 * EN DESARROLLO: Conecta al servidor de desarrollo de Vite
 * EN PRODUCCION: Usa los archivo compilados de Vite  
 */
export function viteAssets() {
    //Obtener modo de ejecucion
    const isDev = process.env.NODE_ENV !== 'production'
    //Rescatando la URL del vervidor de desarrollo 
    const devServerUrl = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';
    

    //si estamso en modo de desarrollo 
    if (isDev) {
        //En desarrollo cargamos los archivos de 
        //del front-end directamente del servidor 
        //de Desarrollo de Vite
        return `
        <script type="module" src="${viteDevServer}/@vite/client"></script>
        <script type="module" src="${viteDevServer}/main.js"></script>
        `
    }

    //En produccion leemos el manifest 
    //y generamos las etiquetas finales de produccion 
    const manifestPath = path.join(__dirname,'..','..','/dist/','.vite', 'manifest.json');  
    
    //si no existe el manifest 
    if (!fs.existsSync(manifestPath)) {
        console.warn("⚠️ Vite manifest.json not found Run 'npm run build'");
        return '';
    }
} 
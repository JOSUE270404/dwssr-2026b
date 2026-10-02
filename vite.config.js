//importando configurador de vite
import{defineconfig}from 'vite'
//importando  un admin de rutas
import{resolve} from 'node:path'

export default defineconfig({
    //Directorio Raiz DE LSO ARCHIVOS FUENTE DEL FRONTEND
    root:'src',
    //configurando un servidor de desarrollo
    server:{
        //puerto de escucha 
        port:5173,
        //Rigidez del puerto 
        strict:true,
    },
    //Configurando el Build
    build:{
        //Directorio de salida de salida del js para produccion
        outDir:"../dist",
        //asegurando limpieza del folder de porduccion
        emptyOutDir:true,
        //Generar manifiesto para el servidor 
        manifest:true,
        //opciones de empaquetado
        rollupOptions:{
            imput:{
                main:resolve(__dirname,'src/main.js')
            }
        }
    },
    //configuracion para el desarrollo
    publicDir:false,
})

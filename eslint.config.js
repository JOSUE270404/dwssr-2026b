import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  //1) Ignora los build del front-end
  {
    ignores: [
      "dist/**", //Ignora carpeta de distribución 
      "node_modules/**"
    ]
  },
  //2) Configuración del back-end
  { 
    files: ["server/**/*.{js,mjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ... globals.node 
      }
    },
    rules:{
      "no-unused-vars":["error",{"argsIgnorePattern":"^_"}]
    }
   },
     //2) Configuración de vite
  { 
    files: ["vite.config.js"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ... globals.node 
      }
    }
   },
  //3) Código del front-end 
  { 
    files: ["src/**/*.{js,mjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ... globals.browser
       }
     }
   },
  //4) Opcional si hay js en public
  { 
    files: ["public/**/*.{js,mjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ... globals.browser
       }
     }
   },
]);
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {create as createHbsEngine} from 'express-handlebars';

import {registerViteHelper} from './vite.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Exportar la funcion de configuracion 
export default function configureHandlebars(app) {
//estableciendo la expetencio de las vitas en .hbs
//y estableciendo el layout principal el main
const exphbs = createHbsEngine({
  extname: ".hbs",
  defaultLayout: "main", 
});

//registrando el helper de vite 
registerViteHelper(exphbs.handlebars);



//registrando handerbars en la APP de express
//1. registro de engine y su nombre 
app.engine('hbs', exphbs.engine);
//2. Registro el engine
app.set("view engine", "hbs");
//3. establecemos el directorio de vistas
app.set("views", path.join(__dirname, "..", "views"));

}




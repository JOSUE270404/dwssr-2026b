//funcion para mejerar errores en la aplicación
import createError from 'http-errors';
//importa el framework express
import express from 'express';
//importa modulos para manejar rutas, cookies, logs y path
import path from 'node:path';
//importa modulos para manejar cookies
import cookieParser from 'cookie-parser';
//importa modulos para manejar logs
import logger from 'morgan';
//imports para crear Dirname
import { fileURLToPath } from 'node:url';
import{dirname} from 'node:path';
//creando la variable
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//importa las rutas de laaplicacion 
//var indexRouter = require('./routes/index');
import indexRouter from './routes/index.js';
//var usersRouter = require('./routes/users');
import usersRouter from './routes/users.js';

//crea la aplicacion express
var app = express();

// configura el motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//configura los middlewares de la aplicacion (software intermedio que se ejecuta antes de las rutas)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//configura la carpeta de archivos estaticos
app.use(express.static(path.join(__dirname,'..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
export default app;

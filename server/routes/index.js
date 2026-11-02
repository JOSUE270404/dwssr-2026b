import express from 'express';
import logger from '../lib/Winston.js'

const indexRouter = express.Router();

let counter = 0;
const numbers = [];

/* GET home page. */
indexRouter.get('/', (req, res, _next) => {
  counter += 1;
  numbers.push(counter);
  res.render('index', {
    title: 'Josue Alcantara',
    counter,
    numbers,
  });
});

//Rutas para pruebas de logs
//Acceder a GET /test-logs
indexRouter.get("/test-logs", (req, res) => {
  logger.error("Esto es un mensaje de ERROR - Algo falló");
  logger.warn("Esto es un mensaje de WARN - Algo podría estar mal");
  logger.info("Esto es un mensaje de INFO - operación exitosa");
  logger.http("Esto es un mensaje de HTTP - Petición recibida");
  logger.debug("Esto es un mensaje de DEBUG - Detalles de depuración");

  res.json({
    message:"Logs de prueba activos. Revisa la consola y los archivos en /logs",
    files: [
      "logs/app-YYYY-MM-DD.log      ⭢ DailyRotateFile (info+warn+error en JSON)",
      "logs/error-YYYY-MM-DD.log    ⭢ Formato Legible (info+warn+error)",
      "logs/error.log               ⭢ Solo errores",  
    ]
  })  
})

//Rutas de pprueba para exceptiones y rejections
if(process.env.NODE_ENV !== "production"){

  //Ruta de prueba de excepciones
  indexRouter.get("/test-exception", (req, res) => {
    res.json({message:"Excepción lanzada. Revisa logs/exceptions.log"});
    setTimeout(() => {
      throw new Error("Excepción de prueba no capturada")
    }, 1000)
  })

  //Prueba de rejections
   indexRouter.get("/test-rejection", (req, res) => {
    res.json({message:"Promesa rechazada, revisa archivo logs/rejections.log"});
    //promesa rechazada sin catch
    Promise.reject(new Error('Promesa rechazada de prueba sin catch'));
  });
}

//module.exports = router; 
export default indexRouter;
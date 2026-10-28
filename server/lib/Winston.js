//Importando el core de winston
import winston, { format } from 'winston';
//Importando bibliotecas de node

import path from 'node:path';
import fs from 'node:fs';

//Importando plugging de winston 
import DailyRotateFile from 'winston-daily-rotate-file';

//Desestructurando funciones utiles de fomat
const { combine, timestamp, label, printf, colorize,
  prettyPrint} = format;

//Creando variables del directorio raiz
const rootDir = path.resolve();

//Creando directorio de logs
const logDir = path.join(rootDir, "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true});
}

// Definiendo esquemas de colores
const colors ={
error: 'red',
warn: 'yellow',
info: 'green',
http: 'magenta',
debug: 'blue',
silly: 'gray'

}

//agregando ese esquemna a winston
winston.addColors(colors);

//creando plantillas para los formatos

const myConsoleFormat = combine(
 //colores del formato  
  colorize({all:true}),
 //Agregando una etiqueta 
label ({ label: '🔊:' }),
//agregando fecha
timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
//funcion de imprecion
printf((info) => `${info.level} 📐 ${info.label} 📐 ${info.timestamp} 📐 ${info.message}`)
)

// Formato para los archivos JSON

const myFileFormat = combine(
  //Retirar colorizacion
format.uncolorize(),
//agregar fecha ISO
timestamp(),
//Salida
format.json(),
);

//Construyendo y configurando los transportes 
const options = {
  errorFile:{
    level: "error",
    filename: path.join(logDir,"error.log"),
    maxsize: 5242880, //5mb
    maxFiles: 2, 
    format: myFileFormat,
  },
  console:{
level: "debug",
handleExceptions: true,
format: myConsoleFormat,

  },

  readableFile: {

    level: "info",
    filename: path.join(logDir,"readable.log"),
    maxsize: 5242880, //5mb
    maxFiles: 2, 
    format: combine(
      format.uncolorize(),
      timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
      prettyPrint(),
    ),
  },

  dailyRotateFile:{

    level: 'info',
    filename: path.join(logDir,"app-%DATE%.log"),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxsize: 5242880, //5mb
    maxFiles: 2, 
    format: myFileFormat
  }

};

//Creando el logger
const logger = winston.createLogger({
  transports: [
    new DailyRotateFile(options.dailyRotateFile),
    new winston.transports.File(options.readableFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console)
  ],
  exceptionHandlers: [
    new winston.transports.File(
      {filename: path.join(logDir,"exceptions.log")})
  ],
  rejectionHandlers: [
    new winston.transports.File(
      {filename: path.join(logDir,"rejections.log")})
  ]

});

//Exportamos el logger
export default logger;
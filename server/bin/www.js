#!/usr/bin/env node

import createDebug from 'debug';
import http from 'node:http';
import app from '../app.js';

const debug = createDebug('dwssr-2026b:server');

/**
 * Normaliza el puerto como número, nombre de canal o false.
 */
function normalizePort(value) {
  const parsedPort = Number.parseInt(value, 10);

  if (Number.isNaN(parsedPort)) {
    return value;
  }

  if (parsedPort >= 0) {
    return parsedPort;
  }

  return false;
}

// Configura el puerto y crea el servidor HTTP.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

/**
 * Maneja los errores al iniciar el servidor.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
process.stderr.write(`${bind} requires elevated privileges\n`);      process.exit(1);
      break;

    case 'EADDRINUSE':
process.stderr.write(`${bind} is already in use\n`);      process.exit(1);
      break;

    default:
      throw error;
  }
}

/**
 * Informa que el servidor está escuchando.
 */
function onListening() {
  const address = server.address();

  const bind = typeof address === 'string'
    ? `pipe ${address}`
    : `port ${address.port}`;

  debug(`💻 Listening on ${bind}`);
}

// Registra los manejadores antes de iniciar la escucha.
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
/**
 * The SeguimientosController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/SeguimientosService');
const actualizarSeguimiento = async (request, response) => {
  await Controller.handleRequest(request, response, service.actualizarSeguimiento);
};

const cambiarEstadoSeguimiento = async (request, response) => {
  await Controller.handleRequest(request, response, service.cambiarEstadoSeguimiento);
};

const crearSeguimiento = async (request, response) => {
  await Controller.handleRequest(request, response, service.crearSeguimiento);
};

const eliminarSeguimiento = async (request, response) => {
  await Controller.handleRequest(request, response, service.eliminarSeguimiento);
};

const listarSeguimientos = async (request, response) => {
  await Controller.handleRequest(request, response, service.listarSeguimientos);
};

const obtenerSeguimientoPorId = async (request, response) => {
  await Controller.handleRequest(request, response, service.obtenerSeguimientoPorId);
};


module.exports = {
  actualizarSeguimiento,
  cambiarEstadoSeguimiento,
  crearSeguimiento,
  eliminarSeguimiento,
  listarSeguimientos,
  obtenerSeguimientoPorId,
};

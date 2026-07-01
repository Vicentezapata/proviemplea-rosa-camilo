/**
 * The SolicitudesController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/SolicitudesService');
const actualizarSolicitud = async (request, response) => {
  await Controller.handleRequest(request, response, service.actualizarSolicitud);
};

const cambiarEstadoSolicitud = async (request, response) => {
  await Controller.handleRequest(request, response, service.cambiarEstadoSolicitud);
};

const crearSolicitud = async (request, response) => {
  await Controller.handleRequest(request, response, service.crearSolicitud);
};

const eliminarSolicitud = async (request, response) => {
  await Controller.handleRequest(request, response, service.eliminarSolicitud);
};

const listarSolicitudes = async (request, response) => {
  await Controller.handleRequest(request, response, service.listarSolicitudes);
};

const obtenerSolicitudPorId = async (request, response) => {
  await Controller.handleRequest(request, response, service.obtenerSolicitudPorId);
};


module.exports = {
  actualizarSolicitud,
  cambiarEstadoSolicitud,
  crearSolicitud,
  eliminarSolicitud,
  listarSolicitudes,
  obtenerSolicitudPorId,
};

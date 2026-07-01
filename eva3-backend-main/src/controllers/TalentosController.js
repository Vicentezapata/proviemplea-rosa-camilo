/**
 * The TalentosController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/TalentosService');
const actualizarTalento = async (request, response) => {
  await Controller.handleRequest(request, response, service.actualizarTalento);
};

const cambiarEstadoTalento = async (request, response) => {
  await Controller.handleRequest(request, response, service.cambiarEstadoTalento);
};

const crearTalento = async (request, response) => {
  await Controller.handleRequest(request, response, service.crearTalento);
};

const eliminarTalento = async (request, response) => {
  await Controller.handleRequest(request, response, service.eliminarTalento);
};

const listarTalentos = async (request, response) => {
  await Controller.handleRequest(request, response, service.listarTalentos);
};

const obtenerTalentoPorId = async (request, response) => {
  await Controller.handleRequest(request, response, service.obtenerTalentoPorId);
};


module.exports = {
  actualizarTalento,
  cambiarEstadoTalento,
  crearTalento,
  eliminarTalento,
  listarTalentos,
  obtenerTalentoPorId,
};

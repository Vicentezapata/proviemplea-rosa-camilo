/**
 * The EmpresasController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/EmpresasService');
const actualizarEmpresa = async (request, response) => {
  await Controller.handleRequest(request, response, service.actualizarEmpresa);
};

const cambiarValidacionEmpresa = async (request, response) => {
  await Controller.handleRequest(request, response, service.cambiarValidacionEmpresa);
};

const crearEmpresa = async (request, response) => {
  await Controller.handleRequest(request, response, service.crearEmpresa);
};

const eliminarEmpresa = async (request, response) => {
  await Controller.handleRequest(request, response, service.eliminarEmpresa);
};

const listarEmpresas = async (request, response) => {
  await Controller.handleRequest(request, response, service.listarEmpresas);
};

const obtenerEmpresaPorId = async (request, response) => {
  await Controller.handleRequest(request, response, service.obtenerEmpresaPorId);
};


module.exports = {
  actualizarEmpresa,
  cambiarValidacionEmpresa,
  crearEmpresa,
  eliminarEmpresa,
  listarEmpresas,
  obtenerEmpresaPorId,
};

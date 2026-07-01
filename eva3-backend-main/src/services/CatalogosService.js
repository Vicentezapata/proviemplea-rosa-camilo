/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { Catalogo } = require('../models');

const obtenerBody = (args = {}, posiblesNombres = []) => {
  for (const nombre of posiblesNombres) {
    if (args[nombre] && typeof args[nombre] === 'object') {
      return args[nombre];
    }
  }

  if (args.body && typeof args.body === 'object') {
    return args.body;
  }

  if (args.requestBody && typeof args.requestBody === 'object') {
    return args.requestBody;
  }

  return {};
};

const listarCatalogos = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const where = {};

      if (args.activo !== undefined && args.activo !== null && args.activo !== '') {
        where.activo = args.activo === true || args.activo === 'true';
      } else {
        where.activo = true;
      }

      if (args.tipo) {
        where.tipo = args.tipo;
      }

      const catalogos = await Catalogo.findAll({
        where,
        order: [
          ['tipo', 'ASC'],
          ['nombre', 'ASC']
        ]
      });

      resolve(Service.successResponse(catalogos, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al listar catálogos',
        detail: e.message
      }, 500));
    }
  }
);

const crearCatalogo = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const data = obtenerBody(args, ['catalogoCreate', 'CatalogoCreate']);

      if (!data.tipo || !data.nombre) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Faltan campos obligatorios: tipo y nombre'
        }, 400));
        return;
      }

      const catalogo = await Catalogo.create({
        tipo: data.tipo,
        nombre: data.nombre,
        valor: data.valor || data.nombre.toLowerCase().replace(/\s+/g, '_'),
        descripcion: data.descripcion || null,
        activo: data.activo !== undefined ? data.activo : true
      });

      resolve(Service.successResponse(catalogo, 201));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al crear catálogo',
        detail: e.message
      }, 500));
    }
  }
);

const obtenerCatalogoPorId = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const catalogo = await Catalogo.findByPk(id);

      if (!catalogo || catalogo.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Catálogo no encontrado'
        }, 404));
        return;
      }

      resolve(Service.successResponse(catalogo, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al obtener catálogo',
        detail: e.message
      }, 500));
    }
  }
);

const actualizarCatalogo = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const { id } = args;
      const data = obtenerBody(args, ['catalogoUpdate', 'CatalogoUpdate', 'catalogo']);

      const catalogo = await Catalogo.findByPk(id);

      if (!catalogo || catalogo.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Catálogo no encontrado'
        }, 404));
        return;
      }

      if (Object.keys(data).length === 0) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'No se recibieron datos para actualizar'
        }, 400));
        return;
      }

      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;

      await catalogo.update(data);

      const catalogoActualizado = await Catalogo.findByPk(id);

      resolve(Service.successResponse(catalogoActualizado, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al actualizar catálogo',
        detail: e.message
      }, 500));
    }
  }
);

const eliminarCatalogo = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const catalogo = await Catalogo.findByPk(id);

      if (!catalogo || catalogo.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Catálogo no encontrado'
        }, 404));
        return;
      }

      await catalogo.update({
        activo: false
      });

      resolve(Service.successResponse({
        status: 'ok',
        message: 'Catálogo eliminado correctamente'
      }, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al eliminar catálogo',
        detail: e.message
      }, 500));
    }
  }
);

module.exports = {
  listarCatalogos,
  crearCatalogo,
  obtenerCatalogoPorId,
  actualizarCatalogo,
  eliminarCatalogo
};
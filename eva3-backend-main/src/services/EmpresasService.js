/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { Empresa } = require('../models');
const { Op } = require('sequelize');

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

const listarEmpresas = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const estadoValidacion = args.estado_validacion || args.estadoValidacion;
      const rubro = args.rubro;

      const page = parseInt(args.page || 1, 10);
      const limit = parseInt(args.limit || 10, 10);
      const offset = (page - 1) * limit;

      const where = {
        activo: true
      };

      if (estadoValidacion) {
        where.estado_validacion = estadoValidacion;
      }

      if (rubro) {
        where.rubro = {
          [Op.like]: `%${rubro}%`
        };
      }

      const resultado = await Empresa.findAndCountAll({
        where,
        limit,
        offset,
        order: [['id', 'ASC']]
      });

      resolve(Service.successResponse({
        page,
        limit,
        total: resultado.count,
        data: resultado.rows
      }, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al listar empresas',
        detail: e.message
      }, 500));
    }
  }
);

const crearEmpresa = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const data = obtenerBody(args, ['empresaCreate', 'EmpresaCreate']);

      if (!data.rut_empresa || !data.nombre_empresa || !data.correo || !data.rubro) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Faltan campos obligatorios: rut_empresa, nombre_empresa, correo o rubro'
        }, 400));
        return;
      }

      const empresa = await Empresa.create({
        ...data,
        estado_validacion: data.estado_validacion || 'pendiente',
        activo: true
      });

      resolve(Service.successResponse(empresa, 201));
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Ya existe una empresa con ese RUT o correo'
        }, 409));
        return;
      }

      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al crear empresa',
        detail: e.message
      }, 500));
    }
  }
);

const obtenerEmpresaPorId = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const empresa = await Empresa.findByPk(id);

      if (!empresa || empresa.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Empresa no encontrada'
        }, 404));
        return;
      }

      resolve(Service.successResponse(empresa, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al obtener empresa',
        detail: e.message
      }, 500));
    }
  }
);

const actualizarEmpresa = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const { id } = args;
      const data = obtenerBody(args, ['empresaUpdate', 'EmpresaUpdate', 'empresa']);

      const empresa = await Empresa.findByPk(id);

      if (!empresa || empresa.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Empresa no encontrada'
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

      await empresa.update(data);

      const empresaActualizada = await Empresa.findByPk(id);

      resolve(Service.successResponse(empresaActualizada, 200));
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Ya existe una empresa con ese RUT o correo'
        }, 409));
        return;
      }

      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al actualizar empresa',
        detail: e.message
      }, 500));
    }
  }
);

const cambiarValidacionEmpresa = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const { id } = args;
      const data = obtenerBody(args, ['body', 'requestBody', 'validacionEmpresa']);

      const empresa = await Empresa.findByPk(id);

      if (!empresa || empresa.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Empresa no encontrada'
        }, 404));
        return;
      }

      if (!data.estado_validacion) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Debe indicar estado_validacion'
        }, 400));
        return;
      }

      await empresa.update({
        estado_validacion: data.estado_validacion,
        observacion_validacion: data.observacion_validacion || empresa.observacion_validacion,
        validado_por: data.validado_por || empresa.validado_por
      });

      const empresaActualizada = await Empresa.findByPk(id);

      resolve(Service.successResponse(empresaActualizada, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al cambiar validación de la empresa',
        detail: e.message
      }, 500));
    }
  }
);

const eliminarEmpresa = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const empresa = await Empresa.findByPk(id);

      if (!empresa || empresa.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Empresa no encontrada'
        }, 404));
        return;
      }

      await empresa.update({
        activo: false
      });

      resolve(Service.successResponse({
        status: 'ok',
        message: 'Empresa eliminada correctamente'
      }, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al eliminar empresa',
        detail: e.message
      }, 500));
    }
  }
);

module.exports = {
  listarEmpresas,
  crearEmpresa,
  obtenerEmpresaPorId,
  actualizarEmpresa,
  cambiarValidacionEmpresa,
  eliminarEmpresa
};
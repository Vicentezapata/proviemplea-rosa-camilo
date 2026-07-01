/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { Seguimiento, SolicitudContacto, Empresa, Talento } = require('../models');

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

const listarSeguimientos = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const page = parseInt(args.page || 1, 10);
      const limit = parseInt(args.limit || 10, 10);
      const offset = (page - 1) * limit;

      const where = {
        activo: true
      };

      if (args.solicitud_contacto_id) {
        where.solicitud_contacto_id = args.solicitud_contacto_id;
      }

      if (args.empresa_id) {
        where.empresa_id = args.empresa_id;
      }

      if (args.talento_id) {
        where.talento_id = args.talento_id;
      }

      if (args.estado_seguimiento) {
        where.estado_seguimiento = args.estado_seguimiento;
      }

      const resultado = await Seguimiento.findAndCountAll({
        where,
        include: [
          {
            model: SolicitudContacto,
            as: 'solicitud_contacto',
            attributes: ['id', 'estado_solicitud', 'mensaje']
          },
          {
            model: Empresa,
            as: 'empresa',
            attributes: ['id', 'nombre_empresa', 'rubro', 'estado_validacion']
          },
          {
            model: Talento,
            as: 'talento',
            attributes: ['id', 'codigo_talento', 'area_profesional', 'estado_perfil']
          }
        ],
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
        message: 'Error al listar seguimientos',
        detail: e.message
      }, 500));
    }
  }
);

const crearSeguimiento = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const data = obtenerBody(args, [
        'seguimientoCreate',
        'SeguimientoCreate'
      ]);

      if (!data.solicitud_contacto_id) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Falta campo obligatorio: solicitud_contacto_id'
        }, 400));
        return;
      }

      const solicitud = await SolicitudContacto.findByPk(data.solicitud_contacto_id);

      if (!solicitud || solicitud.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Solicitud de contacto no encontrada'
        }, 404));
        return;
      }

      const seguimiento = await Seguimiento.create({
        solicitud_contacto_id: data.solicitud_contacto_id,
        empresa_id: solicitud.empresa_id,
        talento_id: solicitud.talento_id,
        estado_seguimiento: data.estado_seguimiento || 'contactado',
        etapa: data.etapa || 'Contacto inicial',
        notas_internas: data.notas_internas || null,
        resultado_proceso: data.resultado_proceso || 'en_proceso',
        fecha_inicio: data.fecha_inicio || new Date(),
        fecha_actualizacion: data.fecha_actualizacion || new Date(),
        responsable_seguimiento: data.responsable_seguimiento || null,
        activo: true
      });

      resolve(Service.successResponse(seguimiento, 201));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al crear seguimiento',
        detail: e.message
      }, 500));
    }
  }
);

const obtenerSeguimientoPorId = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const seguimiento = await Seguimiento.findByPk(id, {
        include: [
          {
            model: SolicitudContacto,
            as: 'solicitud_contacto',
            attributes: ['id', 'estado_solicitud', 'mensaje']
          },
          {
            model: Empresa,
            as: 'empresa',
            attributes: ['id', 'nombre_empresa', 'rubro', 'estado_validacion']
          },
          {
            model: Talento,
            as: 'talento',
            attributes: ['id', 'codigo_talento', 'area_profesional', 'estado_perfil']
          }
        ]
      });

      if (!seguimiento || seguimiento.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Seguimiento no encontrado'
        }, 404));
        return;
      }

      resolve(Service.successResponse(seguimiento, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al obtener seguimiento',
        detail: e.message
      }, 500));
    }
  }
);

const actualizarSeguimiento = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const { id } = args;
      const data = obtenerBody(args, [
        'seguimientoUpdate',
        'SeguimientoUpdate',
        'seguimiento'
      ]);

      const seguimiento = await Seguimiento.findByPk(id);

      if (!seguimiento || seguimiento.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Seguimiento no encontrado'
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

      await seguimiento.update(data);

      const seguimientoActualizado = await Seguimiento.findByPk(id);

      resolve(Service.successResponse(seguimientoActualizado, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al actualizar seguimiento',
        detail: e.message
      }, 500));
    }
  }
);

const cambiarEstadoSeguimiento = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const { id } = args;
      const data = obtenerBody(args, [
        'body',
        'requestBody',
        'estadoSeguimiento'
      ]);

      const seguimiento = await Seguimiento.findByPk(id);

      if (!seguimiento || seguimiento.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Seguimiento no encontrado'
        }, 404));
        return;
      }

      if (!data.estado_seguimiento) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Debe indicar estado_seguimiento'
        }, 400));
        return;
      }

      await seguimiento.update({
        estado_seguimiento: data.estado_seguimiento,
        etapa: data.etapa || seguimiento.etapa,
        notas_internas: data.notas_internas || seguimiento.notas_internas,
        resultado_proceso: data.resultado_proceso || seguimiento.resultado_proceso,
        fecha_actualizacion: new Date(),
        responsable_seguimiento: data.responsable_seguimiento || seguimiento.responsable_seguimiento
      });

      const seguimientoActualizado = await Seguimiento.findByPk(id);

      resolve(Service.successResponse(seguimientoActualizado, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al cambiar estado del seguimiento',
        detail: e.message
      }, 500));
    }
  }
);

const eliminarSeguimiento = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const seguimiento = await Seguimiento.findByPk(id);

      if (!seguimiento || seguimiento.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Seguimiento no encontrado'
        }, 404));
        return;
      }

      await seguimiento.update({
        activo: false
      });

      resolve(Service.successResponse({
        status: 'ok',
        message: 'Seguimiento eliminado correctamente'
      }, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al eliminar seguimiento',
        detail: e.message
      }, 500));
    }
  }
);

module.exports = {
  listarSeguimientos,
  crearSeguimiento,
  obtenerSeguimientoPorId,
  actualizarSeguimiento,
  cambiarEstadoSeguimiento,
  eliminarSeguimiento
};
/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { SolicitudContacto, Empresa, Talento } = require('../models');

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

const listarSolicitudes = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const page = parseInt(args.page || 1, 10);
      const limit = parseInt(args.limit || 10, 10);
      const offset = (page - 1) * limit;

      const where = {
        activo: true
      };

      if (args.estado_solicitud) {
        where.estado_solicitud = args.estado_solicitud;
      }

      if (args.empresa_id) {
        where.empresa_id = args.empresa_id;
      }

      if (args.talento_id) {
        where.talento_id = args.talento_id;
      }

      const resultado = await SolicitudContacto.findAndCountAll({
        where,
        include: [
          {
            model: Empresa,
            as: 'empresa',
            attributes: ['id', 'nombre_empresa', 'rut_empresa', 'rubro', 'estado_validacion']
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
        message: 'Error al listar solicitudes',
        detail: e.message
      }, 500));
    }
  }
);

const crearSolicitud = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const data = obtenerBody(args, [
        'solicitudCreate',
        'SolicitudCreate',
        'solicitudContactoCreate',
        'SolicitudContactoCreate'
      ]);

      if (!data.empresa_id || !data.talento_id) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Faltan campos obligatorios: empresa_id y talento_id'
        }, 400));
        return;
      }

      const empresa = await Empresa.findByPk(data.empresa_id);
      const talento = await Talento.findByPk(data.talento_id);

      if (!empresa || empresa.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Empresa no encontrada'
        }, 404));
        return;
      }

      if (!talento || talento.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Talento no encontrado'
        }, 404));
        return;
      }

      const solicitudPendiente = await SolicitudContacto.findOne({
        where: {
          empresa_id: data.empresa_id,
          talento_id: data.talento_id,
          estado_solicitud: 'pendiente',
          activo: true
        }
      });

      if (solicitudPendiente) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Ya existe una solicitud pendiente para esta empresa y talento'
        }, 409));
        return;
      }

      const solicitud = await SolicitudContacto.create({
        empresa_id: data.empresa_id,
        talento_id: data.talento_id,
        estado_solicitud: data.estado_solicitud || 'pendiente',
        mensaje: data.mensaje || null,
        respuesta_admin: data.respuesta_admin || null,
        fecha_solicitud: new Date(),
        fecha_revision: data.fecha_revision || null,
        revisado_por: data.revisado_por || null,
        activo: true
      });

      resolve(Service.successResponse(solicitud, 201));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al crear solicitud',
        detail: e.message
      }, 500));
    }
  }
);

const obtenerSolicitudPorId = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const solicitud = await SolicitudContacto.findByPk(id, {
        include: [
          {
            model: Empresa,
            as: 'empresa',
            attributes: ['id', 'nombre_empresa', 'rut_empresa', 'rubro', 'estado_validacion']
          },
          {
            model: Talento,
            as: 'talento',
            attributes: ['id', 'codigo_talento', 'area_profesional', 'estado_perfil']
          }
        ]
      });

      if (!solicitud || solicitud.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Solicitud no encontrada'
        }, 404));
        return;
      }

      resolve(Service.successResponse(solicitud, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al obtener solicitud',
        detail: e.message
      }, 500));
    }
  }
);

const actualizarSolicitud = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const { id } = args;
      const data = obtenerBody(args, [
        'solicitudUpdate',
        'SolicitudUpdate',
        'solicitudContactoUpdate',
        'SolicitudContactoUpdate'
      ]);

      const solicitud = await SolicitudContacto.findByPk(id);

      if (!solicitud || solicitud.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Solicitud no encontrada'
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

      await solicitud.update(data);

      const solicitudActualizada = await SolicitudContacto.findByPk(id);

      resolve(Service.successResponse(solicitudActualizada, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al actualizar solicitud',
        detail: e.message
      }, 500));
    }
  }
);

const cambiarEstadoSolicitud = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const { id } = args;
      const data = obtenerBody(args, ['body', 'requestBody', 'estadoSolicitud']);

      const solicitud = await SolicitudContacto.findByPk(id);

      if (!solicitud || solicitud.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Solicitud no encontrada'
        }, 404));
        return;
      }

      if (!data.estado_solicitud) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Debe indicar estado_solicitud'
        }, 400));
        return;
      }

      await solicitud.update({
        estado_solicitud: data.estado_solicitud,
        respuesta_admin: data.respuesta_admin || solicitud.respuesta_admin,
        fecha_revision: new Date(),
        revisado_por: data.revisado_por || solicitud.revisado_por
      });

      const solicitudActualizada = await SolicitudContacto.findByPk(id);

      resolve(Service.successResponse(solicitudActualizada, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al cambiar estado de la solicitud',
        detail: e.message
      }, 500));
    }
  }
);

const eliminarSolicitud = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const solicitud = await SolicitudContacto.findByPk(id);

      if (!solicitud || solicitud.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Solicitud no encontrada'
        }, 404));
        return;
      }

      await solicitud.update({
        activo: false
      });

      resolve(Service.successResponse({
        status: 'ok',
        message: 'Solicitud eliminada correctamente'
      }, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al eliminar solicitud',
        detail: e.message
      }, 500));
    }
  }
);

module.exports = {
  listarSolicitudes,
  crearSolicitud,
  obtenerSolicitudPorId,
  actualizarSolicitud,
  cambiarEstadoSolicitud,
  eliminarSolicitud
};
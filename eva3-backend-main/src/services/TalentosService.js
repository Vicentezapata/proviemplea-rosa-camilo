/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { Talento } = require('../models');
const { Op } = require('sequelize');

const camposCVCiego = [
  'id',
  'codigo_talento',
  'resumen_profesional',
  'area_profesional',
  'nivel_educacional',
  'experiencia_laboral',
  'competencias_tecnicas',
  'idiomas',
  'portafolio_url',
  'discapacidad_ley_21015',
  'condiciones_laborales',
  'pretension_renta',
  'estado_perfil',
  'porcentaje_completitud',
  'activo'
];

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

const generarCodigoTalento = async () => {
  const total = await Talento.count();
  return `TAL-${String(total + 1).padStart(4, '0')}`;
};

const listarTalentos = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const estadoPerfil = args.estado_perfil || args.estadoPerfil;
      const areaProfesional = args.area_profesional || args.areaProfesional;
      const discapacidad = args.discapacidad_ley_21015 ?? args.discapacidadLey21015;
      const pretensionRentaMax = args.pretension_renta_max || args.pretensionRentaMax;

      const page = parseInt(args.page || 1, 10);
      const limit = parseInt(args.limit || 10, 10);
      const offset = (page - 1) * limit;

      const where = {
        activo: true
      };

      if (estadoPerfil) {
        where.estado_perfil = estadoPerfil;
      }

      if (areaProfesional) {
        where.area_profesional = {
          [Op.like]: `%${areaProfesional}%`
        };
      }

      if (discapacidad !== undefined && discapacidad !== null && discapacidad !== '') {
        where.discapacidad_ley_21015 = discapacidad === true || discapacidad === 'true';
      }

      if (pretensionRentaMax) {
        where.pretension_renta = {
          [Op.lte]: parseInt(pretensionRentaMax, 10)
        };
      }

      const resultado = await Talento.findAndCountAll({
        where,
        attributes: camposCVCiego,
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
        message: 'Error al listar talentos',
        detail: e.message
      }, 500));
    }
  }
);

const crearTalento = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const data = obtenerBody(args, ['talentoCreate', 'TalentoCreate']);

      if (!data.rut || !data.nombre || !data.correo || !data.resumen_profesional || !data.area_profesional) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Faltan campos obligatorios: rut, nombre, correo, resumen_profesional o area_profesional'
        }, 400));
        return;
      }

      const codigo = data.codigo_talento || await generarCodigoTalento();

      const talento = await Talento.create({
        ...data,
        codigo_talento: codigo,
        estado_perfil: data.estado_perfil || 'pendiente',
        porcentaje_completitud: data.porcentaje_completitud || 0,
        discapacidad_ley_21015: data.discapacidad_ley_21015 || false,
        activo: true
      });

      resolve(Service.successResponse(talento, 201));
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Ya existe un talento con ese RUT, correo o código'
        }, 409));
        return;
      }

      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al crear talento',
        detail: e.message
      }, 500));
    }
  }
);

const obtenerTalentoPorId = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const talento = await Talento.findByPk(id);

      if (!talento || talento.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Talento no encontrado'
        }, 404));
        return;
      }

      resolve(Service.successResponse(talento, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al obtener talento',
        detail: e.message
      }, 500));
    }
  }
);

const actualizarTalento = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const { id } = args;
      const data = obtenerBody(args, ['talentoUpdate', 'TalentoUpdate', 'talento']);

      const talento = await Talento.findByPk(id);

      if (!talento || talento.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Talento no encontrado'
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
      delete data.codigo_talento;
      delete data.createdAt;
      delete data.updatedAt;

      await talento.update(data);

      const talentoActualizado = await Talento.findByPk(id);

      resolve(Service.successResponse(talentoActualizado, 200));
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Ya existe un talento con ese RUT, correo o código'
        }, 409));
        return;
      }

      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al actualizar talento',
        detail: e.message
      }, 500));
    }
  }
);

const cambiarEstadoTalento = (args = {}) => new Promise(
  async (resolve, reject) => {
    try {
      const { id } = args;
      const data = obtenerBody(args, ['body', 'requestBody', 'estadoTalento']);

      const talento = await Talento.findByPk(id);

      if (!talento || talento.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Talento no encontrado'
        }, 404));
        return;
      }

      if (!data.estado_perfil) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Debe indicar estado_perfil'
        }, 400));
        return;
      }

      await talento.update({
        estado_perfil: data.estado_perfil,
        observacion_validacion: data.observacion_validacion || talento.observacion_validacion,
        validado_por: data.validado_por || talento.validado_por,
        porcentaje_completitud: data.estado_perfil === 'validado' ? 100 : talento.porcentaje_completitud
      });

      const talentoActualizado = await Talento.findByPk(id);

      resolve(Service.successResponse(talentoActualizado, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al cambiar estado del talento',
        detail: e.message
      }, 500));
    }
  }
);

const eliminarTalento = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const talento = await Talento.findByPk(id);

      if (!talento || talento.activo === false) {
        reject(Service.rejectResponse({
          status: 'error',
          message: 'Talento no encontrado'
        }, 404));
        return;
      }

      await talento.update({
        activo: false
      });

      resolve(Service.successResponse({
        status: 'ok',
        message: 'Talento eliminado correctamente'
      }, 200));
    } catch (e) {
      reject(Service.rejectResponse({
        status: 'error',
        message: 'Error al eliminar talento',
        detail: e.message
      }, 500));
    }
  }
);

module.exports = {
  listarTalentos,
  crearTalento,
  obtenerTalentoPorId,
  actualizarTalento,
  cambiarEstadoTalento,
  eliminarTalento
};
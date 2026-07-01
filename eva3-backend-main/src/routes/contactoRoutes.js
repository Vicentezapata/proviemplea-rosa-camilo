const express = require('express');
const { SolicitudContacto, Talento } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get(
  '/solicitudes/:id/contacto',
  authMiddleware,
  roleMiddleware('admin', 'empresa'),
  async (req, res) => {
    try {
      const { id } = req.params;

      const solicitud = await SolicitudContacto.findByPk(id);

      if (!solicitud) {
        return res.status(404).json({
          status: 'error',
          message: 'Solicitud de contacto no encontrada'
        });
      }

      const solicitudData = solicitud.toJSON();

      if (
        req.usuario.rol === 'empresa' &&
        solicitudData.empresa_id !== req.usuario.empresa_id
      ) {
        return res.status(403).json({
          status: 'error',
          message: 'No tiene permiso para ver esta solicitud'
        });
      }

      if (
        solicitudData.estado_solicitud !== 'aceptada' &&
        solicitudData.estado_solicitud !== 'aprobada'
      ) {
        return res.status(403).json({
          status: 'error',
          message: 'El contacto aún no ha sido autorizado por la Municipalidad'
        });
      }

      const talento = await Talento.findByPk(solicitudData.talento_id);

      if (!talento) {
        return res.status(404).json({
          status: 'error',
          message: 'Talento asociado no encontrado'
        });
      }

      const talentoData = talento.toJSON();

      return res.status(200).json({
        status: 'ok',
        message: 'Contacto liberado correctamente',
        solicitud: {
          id: solicitudData.id,
          estado_solicitud: solicitudData.estado_solicitud,
          empresa_id: solicitudData.empresa_id,
          talento_id: solicitudData.talento_id
        },
        contacto: {
          talento_id: talentoData.id,
          nombre:
            talentoData.nombre ||
            talentoData.nombre_completo ||
            talentoData.nombres ||
            null,
          email:
            talentoData.email ||
            talentoData.correo ||
            null,
          telefono:
            talentoData.telefono ||
            talentoData.celular ||
            null
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error interno al liberar contacto',
        detail: error.message
      });
    }
  }
);

module.exports = router;
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('SolicitudContactos', [
      {
        empresa_id: 1,
        talento_id: 1,
        estado_solicitud: 'aprobada',
        mensaje: 'Nos interesa contactar a este talento por su experiencia administrativa y atención de clientes.',
        respuesta_admin: 'Solicitud aprobada. Talento disponible para proceso de contacto.',
        fecha_solicitud: now,
        fecha_revision: now,
        revisado_por: 'Administrador Departamento de Empleo',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        empresa_id: 1,
        talento_id: 2,
        estado_solicitud: 'pendiente',
        mensaje: 'Empresa solicita contactar talento con conocimientos en tecnología y soporte TI.',
        respuesta_admin: null,
        fecha_solicitud: now,
        fecha_revision: null,
        revisado_por: null,
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        empresa_id: 2,
        talento_id: 3,
        estado_solicitud: 'rechazada',
        mensaje: 'Empresa solicita contacto para cargo comercial presencial.',
        respuesta_admin: 'Solicitud rechazada temporalmente porque el perfil del talento aún se encuentra pendiente de validación.',
        fecha_solicitud: now,
        fecha_revision: now,
        revisado_por: 'Administrador Departamento de Empleo',
        activo: true,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SolicitudContactos', null, {});
  }
};
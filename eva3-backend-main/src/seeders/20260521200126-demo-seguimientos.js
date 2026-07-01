'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('Seguimientos', [
      {
        solicitud_contacto_id: 1,
        empresa_id: 1,
        talento_id: 1,
        estado_seguimiento: 'contactado',
        etapa: 'Contacto inicial',
        notas_internas: 'Empresa contactó al talento para coordinar entrevista.',
        resultado_proceso: 'en_proceso',
        fecha_inicio: now,
        fecha_actualizacion: now,
        responsable_seguimiento: 'Administrador Departamento de Empleo',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        solicitud_contacto_id: 2,
        empresa_id: 1,
        talento_id: 2,
        estado_seguimiento: 'entrevista',
        etapa: 'Entrevista técnica',
        notas_internas: 'Talento citado a entrevista técnica para cargo de soporte TI.',
        resultado_proceso: 'en_proceso',
        fecha_inicio: now,
        fecha_actualizacion: now,
        responsable_seguimiento: 'Administrador Departamento de Empleo',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        solicitud_contacto_id: 3,
        empresa_id: 2,
        talento_id: 3,
        estado_seguimiento: 'no_seleccionado',
        etapa: 'Cierre de proceso',
        notas_internas: 'Proceso cerrado debido a que el perfil aún no estaba validado.',
        resultado_proceso: 'cerrado',
        fecha_inicio: now,
        fecha_actualizacion: now,
        responsable_seguimiento: 'Administrador Departamento de Empleo',
        activo: true,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seguimientos', null, {});
  }
};
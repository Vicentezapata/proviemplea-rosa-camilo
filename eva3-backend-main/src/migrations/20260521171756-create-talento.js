'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Talentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      codigo_talento: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },

      rut: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },

      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },

      correo: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },

      telefono: {
        allowNull: true,
        type: Sequelize.STRING
      },

      direccion: {
        allowNull: true,
        type: Sequelize.STRING
      },

      fecha_nacimiento: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },

      genero: {
        allowNull: true,
        type: Sequelize.STRING
      },

      comuna: {
        allowNull: true,
        type: Sequelize.STRING
      },

      resumen_profesional: {
        allowNull: false,
        type: Sequelize.TEXT
      },

      area_profesional: {
        allowNull: false,
        type: Sequelize.STRING
      },

      nivel_educacional: {
        allowNull: true,
        type: Sequelize.STRING
      },

      experiencia_laboral: {
        allowNull: true,
        type: Sequelize.TEXT
      },

      competencias_tecnicas: {
        allowNull: true,
        type: Sequelize.TEXT
      },

      idiomas: {
        allowNull: true,
        type: Sequelize.TEXT
      },

      portafolio_url: {
        allowNull: true,
        type: Sequelize.STRING
      },

      discapacidad_ley_21015: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      condiciones_laborales: {
        allowNull: true,
        type: Sequelize.TEXT
      },

      pretension_renta: {
        allowNull: true,
        type: Sequelize.INTEGER
      },

      estado_perfil: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'pendiente'
      },

      porcentaje_completitud: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      observacion_validacion: {
        allowNull: true,
        type: Sequelize.TEXT
      },

      validado_por: {
        allowNull: true,
        type: Sequelize.STRING
      },

      activo: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Talentos');
  }
};
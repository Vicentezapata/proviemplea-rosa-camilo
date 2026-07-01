'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      rut_empresa: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },

      nombre_empresa: {
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

      rubro: {
        allowNull: false,
        type: Sequelize.STRING
      },

      tipo_empresa: {
        allowNull: true,
        type: Sequelize.STRING
      },

      presentacion: {
        allowNull: true,
        type: Sequelize.TEXT
      },

      beneficios: {
        allowNull: true,
        type: Sequelize.TEXT
      },

      contactos_empresa: {
        allowNull: true,
        type: Sequelize.TEXT
      },

      estado_validacion: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'pendiente'
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
    await queryInterface.dropTable('Empresas');
  }
};
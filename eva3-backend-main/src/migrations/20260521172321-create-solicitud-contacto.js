'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SolicitudContactos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      empresa_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Empresas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      talento_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Talentos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      estado_solicitud: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'pendiente'
      },

      mensaje: {
        allowNull: true,
        type: Sequelize.TEXT
      },

      respuesta_admin: {
        allowNull: true,
        type: Sequelize.TEXT
      },

      fecha_solicitud: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      fecha_revision: {
        allowNull: true,
        type: Sequelize.DATE
      },

      revisado_por: {
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
    await queryInterface.dropTable('SolicitudContactos');
  }
};
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seguimientos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      solicitud_contacto_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'SolicitudContactos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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

      estado_seguimiento: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'contactado'
      },

      etapa: {
        allowNull: true,
        type: Sequelize.STRING
      },

      notas_internas: {
        allowNull: true,
        type: Sequelize.TEXT
      },

      resultado_proceso: {
        allowNull: true,
        type: Sequelize.STRING
      },

      fecha_inicio: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      fecha_actualizacion: {
        allowNull: true,
        type: Sequelize.DATE
      },

      responsable_seguimiento: {
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
    await queryInterface.dropTable('Seguimientos');
  }
};
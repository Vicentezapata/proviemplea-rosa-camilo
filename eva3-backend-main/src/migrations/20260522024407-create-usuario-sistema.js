'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UsuarioSistemas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },

      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },

      password_hash: {
        allowNull: false,
        type: Sequelize.STRING
      },

      rol: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'talento'
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

  async down(queryInterface) {
    await queryInterface.dropTable('UsuarioSistemas');
  }
};

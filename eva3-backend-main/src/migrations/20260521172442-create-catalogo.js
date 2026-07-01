'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Catalogos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      tipo: {
        allowNull: false,
        type: Sequelize.STRING
      },

      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },

      valor: {
        allowNull: false,
        type: Sequelize.STRING
      },

      descripcion: {
        allowNull: true,
        type: Sequelize.TEXT
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

    await queryInterface.addIndex('Catalogos', ['tipo', 'valor'], {
      unique: true,
      name: 'catalogos_tipo_valor_unique'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Catalogos');
  }
};

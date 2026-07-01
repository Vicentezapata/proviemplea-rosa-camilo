'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('UsuarioSistemas', 'empresa_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Empresas',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('UsuarioSistemas', 'talento_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Talentos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('UsuarioSistemas', 'talento_id');
    await queryInterface.removeColumn('UsuarioSistemas', 'empresa_id');
  }
};
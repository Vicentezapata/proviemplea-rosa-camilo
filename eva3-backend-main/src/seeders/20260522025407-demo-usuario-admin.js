'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const passwordHash = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('UsuarioSistemas', [
      {
        nombre: 'Administrador ProviEmplea',
        email: 'admin@proviemplea.cl',
        password_hash: passwordHash,
        rol: 'admin',
        activo: true,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UsuarioSistemas', {
      email: 'admin@proviemplea.cl'
    });
  }
};
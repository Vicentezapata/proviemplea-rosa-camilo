'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const empresas = await queryInterface.sequelize.query(
      'SELECT id FROM Empresas ORDER BY id ASC LIMIT 1',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const talentos = await queryInterface.sequelize.query(
      'SELECT id FROM Talentos ORDER BY id ASC LIMIT 1',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const empresaId = empresas.length > 0 ? empresas[0].id : null;
    const talentoId = talentos.length > 0 ? talentos[0].id : null;

    const passwordEmpresa = await bcrypt.hash('empresa123', 10);
    const passwordTalento = await bcrypt.hash('talento123', 10);

    await queryInterface.bulkInsert('UsuarioSistemas', [
      {
        nombre: 'Empresa Demo ProviEmplea',
        email: 'empresa@proviemplea.cl',
        password_hash: passwordEmpresa,
        rol: 'empresa',
        activo: true,
        empresa_id: empresaId,
        talento_id: null,
        createdAt: now,
        updatedAt: now
      },
      {
        nombre: 'Talento Demo ProviEmplea',
        email: 'talento@proviemplea.cl',
        password_hash: passwordTalento,
        rol: 'talento',
        activo: true,
        empresa_id: null,
        talento_id: talentoId,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM UsuarioSistemas
      WHERE email IN ('empresa@proviemplea.cl', 'talento@proviemplea.cl')
    `);
  }
};
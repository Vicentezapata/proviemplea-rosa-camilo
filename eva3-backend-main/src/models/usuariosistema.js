'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsuarioSistema extends Model {
    static associate(models) {
      UsuarioSistema.belongsTo(models.Empresa, {
        foreignKey: 'empresa_id',
        as: 'empresa'
      });

      UsuarioSistema.belongsTo(models.Talento, {
        foreignKey: 'talento_id',
        as: 'talento'
      });
    }
  }

  UsuarioSistema.init(
    {
      nombre: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      rol: DataTypes.STRING,
      activo: DataTypes.BOOLEAN,
      empresa_id: DataTypes.INTEGER,
      talento_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'UsuarioSistema',
      tableName: 'UsuarioSistemas'
    }
  );

  return UsuarioSistema;
};
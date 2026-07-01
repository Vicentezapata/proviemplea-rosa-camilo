'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Catalogo extends Model {
    static associate(models) {
      // Esta tabla funciona como apoyo para estados, rubros, modalidades, jornadas, roles, etc.
      // No requiere relación directa obligatoria para esta evaluación.
    }
  }

  Catalogo.init(
    {
      tipo: DataTypes.STRING,
      nombre: DataTypes.STRING,
      valor: DataTypes.STRING,
      descripcion: DataTypes.TEXT,
      activo: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Catalogo',
      tableName: 'Catalogos'
    }
  );

  return Catalogo;
};


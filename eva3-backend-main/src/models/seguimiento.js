'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Seguimiento extends Model {
    static associate(models) {
      Seguimiento.belongsTo(models.SolicitudContacto, {
        foreignKey: 'solicitud_contacto_id',
        as: 'solicitud_contacto'
      });

      Seguimiento.belongsTo(models.Empresa, {
        foreignKey: 'empresa_id',
        as: 'empresa'
      });

      Seguimiento.belongsTo(models.Talento, {
        foreignKey: 'talento_id',
        as: 'talento'
      });
    }
  }

  Seguimiento.init(
    {
      solicitud_contacto_id: DataTypes.INTEGER,
      empresa_id: DataTypes.INTEGER,
      talento_id: DataTypes.INTEGER,
      estado_seguimiento: DataTypes.STRING,
      etapa: DataTypes.STRING,
      notas_internas: DataTypes.TEXT,
      resultado_proceso: DataTypes.STRING,
      fecha_inicio: DataTypes.DATE,
      fecha_actualizacion: DataTypes.DATE,
      responsable_seguimiento: DataTypes.STRING,
      activo: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Seguimiento',
      tableName: 'Seguimientos'
    }
  );

  return Seguimiento;
};
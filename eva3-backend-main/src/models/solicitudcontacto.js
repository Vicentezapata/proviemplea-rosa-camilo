'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SolicitudContacto extends Model {
    static associate(models) {
      SolicitudContacto.belongsTo(models.Empresa, {
        foreignKey: 'empresa_id',
        as: 'empresa'
      });

      SolicitudContacto.belongsTo(models.Talento, {
        foreignKey: 'talento_id',
        as: 'talento'
      });

      SolicitudContacto.hasMany(models.Seguimiento, {
        foreignKey: 'solicitud_contacto_id',
        as: 'seguimientos'
      });
    }
  }

  SolicitudContacto.init(
    {
      empresa_id: DataTypes.INTEGER,
      talento_id: DataTypes.INTEGER,
      estado_solicitud: DataTypes.STRING,
      mensaje: DataTypes.TEXT,
      respuesta_admin: DataTypes.TEXT,
      fecha_solicitud: DataTypes.DATE,
      fecha_revision: DataTypes.DATE,
      revisado_por: DataTypes.STRING,
      activo: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'SolicitudContacto',
      tableName: 'SolicitudContactos'
    }
  );

  return SolicitudContacto;
};
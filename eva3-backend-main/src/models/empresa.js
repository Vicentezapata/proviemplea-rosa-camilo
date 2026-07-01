'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    static associate(models) {
      Empresa.hasMany(models.SolicitudContacto, {
        foreignKey: 'empresa_id',
        as: 'solicitudes_contacto'
      });

      Empresa.hasMany(models.Seguimiento, {
        foreignKey: 'empresa_id',
        as: 'seguimientos'
      });
    }
  }

  Empresa.init(
    {
      rut_empresa: DataTypes.STRING,
      nombre_empresa: DataTypes.STRING,
      correo: DataTypes.STRING,
      telefono: DataTypes.STRING,
      direccion: DataTypes.STRING,
      rubro: DataTypes.STRING,
      tipo_empresa: DataTypes.STRING,
      presentacion: DataTypes.TEXT,
      beneficios: DataTypes.TEXT,
      contactos_empresa: DataTypes.TEXT,
      estado_validacion: DataTypes.STRING,
      observacion_validacion: DataTypes.TEXT,
      validado_por: DataTypes.STRING,
      activo: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Empresa',
      tableName: 'Empresas'
    }
  );

  return Empresa;
};
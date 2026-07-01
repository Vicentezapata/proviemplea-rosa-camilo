'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Talento extends Model {
    static associate(models) {
      Talento.hasMany(models.SolicitudContacto, {
        foreignKey: 'talento_id',
        as: 'solicitudes_contacto'
      });

      Talento.hasMany(models.Seguimiento, {
        foreignKey: 'talento_id',
        as: 'seguimientos'
      });
    }
  }

  Talento.init(
    {
      codigo_talento: DataTypes.STRING,
      rut: DataTypes.STRING,
      nombre: DataTypes.STRING,
      correo: DataTypes.STRING,
      telefono: DataTypes.STRING,
      direccion: DataTypes.STRING,
      fecha_nacimiento: DataTypes.DATEONLY,
      genero: DataTypes.STRING,
      comuna: DataTypes.STRING,
      resumen_profesional: DataTypes.TEXT,
      area_profesional: DataTypes.STRING,
      nivel_educacional: DataTypes.STRING,
      experiencia_laboral: DataTypes.TEXT,
      competencias_tecnicas: DataTypes.TEXT,
      idiomas: DataTypes.TEXT,
      portafolio_url: DataTypes.STRING,
      discapacidad_ley_21015: DataTypes.BOOLEAN,
      condiciones_laborales: DataTypes.TEXT,
      pretension_renta: DataTypes.INTEGER,
      estado_perfil: DataTypes.STRING,
      porcentaje_completitud: DataTypes.INTEGER,
      observacion_validacion: DataTypes.TEXT,
      validado_por: DataTypes.STRING,
      activo: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Talento',
      tableName: 'Talentos'
    }
  );

  return Talento;
};
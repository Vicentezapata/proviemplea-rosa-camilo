'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('Empresas', [
      {
        rut_empresa: '76123456-7',
        nombre_empresa: 'Servicios Digitales Providencia SpA',
        correo: 'contacto@serviciosdigitales.cl',
        telefono: '+56223456789',
        direccion: 'Av. Nueva Providencia 1881',
        rubro: 'Tecnología',
        tipo_empresa: 'Contratación directa',
        presentacion: 'Empresa dedicada al desarrollo de soluciones digitales y soporte tecnológico.',
        beneficios: 'Modalidad híbrida, capacitación, seguro complementario.',
        contactos_empresa: 'RRHH: rrhh@serviciosdigitales.cl, +56911112222',
        estado_validacion: 'validada',
        observacion_validacion: 'Empresa validada por administración.',
        validado_por: 'Administrador Departamento de Empleo',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        rut_empresa: '77222333-4',
        nombre_empresa: 'Comercial Los Leones Ltda',
        correo: 'rrhh@comerciallosleones.cl',
        telefono: '+56224567890',
        direccion: 'Los Leones 850',
        rubro: 'Comercio',
        tipo_empresa: 'Contratación directa',
        presentacion: 'Empresa del área comercial orientada a ventas y atención de clientes.',
        beneficios: 'Bonos por desempeño, capacitación interna.',
        contactos_empresa: 'Reclutamiento: seleccion@comerciallosleones.cl, +56922223333',
        estado_validacion: 'validada',
        observacion_validacion: 'Empresa aprobada para solicitar talentos.',
        validado_por: 'Administrador Departamento de Empleo',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        rut_empresa: '78333444-5',
        nombre_empresa: 'Administraciones Urbanas SPA',
        correo: 'personas@adminurbanas.cl',
        telefono: '+56225678901',
        direccion: 'Providencia 2200',
        rubro: 'Administración',
        tipo_empresa: 'Outsourcing',
        presentacion: 'Empresa orientada a servicios administrativos y gestión operacional.',
        beneficios: 'Jornada completa, estabilidad laboral, desarrollo profesional.',
        contactos_empresa: 'Contacto empresa: personas@adminurbanas.cl, +56933334444',
        estado_validacion: 'pendiente',
        observacion_validacion: 'Pendiente revisión de antecedentes comerciales.',
        validado_por: null,
        activo: true,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Empresas', null, {});
  }
};
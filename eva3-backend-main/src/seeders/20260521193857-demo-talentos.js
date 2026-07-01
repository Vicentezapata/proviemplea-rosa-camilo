'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('Talentos', [
      {
        codigo_talento: 'TAL-0001',
        rut: '11111111-1',
        nombre: 'Camila Torres',
        correo: 'camila.torres@example.com',
        telefono: '+56911111111',
        direccion: 'Av. Providencia 1234',
        fecha_nacimiento: '1995-05-10',
        genero: 'Femenino',
        comuna: 'Providencia',
        resumen_profesional: 'Profesional con experiencia en atención de clientes y gestión administrativa.',
        area_profesional: 'Administración',
        nivel_educacional: 'Técnico nivel superior',
        experiencia_laboral: '3 años en atención de público, gestión documental y apoyo administrativo.',
        competencias_tecnicas: 'Excel, atención al cliente, gestión documental, correo corporativo.',
        idiomas: 'Inglés nivel intermedio.',
        portafolio_url: 'https://portafolio.example.com/talento1',
        discapacidad_ley_21015: true,
        condiciones_laborales: 'Jornada completa, modalidad híbrida.',
        pretension_renta: 800000,
        estado_perfil: 'validado',
        porcentaje_completitud: 95,
        observacion_validacion: 'Perfil validado para vitrina laboral.',
        validado_por: 'Administrador Departamento de Empleo',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        codigo_talento: 'TAL-0002',
        rut: '22222222-2',
        nombre: 'Jorge Martínez',
        correo: 'jorge.martinez@example.com',
        telefono: '+56922222222',
        direccion: 'Los Leones 456',
        fecha_nacimiento: '1990-08-20',
        genero: 'Masculino',
        comuna: 'Providencia',
        resumen_profesional: 'Desarrollador junior con conocimientos en backend, bases de datos y soporte técnico.',
        area_profesional: 'Tecnología',
        nivel_educacional: 'Ingeniería en Informática',
        experiencia_laboral: '1 año en soporte TI y desarrollo de aplicaciones web.',
        competencias_tecnicas: 'Node.js, Express, MySQL, Sequelize, Git, Postman.',
        idiomas: 'Inglés básico.',
        portafolio_url: 'https://github.com/talento2',
        discapacidad_ley_21015: false,
        condiciones_laborales: 'Jornada completa, modalidad remota o híbrida.',
        pretension_renta: 950000,
        estado_perfil: 'validado',
        porcentaje_completitud: 90,
        observacion_validacion: 'Perfil técnico validado.',
        validado_por: 'Administrador Departamento de Empleo',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        codigo_talento: 'TAL-0003',
        rut: '33333333-3',
        nombre: 'Valentina Rojas',
        correo: 'valentina.rojas@example.com',
        telefono: '+56933333333',
        direccion: 'Pedro de Valdivia 789',
        fecha_nacimiento: '1998-03-15',
        genero: 'Femenino',
        comuna: 'Providencia',
        resumen_profesional: 'Ejecutiva comercial con experiencia en ventas, atención al cliente y seguimiento de cartera.',
        area_profesional: 'Comercio',
        nivel_educacional: 'Enseñanza media completa',
        experiencia_laboral: '4 años en ventas presenciales y telefónicas.',
        competencias_tecnicas: 'Ventas, CRM, atención de clientes, seguimiento comercial.',
        idiomas: 'Español nativo.',
        portafolio_url: null,
        discapacidad_ley_21015: false,
        condiciones_laborales: 'Jornada completa o parcial, modalidad presencial.',
        pretension_renta: 700000,
        estado_perfil: 'pendiente',
        porcentaje_completitud: 75,
        observacion_validacion: 'Pendiente revisión de antecedentes.',
        validado_por: null,
        activo: true,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Talentos', null, {});
  }
};
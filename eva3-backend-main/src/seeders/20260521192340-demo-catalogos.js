'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('Catalogos', [
      // Estados de perfil
      {
        tipo: 'estado_perfil',
        nombre: 'Pendiente',
        valor: 'pendiente',
        descripcion: 'Perfil creado, pendiente de revisión por administración.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        tipo: 'estado_perfil',
        nombre: 'Validado',
        valor: 'validado',
        descripcion: 'Perfil aprobado para aparecer en la vitrina de talentos.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        tipo: 'estado_perfil',
        nombre: 'Rechazado',
        valor: 'rechazado',
        descripcion: 'Perfil no aprobado por incumplimiento de requisitos.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },

      // Estados de solicitud
      {
        tipo: 'estado_solicitud',
        nombre: 'Pendiente',
        valor: 'pendiente',
        descripcion: 'Solicitud de contacto ingresada por empresa.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        tipo: 'estado_solicitud',
        nombre: 'Aprobada',
        valor: 'aprobada',
        descripcion: 'Solicitud revisada y aprobada por administración.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        tipo: 'estado_solicitud',
        nombre: 'Rechazada',
        valor: 'rechazada',
        descripcion: 'Solicitud rechazada por administración.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },

      // Estados de seguimiento
      {
        tipo: 'estado_seguimiento',
        nombre: 'Contactado',
        valor: 'contactado',
        descripcion: 'La empresa realizó contacto inicial con el talento.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        tipo: 'estado_seguimiento',
        nombre: 'Entrevista',
        valor: 'entrevista',
        descripcion: 'Talento se encuentra en etapa de entrevista.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        tipo: 'estado_seguimiento',
        nombre: 'Seleccionado',
        valor: 'seleccionado',
        descripcion: 'Talento seleccionado por la empresa.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        tipo: 'estado_seguimiento',
        nombre: 'No seleccionado',
        valor: 'no_seleccionado',
        descripcion: 'Talento no continúa en el proceso.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        tipo: 'estado_seguimiento',
        nombre: 'Contratado',
        valor: 'contratado',
        descripcion: 'Talento contratado por la empresa.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },

      // Rubros
      {
        tipo: 'rubro',
        nombre: 'Tecnología',
        valor: 'tecnologia',
        descripcion: 'Empresas del área tecnológica e informática.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        tipo: 'rubro',
        nombre: 'Administración',
        valor: 'administracion',
        descripcion: 'Empresas o cargos administrativos.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        tipo: 'rubro',
        nombre: 'Comercio',
        valor: 'comercio',
        descripcion: 'Empresas del área comercial, ventas y atención de público.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },

      // Modalidades
      {
        tipo: 'modalidad',
        nombre: 'Presencial',
        valor: 'presencial',
        descripcion: 'Trabajo presencial.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        tipo: 'modalidad',
        nombre: 'Híbrida',
        valor: 'hibrida',
        descripcion: 'Trabajo con modalidad mixta presencial y remota.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        tipo: 'modalidad',
        nombre: 'Remota',
        valor: 'remota',
        descripcion: 'Trabajo remoto.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },

      // Jornadas
      {
        tipo: 'jornada',
        nombre: 'Completa',
        valor: 'completa',
        descripcion: 'Jornada laboral completa.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        tipo: 'jornada',
        nombre: 'Parcial',
        valor: 'parcial',
        descripcion: 'Jornada laboral parcial.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },

      // Idiomas
      {
        tipo: 'idioma',
        nombre: 'Inglés',
        valor: 'ingles',
        descripcion: 'Idioma inglés.',
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        tipo: 'idioma',
        nombre: 'Español',
        valor: 'espanol',
        descripcion: 'Idioma español.',
        activo: true,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Catalogos', null, {});
  }
};
require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UsuarioSistema } = require('../models');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email y contraseña son obligatorios'
      });
    }

    const usuario = await UsuarioSistema.findOne({
      where: {
        email,
        activo: true
      }
    });

    if (!usuario) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas'
      });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password_hash);

    if (!passwordValida) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas'
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        empresa_id: usuario.empresa_id,
        talento_id: usuario.talento_id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '8h'
      }
    );

    return res.status(200).json({
      status: 'ok',
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        empresa_id: usuario.empresa_id,
        talento_id: usuario.talento_id
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error interno al iniciar sesión',
      detail: error.message
    });
  }
});

router.get('/perfil', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Token no enviado'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await UsuarioSistema.findByPk(decoded.id, {
      attributes: [
        'id',
        'nombre',
        'email',
        'rol',
        'activo',
        'empresa_id',
        'talento_id'
      ]
    });

    if (!usuario || usuario.activo === false) {
      return res.status(401).json({
        status: 'error',
        message: 'Usuario no válido'
      });
    }

    return res.status(200).json({
      status: 'ok',
      usuario
    });
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Token inválido o expirado'
    });
  }
});

module.exports = router;
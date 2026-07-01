require('dotenv').config();

const jwt = require('jsonwebtoken');
const { UsuarioSistema } = require('../models');

const authMiddleware = async (req, res, next) => {
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

    req.usuario = usuario.toJSON();

    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Token inválido o expirado'
    });
  }
};

module.exports = authMiddleware;
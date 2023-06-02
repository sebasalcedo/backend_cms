const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
  const token = req.header('token');

  // Verificar el token

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay Token en la petición...',
    });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req._id = _id;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    });
  }
};

module.exports = {
  validateJWT,
};

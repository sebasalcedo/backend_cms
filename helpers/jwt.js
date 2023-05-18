const jwt = require('jsonwebtoken');

const generarJWT = (_id, role) =>
  new Promise((resolve, reject) => {
    const payload = {
      _id,
      role
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '12h',
      },
      (err, token) => {
        if (err) {
          console.error('Error generating JWT:', err);
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });

module.exports = {
  generarJWT,
};
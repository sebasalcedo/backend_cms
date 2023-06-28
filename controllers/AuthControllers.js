const { response } = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../models/Users');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userDB = await Users.findOne({ email });

    

    const id = userDB._id.toString();

    if (userDB.isActivated !== 1) {
      return res.status(500).json({
        ok: false,
        msg: 'Usuario inactivo',
      });
    }


    if (!id) {
      return res.status(404).json({
        ok: false,
        msg: 'Email not found',
      });
    }

    const validPassword = bcrypt.compareSync(password, userDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Incorrect password',
      });
    }

    // generate TOken

    const token = await generarJWT(id, userDB.rol);

    res.json({
      ok: true,
      userDB,
      token,
    });
  } catch (error) {
    console.log('Se ha presentado un error en la funcion del login => ', error);

    res.status(500).json({
      ok: false,
      msg: 'se ha presentado un error',
    });
  }
};




const renewToken = async (req, res = response) => {
  const _id = req._id;
  console.log("id que llega en la req", _id);
  const token = await generarJWT(_id );
  const { id, name, last_name, email, rol, img } = await Users.findById({ _id });
  res.json({
    ok: true,

    id,
    name,
    last_name,
    email,
    rol,
    img,
    token
  });
};
module.exports = {
  login,
  renewToken,
};

const { response } = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../models/Users');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userDB = await Users.findOne({ email });
<<<<<<< HEAD

    

    const id = userDB._id.toString();

    if (userDB.isActivated !== 1) {
      return res.status(500).json({
        ok: false,
        msg: 'Usuario inactivo',
      });
    }


=======
    const id = userDB._id.toString();

>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
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
<<<<<<< HEAD
=======
  console.log("id que llega en la req", _id);
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
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
<<<<<<< HEAD



const updatedPassword = async (req, res = response) => {
  const idUser = req.body.id;
  console.log(idUser);
  const { lastPassword, newPassword } = req.body;

  try {
    const userDB = await Users.findById(idUser);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No record found with that id',
      });
    }

    const validPassword = bcrypt.compareSync(lastPassword, userDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Incorrect password',
      });
    }

    const salt = bcrypt.genSaltSync();
    userDB.password = bcrypt.hashSync(newPassword, salt);
    await userDB.save();

    return res.status(200).json({
      ok: true,
      msg: 'Password changed successfully',
    });
  } catch (error) {
    // Manejar errores
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Internal server error',
    });
  }
};

module.exports = {
  login,
  renewToken,
  updatedPassword
=======
module.exports = {
  login,
  renewToken,
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
};

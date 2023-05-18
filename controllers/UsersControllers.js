const { response } = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const { generarJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
 
  const [users, total] = await Promise.all([
    Users.find({}, 'name last_name phone email rol img'),

    Users.countDocuments(),
  ]);

  res.json({
    ok: true,
    users,
    total,
  });
};

const registerUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existEmail = await Users.findOne({ email });

    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'The mail is already registered',
      });
    }

    const user = new Users(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    
    
    const token = await generarJWT(user._id);

    res.json({
      ok: true,
      data: user,
      token,
    });
  } catch (error) {
    console.log('ERROR al crear el usuario:', error);

    res.status(500).json({
      ok: false,
      msg: 'Unexpected error... check logs',
    });
  }
};

const updateUser = async (req, res = response) => {

  try {
    const _id = req.params.id;
    const userDB = await Users.findById({ _id });

    if (!userDB) {
      console.log('No record found with that id function updateUser');

      return res.status(404).json({
        ok: false,
        msg: 'No record found with that id',
      });
    }


       // TODO: Validar token y comprobrar si es el usuario correcto

      //  const requestingUserId = req.user.id;
      //  if (requestingUserId !== userId) {
      //    return res.status(401).json({
      //      ok: false, 
      //      msg: 'Unauthorized - You are not allowed to update this user',
      //    });
      //  }

    const { password, email, ...campos } = req.body;

    if (userDB.email !== email) {
      const existEmail = await Users.findOne({ email } );

      if (existEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'There is already a user with that email',
        });
      }
    }

    campos.email = email;

    const userUpdate = await Users.findByIdAndUpdate(_id, campos);

    return res.status(200).json({
      ok: true,
      msg: 'updated user',
      user:userDB,
      userUpdate:userUpdate
    });
  } catch (err) {
    console.log('error en update user ', err);
    return res.status(500).json({
      ok: false,
      msg: 'error when updating',
    });
  }
};

const deleteUser = async (req, res = response) => {
  const _id = req.params.id;

  try {
    const userDB = await Users.findById(_id);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No record found with that id function deleteUser',
      });
    }

    const deleteUser = await Users.findByIdAndDelete(_id);

    return res.status(200).json({
      ok: true,
      msg: 'User Deleted',
      userDelete: deleteUser,
    });
  } catch (error) {
    console.log('Error en el eliminar el usuario', error);

    return res.status(500).json({
      ok: false,
      msg: 'error when deleting a user',
    });
  }
};

module.exports = {
    getUsers,
  registerUser,
  updateUser,
  deleteUser,
};

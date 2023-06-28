const { response } = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const { generarJWT } = require('../helpers/jwt');


const getUserById = async(req, res  = response ) => {

  const idUser = req.params.id;

  try {
      return Users.find({ _id: idUser },'name last_name isActivated phone email rol img')
      .exec()
      .then((data) => {
          return res.status(200).json({
          ok: true,
          data,
          });
      })
      .catch((error) => {
          console.error('No se encontrado registro alguno:', error);
      });
  } catch (error) {
      console.log(error);
  }


}

const getUsers = async (req, res) => {
 
  const [users, total] = await Promise.all([
    Users.find({}, 'name last_name phone email isActivated rol img'),

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

      return res.status(404).json({
        ok: false,
        msg: 'No record found with that id',
      });
    }


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
const ActivateAndInactivate = async (req, res = response) => {
  const _id = req.params.id;

  try {
    const userDB = await Users.findById(_id);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No record found with that id in ActivateAndInactivate function',
      });
    }

    // Cambiar el estado de activación
    userDB.isActivated = userDB.isActivated === 1 ? 0 : 1;
    await userDB.save();

    return res.json({
      ok: true,
      msg: 'Activation status updated successfully',
      user: userDB,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      msg: 'Internal server error',
    });
  }
};

module.exports = {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  getUserById,
  ActivateAndInactivate
};

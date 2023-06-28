const { response } = require('express');
const message = require('../utils/messages')
const Role = require('../models/Role');

const getRoles = async ( req, res = response) =>{

    const [roles, total] = await Promise.all([
        Role.find({}, 'role description created_at updated_at')
        ,Role.countDocuments(),
      ]);
    
      res.json({
        ok: true,
        roles,
        total,
      });
}


const getRolesById = async(req, res  = response ) => {

    const idRole = req.params.id;

    try {
        return Role.find({ _id: idRole })
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


const registerRole = async(req, res = response) => {

  const { role } = req.body;
  try {

    const ExistRole = await Role.findOne({role});

    if (ExistRole) {
        return res.status(400).json({
            ok: false,
            msg: message.errorMessages.ELEMENT_EXIST,
          });
    }

    const roleDB = new Role(req.body);
  
    await roleDB.save();

    res.json({
      ok: true,
      msg: message.successMessages.CREATED,
      data: roleDB,
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: message.errorMessages.INTERNAL_SERVER_ERROR,
      error:err
    });
  }

}


const updateRole = async (req, res = response) => {
  try {
    const _id = req.params.id;
    const roleDB = await Role.findById({ _id });

    if (!roleDB) {
      return res.status(404).json({
        ok: false,
        msg: message.errorMessages.NOT_FOUND,
      });
    }
    const { role, ...campos } = req.body;

    const existRole = await Role.findOne({ role });
    if (existRole) {
      return res.status(400).json({
        ok: false,
        msg: message.errorMessages.ELEMENT_EXIST,
      });
    }

    campos.role = role;
    const RoleUpdate = await Role.findByIdAndUpdate(_id, campos);

    return res.status(200).json({
      ok: true,
      msg: message.successMessages.UPDATED,
      RoleUpdate
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: message.errorMessages.INTERNAL_SERVER_ERROR,
    });
  }
};



const deleteRole = async (req, res = response) => {
  const _id = req.params.id;

  try {
    const roleDB = await Role.findById(_id);

    if (!roleDB) {
      return res.status(404).json({
        ok: false,
        msg: message.errorMessages.NOT_FOUND,
      });
    }

    const deleteRole = await Role.findByIdAndDelete(_id);
    return res.status(200).json({
      ok: true,
      msg: message.successMessages.DELETED,
      deleteRole,
    });
  } catch (error) {
    console.log('Error en el eliminar el usuario', error);

    return res.status(500).json({
      ok: false,
      msg: message.errorMessages.INTERNAL_SERVER_ERROR,
    });
  }
};


module.exports = {
  getRoles,
  getRolesById,
  registerRole,
  updateRole,
  deleteRole
}
const { response } = require('express');

const Groups = require('../models/Group');

const getGruopsById = async (req, res = response) => {
  const idLine = req.params.id;

  try {
    return Groups.find({ _id: idLine })
      .exec()
      .then((data) => {
        return res.status(200).json({
          ok: true,
          group: data,
        });
      })
      .catch((error) => {
        console.error('No se encontrado registro alguno:', error);
      });
  } catch (error) {
    console.log(error);
  }
};

const getGroups = async (req, res = response) => {
  const desde = Number(req.query.desde) || 0;

  const [groups, total] = await Promise.all([
    await Groups.find(
      {},
      'name indicative line description programs user created_at updated_at'
    )
      .skip(desde)
      .limit(5),
    Groups.countDocuments(),
  ]);
  res.json({
    ok: true,
    groups,
    total,
  });
};

const registerGroups = async (req, res = response) => {
  const { name } = req.body;

  try {
    const existName = await Groups.findOne({ name });
    if (existName) {
      return res.status(400).json({
        ok: false,
        msg: ' Ya existe un grupo con ese nombre',
      });
    }

    const group = new Groups(req.body);

    await group.save();

    res.json({
      ok: true,
      msg: 'Se ha registrado un nuevo grupo',
      data: group,
    });
  } catch (error) {
    console.log('ERROR al crear el grupo:', error);

    res.status(500).json({
      ok: false,
      msg: 'Unexpected error... check logs',
    });
  }
};

const updateGroup = async (req, res = response) => {
  try {
    const _id = req.params.id;
    const groupDB = await Groups.findById({ _id });

    if (!groupDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontro linea con ese Id',
      });
    }
    const { name, ...campos } = req.body;

    const existName = await Groups.findOne({ name });
    if (existName) {
      return res.status(400).json({
        ok: false,
        msg: ' Ya existe un grupo con ese nombre',
      });
    }

    campos.name = name;
    const groupsUpdate = await Groups.findByIdAndUpdate(_id, campos);

    return res.status(200).json({
      ok: true,
      msg: 'Se ha actualizado el grupo',
      groups: groupDB,
      groupsUpdate: groupsUpdate,
    });
  } catch (error) {
    console.log('error en update groups ', err);
    return res.status(500).json({
      ok: false,
      msg: 'Unexpected error... check logs',
    });
  }
};

const deleteGroups = async (req, res = response) => {
  const _id  = req.params.id;
  const grupo = req.params.grupo;
  console.log(req.params);

  try {
    const GroupsDB = await Groups.findById(_id);

    if (!GroupsDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontro groups con ese identificado',
      });
    }

  


    const existingGroup = await Groups.findById(grupo);
    console.log(existingGroup);
    if (existingGroup) {
      
      for (const program of GroupsDB.programs) {
      const { id, level, position } = program;
          existingGroup.programs.push({
            program: id,
            level: level,
            position: position,
          });
          await existingGroup.save();
      }

     
    }

    // const deleteGroup = await Groups.findByIdAndDelete(_id);

    return res.status(200).json({
      ok: true,
      msg: 'Se ha eliminado el grupo',
      // data: deleteGroup,
    });
  } catch (error) {
    console.log('Error en el eliminar el grupo', error);

    return res.status(500).json({
      ok: false,
      msg: 'Se ha presentado un error al eliminar el grupos',
    });
  }
};

const filterGroupsLines = async (req, res = response) => {
  const idLine = req.params.id;

  try {
    return Groups.find({ line: idLine })
      .exec()
      .then((data) => {
        return res.status(200).json({
          ok: true,
          group: data,
        });
      })
      .catch((error) => {
        console.error('No se encontrado registro alguno:', error);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getGroups,
  registerGroups,
  updateGroup,
  deleteGroups,
  filterGroupsLines,
  getGruopsById,
};

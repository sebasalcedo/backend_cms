const { response } = require('express');

const Groups = require('../models/Group');
<<<<<<< HEAD
const Lines = require('../models/Lines');
=======
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871

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
<<<<<<< HEAD
=======
  const desde = Number(req.query.desde) || 0;
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871

  const [groups, total] = await Promise.all([
    await Groups.find(
      {},
<<<<<<< HEAD
      'name indicative description programs user created_at updated_at'
    )
      .skip(desde),
     Groups.countDocuments(),
=======
      'name indicative line description programs user created_at updated_at'
    )
      .skip(desde)
      .limit(5),
    Groups.countDocuments(),
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
  ]);
  res.json({
    ok: true,
    groups,
    total,
  });
};

const registerGroups = async (req, res = response) => {
<<<<<<< HEAD
  const { idLines, name } = req.body;

  try {
    const existName = await Groups.findOne({ name });
 
    if (existName) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un grupo con ese nombre',
=======
  const { name } = req.body;

  try {
    const existName = await Groups.findOne({ name });
    if (existName) {
      return res.status(400).json({
        ok: false,
        msg: ' Ya existe un grupo con ese nombre',
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
      });
    }

    const group = new Groups(req.body);
<<<<<<< HEAD
    await group.save();
    const groupId = group._id;

    const line = await Lines.findById(idLines);
    line.groups.push(groupId);
    await line.save();
=======

    await group.save();
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871

    res.json({
      ok: true,
      msg: 'Se ha registrado un nuevo grupo',
      data: group,
    });
  } catch (error) {
    console.log('ERROR al crear el grupo:', error);

    res.status(500).json({
      ok: false,
<<<<<<< HEAD
      msg: 'Error inesperado... revisa los logs',
=======
      msg: 'Unexpected error... check logs',
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
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
<<<<<<< HEAD
=======
  console.log(req.params);
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871

  try {
    const GroupsDB = await Groups.findById(_id);

    if (!GroupsDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontro groups con ese identificado',
      });
    }

  


    const existingGroup = await Groups.findById(grupo);
<<<<<<< HEAD
=======
    console.log(existingGroup);
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
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
<<<<<<< HEAD
    // TODO: queda pendiente al eliminart actualizar los datos
    const deleteGroup = await Groups.findByIdAndDelete(_id);
=======

    // const deleteGroup = await Groups.findByIdAndDelete(_id);
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871

    return res.status(200).json({
      ok: true,
      msg: 'Se ha eliminado el grupo',
<<<<<<< HEAD
      data: deleteGroup,
=======
      // data: deleteGroup,
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
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
<<<<<<< HEAD
  const  idLines  = req.params.id;

  try {
    const line = await Lines.findById(idLines);
    if (!line) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontró la línea',
      });
    }

    const groupIds = line.groups;
    const groups = await Groups.find({ _id: { $in: groupIds } });
    res.json({
      ok: true,
      data: groups,
    });
  } catch (error) {
    console.log('ERROR al obtener los grupos:', error);

    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisa los logs',
    });
=======
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
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
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

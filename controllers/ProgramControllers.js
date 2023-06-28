const { response } = require('express');
const Programs = require('../models/programs');
const Groups = require('../models/Group');

const getProgramById = async (req, res = response) => {
  const idPrograms = req.params.id;

  try {
    const program = await Programs.find({ _id: idPrograms });
    const group = await Groups.find(
      {
        'programs.program': idPrograms,
      },
      'name programs'
    ).populate('programs');

    return res.status(200).json({
      ok: true,
      programs: program,
      groups: group,
    });
  } catch (error) {
    console.log('error el metodo getProgramById', error);
    return res.status(400).json({
      ok: true,
      msg: error,
    });
  }
};

const getListPrograms = async (req, res = response) => {
  const [programs, total] = await Promise.all([
    Programs.find(
      {},
      'program_name type coverage menu_option state program_type Subcategory Timezone_from chatbot start_date end_date'
    ),

    Programs.countDocuments(),
  ]);

  res.json({
    ok: true,
    programs,
    total,
  });
};

const registerProgram = async (req, res = response) => {
  try {
    const { program_name, groups } = req.body;

    const existingProgram = await Programs.findOne({ program_name });
    if (existingProgram) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un Programa con ese nombre',
      });
    }

    const newProgram = new Programs(req.body);
    await newProgram.save();

    for (const group of groups) {
      const { id, level, position } = group;

      const existingGroup = await Groups.findById(id);

      if (existingGroup) {
        existingGroup.programs.push({
          program: newProgram._id,
          level: level,
          position: position,
        });
        await existingGroup.save();
      }
    }

    return res.status(200).json({
      ok: true,
      msg: 'Programa creado y actualizado en los grupos existentes',
      program: newProgram,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al registrar el Programa',
    });
  }
};

const updateProgram = async (req, res = response) => {
  try {
    const _id = req.params.id;
    const { program_name, groups, ...campos } = req.body;

    const existingProgram = await Programs.findOne({ program_name });

    if (existingProgram && existingProgram._id.toString() !== _id) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un programa con ese nombre',
      });
    }

    campos.program_name = program_name;

    // Actualizar el programa
    const programUpdate = await Programs.findByIdAndUpdate(_id, campos);
        
    // Buscar los grupos que tienen el programa a actualizar
    const groupDB = await Groups.find(
      {
        'programs.program': _id,
      },
      'name programs'
    ).populate('programs');

    // Encontrar los grupos que se han agregado
    const addedPrograms = groups.filter(
      (group) => !groupDB.some((g) => g._id === group._id)
    );

    // Encontrar los grupos que se han eliminado
    const deletedPrograms = groupDB.filter(
      (group) => !groups.some((g) => g._id === group._id)
    );

    // Si se agregó un nuevo grupo
    if (addedPrograms.length > 0) {
      for (let index = 0; index < addedPrograms.length; index++) {
        const element = addedPrograms[index];

        const existingGroup = await Groups.findById(element.id);
        if (existingGroup) {
          existingGroup.programs.push({
            program: _id,
            level: element.level,
            position: element.position,
          });
          await existingGroup.save();
        }
      }
    }

    // Si se eliminó un grupo
    if (deletedPrograms.length > 0) {
      for (let index = 0; index < deletedPrograms.length; index++) {
        const group = deletedPrograms[index];

        // Encontrar la referencia del programa que se va a eliminar en este grupo
        const programRef = group.programs.find(
          (p) => p.program.toString() === _id
        );
        
        if (programRef) {
          // Remover la referencia del programa en el grupo
          group.programs.pull(programRef);
          await group.save();
        }
      }
    }

    




    return res.status(200).json({
      ok: true,
      msg: 'Se ha actualizado los campos correctamente',
      programUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: 'No se ha logrado actualizar el programa',
    });
  }
};

const deleteProgram = async (req, res = response) => {
  const _id = req.params.id;

  try {
    const ProgramsDB = await Programs.findById(_id);

    if (!ProgramsDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontro Programs con ese identificado',
      });
    }


    // TODO: AL ELIMINAR EL PROGRAMA SE MIGRAN TODO AL QUE SE ENVIA RECORDAR
    // * Se puede mostrar toda la información que se va a mirgrar al nuevo programa.
    
    const ProgramsGroup = await Programs.findByIdAndDelete(_id);

    return res.status(200).json({
      ok: true,
      msg: 'Se ha eliminado el Programs',
      data: ProgramsGroup,
    });
  } catch (error) {
    console.log('Error en el eliminar el Programs', error);

    return res.status(500).json({
      ok: false,
      msg: 'Se ha presentado un error al eliminar el Programs',
    });
  }
};

module.exports = {
  getProgramById,
  getListPrograms,
  registerProgram,
  deleteProgram,
  updateProgram,
};



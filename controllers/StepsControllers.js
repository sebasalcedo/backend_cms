const { response } = require('express');

const Steps = require('../models/Steps');
const Programs = require('../models/programs');
const Media = require('../models/medias');

const getStepsByProgram = async (req, res = response) => {
  try {
    const idProgram = req.params.id;

    const program = await Programs.findById(idProgram, 'Steps').populate('Steps');

    const steps = await Promise.all(program.Steps.map(async (step) => {
      const media = await Media.findById(step.media);
      return {
        _id: step._id,
        numberStep: parseInt(step.numberStep),
        interaction: step.interaction,
        question: step.question,

        description: step.description,
        media: media
      };
    }));


    steps.sort((a, b) => a.numberStep - b.numberStep);

    return res.status(200).json({
      ok: true,
      data: steps,
    });
  } catch (error) {
    console.log('Error in getStepsByProgram', error);
    return res.status(400).json({
      ok: false,
      msg: error.message,
    });
  }
};



const getListSteps = async (req, res = response) => {
  const [steps, total] = await Promise.all([
    await Steps.find({}, 'numberStep  Interaction question Description Media'),
    Steps.countDocuments(),
  ]);
  res.json({
    ok: true,
    steps,
    total,
  });
};

const registerSteps = async (req, res = response) => {
  try {
    const { idProgram, steps } = req.body;
 
    // Crear una promesa para registrar los pasos
    const registrarPasos = new Promise(async (resolve, reject) => {
      const successIds = [];
      const failureSteps = [];

      for (const element of steps) {
        const jsonData = {
          numberStep: element.numberStep,
          question:element.question,
          interaction: element.interaction,
          description: element.description,
          media: element.media,
        };

        try {
          const newStep = new Steps(jsonData);
          await newStep.save();
          successIds.push(newStep._id);

          // Buscar el programa correspondiente y agregar el ID del paso al arreglo
          const programa = await Programs.findById(idProgram);

          programa.Steps.push( newStep._id );
          await programa.save();
        } catch (error) {
          console.log(error);
          failureSteps.push(jsonData);
        }
      }

      if (failureSteps.length > 0) {
        reject({ successIds, failureSteps });
      } else {
        resolve({ successIds });
      }
    });

    // Ejecutar la promesa para registrar los pasos
    const { successIds, failureSteps } = await registrarPasos;

    // Devolver los resultados de la promesa
    return res.status(200).json({
      ok: true,
      successIds,
      failureSteps,
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: 'Se ha presentado un error. Intente más tarde',
    });
  }
};

const updateSteps = async (req, res = response) => {
  try {
    const _id = req.params.id;

    const stepDB = await Steps.findById({ _id });

    if (!stepDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontro dato con el id enviado',
      });
    }
    const { ...campos } = req.body;

    console.log(req.body);
    const stepsUpdate = await Steps.findByIdAndUpdate(_id, campos);

    return res.status(200).json({
      ok: true,
      msg: 'Operación realizada con exito',
    });
  } catch (error) {
    console.log('error en update lineas ', error);
    return res.status(500).json({
      ok: false,
      msg: 'error when updating',
    });
  }
};

const deleteStep = async ( req, res = response) =>{
    
    const _id = req.params.id;

    try {
    const stepsDB = await Steps.findById(_id);

    if (!stepsDB) {
        return res.status(404).json({
            ok: false,
            msg: 'No se encontro resultado para esta busqueda',
          });
    }

    const deleteStep = await Steps.findByIdAndDelete(_id);

    return res.status(200).json({
        ok: true,
        msg: 'Se ha realizado la operacion exitosamente',
     
      });
    } catch (error) {
        console.log('Error en el eliminar el step', error);

    return res.status(500).json({
      ok: false,
      msg: 'Se ha presentado un error en esta operacion',
    });
    }
}

module.exports = {
    getStepsByProgram,
    getListSteps,
    registerSteps,
    updateSteps,
    deleteStep
}

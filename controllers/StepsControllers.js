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

    const successIds = [];
    const failureSteps = [];

    for (const element of steps) {
      const jsonData = {
        numberStep: element.numberStep,
        question: element.question,
        interaction: element.interaction,
        description: element.description,
        media: element.media || null,
      };

      try {
        // Verificar si existe un paso con el mismo numberStep en el modelo de Steps
        const existingStep = await Programs.findOne({
          _id: idProgram,
          Steps: { $elemMatch: { numberStep: element.numberStep } },
        });

        if (existingStep) {
          

          // El número de paso ya existe, agregar mensaje de error
          const errorMessage = `El paso con numberStep ${element.numberStep} ya existe`;

          console.log('errorMessage', errorMessage);

          failureSteps.push({ ...jsonData, error: errorMessage });
        } else {
         
          const newStep = new Steps(jsonData);
          await newStep.save();
          successIds.push(newStep._id);

         
          const programa = await Programs.findById(idProgram);
          programa.Steps.push(newStep._id);
          await programa.save();
        }
      } catch (error) {
        console.log('error', error);

        // Se produjo un error al guardar el paso
        return res.status(500).json({
          ok: false,
          error,
          failureSteps,
        });
      }
    }

    // Devolver los resultados de la validación exitosa
    return res.status(200).json({
      ok: true,
      successIds,
      failureSteps,
    });
  } catch (error) {
    // Error general
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: 'Se ha presentado un error. Intente más tarde',
    });
  }
};

const updateSteps = async (req, res = response) => {
  try {
    const { ...campos } = req.body;
    const _id = req.params.id;

    const stepDB = await Steps.findById({ _id });
    const existingStep = await Steps.findOne({ numberStep: campos.numberStep });


    if (!stepDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontro dato con el id enviado',
      });
    }

    if (!existingStep) {
      return res.status(404).json({
        ok: false,
        msg: 'No se puede registar el step ya existe un paso correspondiente',
      });
    }

    


    const stepsUpdate = await Steps.findByIdAndUpdate(_id, campos);

    return res.status(200).json({
      ok: true,
      msg: 'Operación realizada con exito',
      stepsUpdate
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
        deleteStep
     
      });
    } catch (error) {
        console.log('Error en el eliminar el step', error);

    return res.status(500).json({
      ok: false,
      msg: 'Se ha presentado un error en esta operacion',
    });
    }
}


const updatePositionSteps = async (req, res = response) => {
  const campos = req.body;

  try {
    const updateOperations = campos.map((element) => ({
      updateOne: {
        filter: { _id: element.id },
        update: { $set: { numberStep: element.numberStep } }
      }
    }));

    await Steps.bulkWrite(updateOperations);

    return res.status(200).json({
      ok: true,
      msg: 'Steps positions updated successfully',
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "An error occurred while updating step positions",
    });
  }
}



module.exports = {
    getStepsByProgram,
    getListSteps,
    registerSteps,
    updateSteps,
    deleteStep,
    updatePositionSteps
}

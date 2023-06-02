const { response } = require('express');

const Lines = require('../models/Lines');




const getLineById = async (req, res = response) => {
  const idLine = req.params.id;

  try {
    return Lines.find({ _id: idLine })
      .exec()
      .then((data) => {
        return res.status(200).json({
          ok: true,
          line: data,
        });
      })
      .catch((error) => {
        console.error('No se encontrado registro alguno:', error);
      });
  } catch (error) {
    console.log(error);
  }
  
};

const getLines = async (req, res = response) => {
  

  const [lines, total] = await Promise.all([
    Lines.find({}, 'name indicative description created_at updated_at')
    .sort({ created_at: 1 }),,
    Lines.countDocuments(),
  ]);

  res.json({
    ok: true,
    lines,
    total,
  });
};

const registerLines = async (req, res = response) => {
  const { name, indicative } = req.body;

  try {
    const existName = await Lines.findOne({ name });
    const existIndicative = await Lines.findOne({ indicative });

    if (existName) {
      return res.status(400).json({
        ok: false,
        msg: ' Ya existe una linea con ese nombre',
      });
    } else if (existIndicative) {
      return res.status(400).json({
        ok: false,
        msg: ' Ya existe una linea con ese indicativo',
      });
    }

    const lines = new Lines(req.body);

    await lines.save();

    res.json({
      ok: true,
      msg: 'Se ha registrado una nueva linea',
      data: lines,
    });
  } catch (error) {
    console.log('ERROR al crear la linea:', error);

    res.status(500).json({
      ok: false,
      msg: 'Unexpected error... check logs',
    });
  }
};

const updateLines = async (req, res = response) => {

  try {
    const _id = req.params.id;
    const linesDB = await Lines.findById({ _id });

    if (!linesDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontro linea con ese Id',
      });
    }

    const { name, indicative, ...campos } = req.body;

    const existName = await Lines.findOne({ name });
    const existIndicative = await Lines.findOne({ indicative });
   

    if (existName  && existName._id.toString() !== _id) {
      return res.status(400).json({
        ok: false,
        msg: ' Ya existe una linea con ese nombre',
      });

      
    } else if (existIndicative && existIndicative._id.toString() !== _id) {
      return res.status(400).json({
        ok: false,
        msg: ' Ya existe una linea con ese indicativo',
      });
    }
    campos.name = name;
    campos.indicative = indicative;

    const linesUpdate = await Lines.findByIdAndUpdate(_id, campos);

    return res.status(200).json({
      ok: true,
      msg: 'Se ha actualizado la linea',
      linea: linesDB,
      lineaUpdate: linesUpdate,
    });
  } catch (err) {
    console.log('error en update lineas ', err);
    return res.status(500).json({
      ok: false,
      msg: 'error when updating',
    });
  }
};

const deleteLines = async (req, res = response) => {
  const _id = req.params.id;

  try {
    const linesDB = await Lines.findById(_id);

    if (!linesDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontro linea con ese identificado',
      });
    }

    const deleteLines = await Lines.findByIdAndDelete(_id);

    return res.status(200).json({
      ok: true,
      msg: 'Se ha eliminado a linea',
      data: deleteLines,
    });
  } catch (error) {
    console.log('Error en el eliminar la linea', error);

    return res.status(500).json({
      ok: false,
      msg: 'Error para eliminar la linea',
    });
  }
};

module.exports = {
  getLines,
  registerLines,
  updateLines,
  deleteLines,
  getLineById
};

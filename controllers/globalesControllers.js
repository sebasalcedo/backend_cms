const { response } = require('express');
const Media = require('../models/medias');



// Función para obtener la fecha actual y formatearla manualmente como "DD/MMM/YYYY"
function obtenerFechaActual() {
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = obtenerNombreMes(fecha.getMonth());
  const año = fecha.getFullYear();
  
  return `${dia}-${mes}-${año}`;
}

// Función para obtener el nombre del mes en formato de tres letras (por ejemplo, 'Jan' para enero)
function obtenerNombreMes(numeroMes) {
  const meses = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];
  return meses[numeroMes];
}

const uploadMedia = function (req, res = response) {
  const fechaActual = obtenerFechaActual();
  
  tipo = req.file.originalname.slice(-3);
  const nombreArchivo = `archivo-${fechaActual}-${req.body.name+'.'+tipo}`;

  Media.findOne({ name: nombreArchivo })
    .then(existingMedia => {
      if (existingMedia) {
        return res.status(400).json({ error: 'Ya existe un archivo con el mismo nombre' });
      }
      const media = new Media({
        name: nombreArchivo,
        type: tipo
      });

      media.save()
        .then(savedMedia => {
          console.log('Archivo guardado en la base de datos:', savedMedia);
          res.json(savedMedia); 
        })
        .catch(error => {
          console.log('Error al guardar el archivo en la base de datos:', error);
          res.status(500).json({ error: 'Error al guardar el archivo' });
        });
    })
    .catch(error => {
      console.log('Error al verificar el archivo en la base de datos:', error);
      res.status(500).json({ error: 'Error al verificar el archivo' });
    });
};


const guardarLink = function (req, res = response) {

  const { name, fileUrl } = req.body;
  const fechaActual = obtenerFechaActual();
  
  const nombreArchivo = `archivo-${fechaActual}-${name}`;

  

  Media.findOne({ name: nombreArchivo })
    .then(existingMedia => {
      if (existingMedia) {
        return res.status(400).json({ error: 'Ya existe un archivo con el mismo nombre' });
      }
      const media = new Media({
        name: nombreArchivo,
        type: 'video',
        fileUrl: fileUrl
      });

      media.save()
        .then(savedMedia => {
          console.log('Archivo guardado en la base de datos:', savedMedia);
          res.json(savedMedia); 
        })
        .catch(error => {
          console.log('Error al guardar el archivo en la base de datos:', error);
          res.status(500).json({ error: 'Error al guardar el archivo' });
        });
    })
    .catch(error => {
      console.log('Error al verificar el archivo en la base de datos:', error);
      res.status(500).json({ error: 'Error al verificar el archivo' });
    });


}

const getMediaById = async (req,res = response) =>{
  const idMedia = req.params.id;

  
  try {
    return Media.find({ _id: idMedia })
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


const getUploads = async function (req, res = response) {
  const [data, total] = await Promise.all([
    Media.find({}, 'name type fileUrl created_at updated_at').sort({ created_at: 1 }),
    Media.countDocuments(),
  ]);

  res.json({
    ok: true,
    data,
    total,
  });
};

module.exports = { uploadMedia, getUploads, guardarLink,getMediaById };

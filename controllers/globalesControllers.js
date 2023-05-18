const { response } = require('express');

const Media = require('../models/medias');
const path = require('path');


// Función para guardar un nuevo medio en la base de datos
const createMedia = async (req, res = response) => {
  try {
    const { type } = req.body;
    const file = req.files.file;

    // Analizar el tipo de archivo
    let fileType;
    const mimeType = file.mimetype;

    if (mimeType.startsWith('image')) {
      fileType = 'image';
    } else if (mimeType.startsWith('video')) {
      fileType = 'video';
    } else if (mimeType === 'application/pdf') {
      fileType = 'pdf';
    } else {
      res.status(400).json({ error: 'Invalid file type' });
      return;
    }

    // Mueve el archivo a una ubicación deseada
    const fileName = file.name;
    const uploadPath = path.join(__dirname, '..', 'uploads', fileName);
    await file.mv(uploadPath);

    // Generar la URL del recurso
    const baseUrl = 'http://localhost:3000'; // Reemplaza con la URL base de tu aplicación
    const fileUrl = `/uploads/${fileName}`;

    const media = new Media({
      type: fileType,
      fileUrl: fileUrl
    });

    await media.save();

    const mediaWithUrl = {
      ...media._doc,
       fileUrl
    };

    res.status(201).json({ message: 'File saved successfully', media: mediaWithUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const getFile = async (req, res) => {
  try {
    const mediaId = req.params.id;

    // Buscar el archivo en la base de datos
    const media = await Media.findById(mediaId);
    if (!media) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    // Obtener la ruta del archivo
    const filePath = path.join(__dirname, '..', media.fileUrl);

    // Mostrar el archivo en el navegador
    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};



const getListFile = async ( req, res = reponse) => {

  const [media, total] = await Promise.all([
    Media.find({}, 'type fileUrl  created_at updated_at'),
    Media.countDocuments(),
  ]);

  res.json({
    ok: true,
    media,
    total,
  });
}




module.exports = { createMedia, getFile, getListFile };
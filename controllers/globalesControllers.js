const { response } = require('express');
const path = require('path');
const fs = require('fs');
const Media = require('../models/medias');
const getDestinationFolder = require('../helpers/getDestinationFolder');

const uploadMedia = function (req, res = response) {
  
  const { originalname, mimetype, path: filePath } = req.file;
  const fileExtension = path.extname(originalname);
  const fileType = mimetype.split('/')[0];
  const destinationFolder = getDestinationFolder(fileType);
  const newFilePath = path.join(
    destinationFolder,
    `${Date.now()}${fileExtension}`
  );

  fs.rename(filePath, newFilePath, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        ok: false,
        msg: 'Se ha presentado un error al guardar el file',
      });
    }

    const newMedia = new Media({
      name: originalname,
      type: fileType,
      fileUrl: newFilePath,
    });

    newMedia
      .save()
      .then(() => {
        return res.status(200).json({
          ok: true,
          msg: 'Se ha realizado la carga con Exito',
          newMedia
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          ok: false,
          msg: 'Error al guardar el archivo en la base de datos.',
        });
      });
  });
};

const getUploads = async function (req, res = response, next) {
  try {
    const uploads = await Media.find();
    const images = [];
    const videos = [];
    const otros = [];

    uploads.forEach((upload) => {

      switch (upload.type) {
        case 'image':
          images.push(upload);
          break;
        case 'videos':
          videos.push(upload);
          break;
       
        case 'application':
          otros.push(upload);
          break;
      }
    });
    return res.status(200).json({
      ok: true,
      images, videos, otros
    });
   
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send('Error al obtener los uploads de la base de datos.');
  }
};
module.exports = { uploadMedia, getUploads };

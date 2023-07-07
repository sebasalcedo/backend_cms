const { response } = require('express');

<<<<<<< HEAD
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage')

const Users = require('../models/Users');

const Media = require('../models/medias');
const storage = getStorage();

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
}

const uploadMedia = async (req, res = response) => {
  const dateTime = giveCurrentDateTime();
  try {

   if (req.body.idPrefil ) {

    const _id = req.body.idPrefil;
    const userDB = await Users.findById({ _id });

    if (!userDB) {

      return res.status(404).json({
        ok: false,
        msg: 'No record found with that id',
      });
    }

    const storageRef = ref(storage, `perfil/${req.file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
  };

  // Upload the file in the bucket storage
  const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
  //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

  // Grab the public url
  const downloadURL = await getDownloadURL(snapshot.ref);


  userDB.img = downloadURL;

  await userDB.save()
    .then(savedMedia => {
      console.log('Archivo guardado en la base de datos:', savedMedia);
      res.json(savedMedia); 
    })
    .catch(error => {
      console.log('Error al guardar el archivo en la base de datos:', error);
      res.status(500).json({ error: 'Error al guardar el archivo' });
    });

   }else{
   

    const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
        contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    const media = new Media({
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL: downloadURL
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
   }
   

} catch (error) {
    return res.status(400).send(error.message)
}

=======
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
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
};



<<<<<<< HEAD


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
    Media.find({}, 'name type fileUrl downloadURL created_at updated_at').sort({ created_at: 1 }),
=======
const getListFile = async ( req, res = reponse) => {

  const [media, total] = await Promise.all([
    Media.find({}, 'type fileUrl  created_at updated_at'),
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
    Media.countDocuments(),
  ]);

  res.json({
    ok: true,
<<<<<<< HEAD
    data,
    total,
  });
};

module.exports = { uploadMedia, getUploads, guardarLink,getMediaById };
=======
    media,
    total,
  });
}




module.exports = { createMedia, getFile, getListFile };
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871

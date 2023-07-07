const { response } = require('express');

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
    Media.find({}, 'name type fileUrl downloadURL created_at updated_at').sort({ created_at: 1 }),
    Media.countDocuments(),
  ]);

  res.json({
    ok: true,
    data,
    total,
  });
};

module.exports = { uploadMedia, getUploads, guardarLink,getMediaById };

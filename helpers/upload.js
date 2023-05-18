const admin = require('firebase-admin');


// Inicializar la aplicación de Firebase
const bucket = admin.storage().bucket();


const uploadImageToStorage = async (file) => {
  const storagePath = `images/${file.name}`;

  await bucket.upload(file.tempFilePath, {
    destination: storagePath,
    metadata: {
      contentType: file.mimetype
    }
  });

  const imageUrl = `https://storage.googleapis.com/${bucket.name}/${storagePath}`;

  return imageUrl;
};


module.exports =uploadImageToStorage

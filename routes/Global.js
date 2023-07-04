const { Router } = require('express');
const multer = require('multer');


const { getUploads, uploadMedia, guardarLink, getMediaById } = require('../controllers/globalesControllers');

const router = Router();



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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads'); 
    },
    filename: function (req, file, cb) {
    let tipo= '';

    const fechaActual = obtenerFechaActual();
    tipo = file.originalname.slice(-3);
        cb(null, `archivo-${fechaActual}-${req.body.name+'.'+tipo}`); 
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), uploadMedia);


router.post('/upload/video', guardarLink)



// Ruta para obtener los medios subidos
router.get('/uploads', getUploads);
router.get('/uploads/:id', getMediaById);


module.exports = router;

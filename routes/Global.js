/*
 * path: '/api/v1.0/globales/'
 */


const { Router } = require('express');
const { check } = require('express-validator');


const multer = require('multer');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateToken');
const { uploadMedia, getUploads} = require('../controllers/globalesControllers');
const  getDestinationFolder  = require('../helpers/getDestinationFolder')
const router = Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const fileType = file.mimetype.split('/')[0];
      const destinationFolder = getDestinationFolder(fileType);
      cb(null, destinationFolder);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });


// Ruta para crear un nuevo medio
router.post('/upload', upload.single('file'), uploadMedia);
router.get('/upload', getUploads);




module.exports = router;

<<<<<<< HEAD
const { Router } = require('express');
const multer = require('multer');


const { getUploads, uploadMedia, guardarLink, getMediaById } = require('../controllers/globalesControllers');
=======
/*
 * path: '/api/v1.0/globales/'
 */


const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateToken');

const { createMedia, getFile, getListFile} = require('../controllers/globalesControllers');
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871


const router = Router();

<<<<<<< HEAD

const upload = multer({ storage: multer.memoryStorage() });


router.post('/upload', upload.single('file'), uploadMedia);


router.post('/upload/video', guardarLink)



// Ruta para obtener los medios subidos
router.get('/uploads', getUploads);
router.get('/uploads/:id', getMediaById);


=======
// Ruta para crear un nuevo medio
router.post('/media', [validateJWT], createMedia);
router.get('/media/:id', [validateJWT], getFile);
router.get('/media', [validateJWT], getListFile);
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871


module.exports = router;

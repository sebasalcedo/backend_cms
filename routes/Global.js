const { Router } = require('express');
const multer = require('multer');


const { getUploads, uploadMedia, guardarLink, getMediaById } = require('../controllers/globalesControllers');


const router = Router();


const upload = multer({ storage: multer.memoryStorage() });


router.post('/upload', upload.single('file'), uploadMedia);


router.post('/upload/video', guardarLink)



// Ruta para obtener los medios subidos
router.get('/uploads', getUploads);
router.get('/uploads/:id', getMediaById);




module.exports = router;

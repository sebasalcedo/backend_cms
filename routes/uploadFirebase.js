const { Router } = require('express');

const { uploadImage } = require('../controllers/globalesControllers')

const router = Router();

router.post('/image', uploadImage);


module.exports = router;

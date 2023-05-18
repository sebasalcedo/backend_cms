/*
 * path: '/api/v1.0/globales/'
 */


const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateToken');

const { createMedia, getFile, getListFile} = require('../controllers/globalesControllers');


const router = Router();

// Ruta para crear un nuevo medio
router.post('/media', [validateJWT], createMedia);
router.get('/media/:id', [validateJWT], getFile);
router.get('/media', [validateJWT], getListFile);


module.exports = router;

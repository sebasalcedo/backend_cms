/*  
    * path: '/api/v1.0/auth/'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { login, renewToken } = require('../controllers/AuthControllers');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.get('/renewToken', renewToken);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields,
  ],
  login
);


module.exports = router;

/*  
    * path: '/api/v1.0/auth/'
*/

const { Router } = require('express');
const { check } = require('express-validator');

<<<<<<< HEAD
const { login, renewToken, updatedPassword } = require('../controllers/AuthControllers');
=======
const { login, renewToken } = require('../controllers/AuthControllers');
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
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


<<<<<<< HEAD
router.post( '/changePassword', updatedPassword);

=======
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
module.exports = router;

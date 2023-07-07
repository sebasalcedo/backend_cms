/*  
   * path: '/api/v1.0/user/'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateToken');
<<<<<<< HEAD
const multer = require('multer');
=======
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871

const {
  registerUser,
  updateUser,
  deleteUser,
  getUsers,
<<<<<<< HEAD
  getUserById,
  ActivateAndInactivate,
  uploadFilePerfil
} = require('../controllers/UsersControllers');

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/uploadPerfil',  upload.single('file'), uploadFilePerfil);


router.get('/', [validateJWT], getUsers);
router.get('/estateUser/:id', [validateJWT], ActivateAndInactivate);

router.get('/:id', [validateJWT], getUserById);

=======
} = require('../controllers/UsersControllers');

const router = Router();

router.get('/', [validateJWT], getUsers);
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871

router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('last_name', 'last name is required').not().isEmpty(),
    check('phone', 'phone is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required and min 8 character').isLength({
      min: 8,
    }),
    validateFields,
    
  ],
  registerUser
);

router.put(
  '/:id',
  [
    check('name', 'name is required').not().isEmpty(),
    check('last_name', 'last name is required').not().isEmpty(),
    check('phone', 'phone is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    validateJWT
  ],
  updateUser,
);

<<<<<<< HEAD



=======
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
router.delete('/:id', [validateJWT], deleteUser);


module.exports = router;

/*  
   * path: '/api/v1.0/user/'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateToken');
const multer = require('multer');

const {
  registerUser,
  updateUser,
  deleteUser,
  getUsers,
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




router.delete('/:id', [validateJWT], deleteUser);


module.exports = router;

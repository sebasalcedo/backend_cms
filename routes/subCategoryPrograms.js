/*
 * path: '/api/v1.0/configurations/subCategory'
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateToken');

const {
  getSubCategory,
<<<<<<< HEAD
  registerSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoriaById
} = require('../controllers/subCategoryControllers');

const router = Router();
router.get('/:id', [validateJWT], getSubCategoriaById);
=======
  deleteLines,
  registerSubCategory,
  updateLines,
} = require('../controllers/subCategoryControllers');

const router = Router();
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871

router.get('/', [validateJWT], getSubCategory);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    validateFields,
  ],
  registerSubCategory
);

router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    validateFields,
  ],
<<<<<<< HEAD
  updateSubCategory
);

router.delete('/:id', [validateJWT], deleteSubCategory);
=======
  updateLines
);

router.delete('/:id', [validateJWT], deleteLines);
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871

module.exports = router;

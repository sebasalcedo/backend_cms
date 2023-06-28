/*
 * path: '/api/v1.0/configurations/subCategory'
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateToken');

const {
  getSubCategory,
  registerSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoriaById
} = require('../controllers/subCategoryControllers');

const router = Router();
router.get('/:id', [validateJWT], getSubCategoriaById);

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
  updateSubCategory
);

router.delete('/:id', [validateJWT], deleteSubCategory);

module.exports = router;

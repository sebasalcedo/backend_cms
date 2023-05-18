/*
 * path: '/api/v1.0/lines/'
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateToken');

const {
  registerLines,
  getLines,
  deleteLines,
  updateLines,
  getLineById
} = require('../controllers/LinesControllers');

const router = Router();
router.get('/:id', [validateJWT], getLineById);

router.get('/', [validateJWT], getLines);
router.post(
  '/',
  [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    check('indicative', 'indicative is required').not().isEmpty(),
    check('user', 'user is required').not().isEmpty(),
    validateFields,
  ],
  registerLines
);

router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    check('indicative', 'indicative is required').not().isEmpty(),
    check('user', 'user is required').not().isEmpty(),
    validateFields,
  ],
  updateLines
);


router.delete('/:id',[validateJWT], deleteLines)


module.exports = router;

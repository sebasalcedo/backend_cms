/*
 * path: '/api/v1.0/programs/'
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateToken');

const {
  getProgramById,
  getListPrograms,
  registerProgram,
  deleteProgram,
  updateProgram,
} = require('../controllers/ProgramControllers');

const router = Router();

router.get('/:id', [validateJWT], getProgramById);
router.get('/', [validateJWT], getListPrograms);

router.post(
  '/',
  [
    validateJWT,

    check('program_name', 'El nombre del programa es obligatorio')
      .not()
      .isEmpty(),
    check('type', 'el tipo de programa es obligatorio').not().isEmpty(),
    check('coverage', 'La cobertura es obligatoria').not().isEmpty(),
    check('menu_option', 'opciones del menu son obligatorias').not().isEmpty(),
    check('program_type', 'El tipo de programa es obligatorio').not().isEmpty(),
    check('Subcategory', 'las subcategorias son obligatorias').not().isEmpty(),
    check('Timezone_from', 'La zona horaria es obligatoria').not().isEmpty(),
    check('chatbot', 'El tipo de chatbot es obligatorio').not().isEmpty(),
    check('start_date', 'Fecha inicial es obligatoria').not().isEmpty(),
    check('end_date', 'Fecha inicial es obligatoria').not().isEmpty(),

    validateFields,
  ],
  registerProgram
);

router.put(
  '/:id',
  [
    validateJWT,
    check('program_name', 'El nombre del programa es obligatorio').not().isEmpty(),
    check('type', 'el tipo de programa es obligatorio').not().isEmpty(),
    check('coverage', 'La cobertura es obligatoria').not().isEmpty(),
    check('menu_option', 'opciones del menu son obligatorias').not().isEmpty(),
    check('program_type', 'El tipo de programa es obligatorio').not().isEmpty(),
    check('Subcategory', 'las subcategorias son obligatorias').not().isEmpty(),
    check('Timezone_from', 'La zona horaria es obligatoria').not().isEmpty(),
    check('chatbot', 'El tipo de chatbot es obligatorio').not().isEmpty(),
    check('start_date', 'Fecha inicial es obligatoria').not().isEmpty(),
    check('end_date', 'Fecha inicial es obligatoria').not().isEmpty(),
    validateFields,
  ],
  updateProgram
);
router.delete('/:id', [validateJWT], deleteProgram);

module.exports = router;

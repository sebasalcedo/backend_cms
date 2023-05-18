/*
 * path: '/api/v1.0/steps/'
 */


const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateToken');


const {getStepsByProgram, getListSteps, registerSteps, updateSteps, deleteStep} = require('../controllers/StepsControllers')


const router = Router();

router.get('/listStepByProgram/:id', [ validateJWT ], getStepsByProgram);

router.get('/', [ validateJWT], getListSteps);
router.post('/', [ 
    validateJWT,
    check('idProgram', 'interaction is required').not().isEmpty(),
    check('steps', 'numberStep is required').isArray(),
    
    validateFields
    
    ], registerSteps);

router.put('/:id', [ 
        validateJWT,
        check('numberStep', 'numberStep is required').not().isEmpty(),
        check('interaction', 'interaction is required').not().isEmpty(),
        check('description', 'description is required').not().isEmpty(),
        check('media', 'media is required').not().isEmpty(),
        validateFields
        
        ], updateSteps);
    

router.delete('/:id',[validateJWT], deleteStep)


module.exports = router;

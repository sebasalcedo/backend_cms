/*
 * path: '/api/v1.0/steps/'
 */


const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateToken');


<<<<<<< HEAD
const {getStepsByProgram, getListSteps, registerSteps, updateSteps, deleteStep, updatePositionSteps} = require('../controllers/StepsControllers')
=======
const {getStepsByProgram, getListSteps, registerSteps, updateSteps, deleteStep} = require('../controllers/StepsControllers')
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871


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
<<<<<<< HEAD
        
=======
        check('media', 'media is required').not().isEmpty(),
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
        validateFields
        
        ], updateSteps);
    

<<<<<<< HEAD
router.delete('/:id',[validateJWT], deleteStep);



router.post('/updatePosition',[validateJWT], updatePositionSteps)

=======
router.delete('/:id',[validateJWT], deleteStep)


>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
module.exports = router;

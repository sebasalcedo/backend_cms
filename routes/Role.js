/*
 * path: '/api/v1.0/Role/'
 */


const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateToken');


const { getRoles, deleteRole, getRolesById, registerRole, updateRole } = require('../controllers/RoleControllers');



const router = Router();

router.get('/',       [validateJWT], getRoles);
router.get('/:id',    [validateJWT], getRolesById);
router.post( '/',     [validateJWT,],registerRole);
router.put('/:id',    [validateJWT,],updateRole);
router.delete('/:id', [validateJWT], deleteRole);

module.exports = router;
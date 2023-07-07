/*
 * path: '/api/v1.0/groups/'
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateToken');

const {
  deleteGroups,
  getGroups,
  registerGroups,
  updateGroup,
  filterGroupsLines,
  getGruopsById,
  

} = require('../controllers/GroupsControllers');

const router = Router();

router.get('/:id', [validateJWT], getGruopsById);

router.get('/', [validateJWT], getGroups);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
<<<<<<< HEAD
    check('idLines', 'line is required').not().isEmpty(),
=======
    check('line', 'line is required').not().isEmpty(),
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
    check('user', 'user is required').not().isEmpty(),
    validateFields,
  ],
  registerGroups
);

router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
<<<<<<< HEAD
    check('idLines', 'line is required').not().isEmpty(),
=======
    check('line', 'line is required').not().isEmpty(),
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
    check('user', 'user is required').not().isEmpty(),
    validateFields,
  ],
  updateGroup
);


router.delete('/:id/:grupo', [validateJWT], deleteGroups);


router.get('/filterGroups/:id',[validateJWT], filterGroupsLines)

module.exports = router;

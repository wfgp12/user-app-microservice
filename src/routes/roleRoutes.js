const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/roleController');

// Rutas para operaciones CRUD de roles
router.get('/', RoleController.getAllRoles);
router.post('/', RoleController.createRole);
router.get('/:roleId', RoleController.getRoleById);
router.put('/:roleId', RoleController.updateRole);
router.delete('/:roleId', RoleController.deleteRole);

module.exports = router;

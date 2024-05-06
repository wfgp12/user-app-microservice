const express = require('express');
const roleRouter = express.Router();
const RoleController = require('../controllers/roleController');

// Rutas para operaciones CRUD de roles
roleRouter.get('/', RoleController.getAllRoles);
roleRouter.post('/', RoleController.createRole);
roleRouter.get('/:roleId', RoleController.getRoleById);
roleRouter.put('/:roleId', RoleController.updateRole);
roleRouter.delete('/:roleId', RoleController.deleteRole);

module.exports = roleRouter;

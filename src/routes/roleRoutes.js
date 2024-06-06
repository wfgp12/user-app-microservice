const express = require('express');
const roleRouter = express.Router();
const RoleController = require('../controllers/roleController');
const roleValidator = require('../middlewares/validators/role-validator');
const handleValidationResult = require('../middlewares/handleValidationErrors');
const { validateToken } = require('../middlewares/validators/auth-validator');
const { validatePermission } = require('../middlewares/validators/permission-validator');

// Rutas para operaciones CRUD de roles
roleRouter.post('/', [
    roleValidator.validateCreateRole,
    handleValidationResult
], RoleController.createRole);

roleRouter.put('/:roleId', [
    roleValidator.validateEditRole,
    handleValidationResult
], RoleController.updateRole);

roleRouter.get('/', [
], RoleController.getAllRoles);

roleRouter.get('/:roleId', [
    validateToken,
    validatePermission("getRole"),
    handleValidationResult
],RoleController.getRoleById);

roleRouter.delete('/:roleId',[
    validateToken,
    validatePermission("deleteRole"),
    handleValidationResult
], RoleController.deleteRole);

module.exports = roleRouter;

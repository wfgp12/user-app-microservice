const express = require('express');

const { 
    validateCreatePermission, 
    validateUpdatePermission, 
    validateGetPermission, 
    validateGetAllPermission, 
    validateDeletePermission 
} = require('../middlewares/validators/permission-validator');
const handleValidationResult = require('../middlewares/handleValidationErrors');
const PermissionController = require('../controllers/permissionController');

const permissionRouter = express.Router();

permissionRouter.get('/', [
    validateGetAllPermission,
    handleValidationResult
], PermissionController.getAllPermissions);

permissionRouter.post('/', [
    validateCreatePermission,
    handleValidationResult
], PermissionController.createPermission);

permissionRouter.get('/:permissionId', [
    validateGetPermission,
    handleValidationResult
], PermissionController.getPermissionById);

permissionRouter.put('/:permissionId', [
    validateUpdatePermission,
    handleValidationResult
], PermissionController.updatePermission);

permissionRouter.delete('/:permissionId', [
    validateDeletePermission,
    handleValidationResult
],PermissionController.deletePermission);

module.exports = permissionRouter;

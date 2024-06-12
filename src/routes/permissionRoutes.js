const express = require('express');

const {
    validateCreatePermission,
    validateUpdatePermission,
    validateGetPermission,
    validateGetAllPermission,
    validateDeletePermission,
    validatePermissionValidator
} = require('../middlewares/validators/permission-validator');
const handleValidationResult = require('../middlewares/handleValidationErrors');
const PermissionController = require('../controllers/permissionController');
const { successResponse } = require('../utils/response-utils');

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
], PermissionController.deletePermission);

permissionRouter.post('/validatePermission', [
    validatePermissionValidator,
    handleValidationResult
], async (req, res) => {
    try {
        res.json(successResponse(req.body.user));
    } catch (error) {
        res.status(500).json(errorResponse(error.message, 500));
    }
});

module.exports = permissionRouter;

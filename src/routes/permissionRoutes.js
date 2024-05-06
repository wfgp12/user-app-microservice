const express = require('express');
const permissionRouter = express.Router();
const PermissionController = require('../controllers/permissionController');

// Rutas para operaciones CRUD de permisos
permissionRouter.get('/', PermissionController.getAllPermissions);
permissionRouter.post('/', PermissionController.createPermission);
permissionRouter.get('/:permissionId', PermissionController.getPermissionById);
permissionRouter.put('/:permissionId', PermissionController.updatePermission);
permissionRouter.delete('/:permissionId', PermissionController.deletePermission);

module.exports = permissionRouter;

const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/permissionController');

// Rutas para operaciones CRUD de permisos
router.get('/', PermissionController.getAllPermissions);
router.post('/', PermissionController.createPermission);
router.get('/:permissionId', PermissionController.getPermissionById);
router.put('/:permissionId', PermissionController.updatePermission);
router.delete('/:permissionId', PermissionController.deletePermission);

module.exports = router;

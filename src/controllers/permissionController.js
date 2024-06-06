const { ObjectId } = require('mongodb');
const {
    createPermissionService,
    findAllPermissionService,
    findPermission,
    updatePermissionService,
    deletePermissionService
} = require('../services/permissionServices');
const { findRole } = require('../services/roleServices');
const { errorResponse, successResponse } = require('../utils/response-utils');

const PermissionController = {
    createPermission: async (req, res) => {
        try {
            const { name } = req.body;
            const newPermission = await createPermissionService({ name });
            const [adminRole] = req.body.user.roles;
            const role = await findRole({ _id: adminRole });
            
            if (!role) { throw new Error('Roles no encontrado') }

            role.permissions.push(newPermission._id);
            await role.save();

            res.status(201).json(successResponse(newPermission));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    
    getAllPermissions: async (req, res) => {
        try {
            const permissions = await findAllPermissionService();
            res.json(successResponse(permissions));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    
    getPermissionById: async (req, res) => {
        try {
            const permission = await findPermission({ _id:  new ObjectId(req.params.permissionId) });
            if (!permission) {
                return res.status(404).json(errorResponse('Permiso no encontrado', 404));
            }
            res.json(successResponse(permission));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    
    updatePermission: async (req, res) => {
        try {
            const {
                params: { permissionId },
                body: { name }
            } = req;
            
            const permission = await updatePermissionService(
                permissionId,
                { name },
            );
            if (!permission.modifiedCount) {
                return res.status(404).json(errorResponse('Permiso no encontrado', 404));
            }
            res.json(successResponse({ message: 'Permiso actualizado exitosamente' }));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },

    deletePermission: async (req, res) => {
        try {
            const permission = deletePermissionService(req.params.permissionId)
            if (!permission) {
                return res.status(404).json(errorResponse('Permiso no encontrado', 404));
            }
            res.json({ message: 'Permiso eliminado correctamente' });
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    }
};

module.exports = PermissionController;

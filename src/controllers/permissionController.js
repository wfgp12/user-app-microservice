const { ObjectId } = require('mongodb');
const {
    createPermissionService,
    findAllPermissionService,
    findPermission,
    updatePermissionService,
    deletePermissionService
} = require('../services/permissionServices');
const { findRole } = require('../services/roleServices');

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
            res.status(201).json(newPermission);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getAllPermissions: async (req, res) => {
        try {
            const permissions = await findAllPermissionService();
            res.json(permissions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getPermissionById: async (req, res) => {
        try {
            const permission = await findPermission({ _id:  new ObjectId(req.params.permissionId) });
            if (!permission) {
                return res.status(404).json({ message: 'Permiso no encontrado' });
            }
            res.json(permission);
        } catch (error) {
            res.status(500).json({ error: error.message });
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
                return res.status(404).json({ message: 'Permiso no encontrado' });
            }
            res.json({ message: 'Permiso actualizado exitosamente ' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deletePermission: async (req, res) => {
        try {
            const permission = deletePermissionService(req.params.permissionId)
            if (!permission) {
                return res.status(404).json({ message: 'Permiso no encontrado' });
            }
            res.json({ message: 'Permiso eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = PermissionController;

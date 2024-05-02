const Permission = require('../models/permission');

const PermissionController = {
    getAllPermissions: async (req, res) => {
        try {
            const permissions = await Permission.find();
            res.json(permissions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createPermission: async (req, res) => {
        try {
            const { name } = req.body;
            const permission = new Permission({ name });
            await permission.save();
            res.status(201).json(permission);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getPermissionById: async (req, res) => {
        try {
            const permission = await Permission.findById(req.params.permissionId);
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
            const { name } = req.body;
            const permission = await Permission.findByIdAndUpdate(
                req.params.permissionId,
                { name },
                { new: true }
            );
            if (!permission) {
                return res.status(404).json({ message: 'Permiso no encontrado' });
            }
            res.json(permission);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deletePermission: async (req, res) => {
        try {
            const permission = await Permission.findByIdAndDelete(req.params.permissionId);
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

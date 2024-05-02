const Role = require('../models/role');

const RoleController = {
    getAllRoles: async (req, res) => {
        try {
            const roles = await Role.find();
            res.json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createRole: async (req, res) => {
        try {
            const { name, permissions } = req.body;
            const role = new Role({ name, permissions });
            await role.save();
            res.status(201).json(role);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getRoleById: async (req, res) => {
        try {
            const role = await Role.findById(req.params.roleId);
            if (!role) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            res.json(role);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateRole: async (req, res) => {
        try {
            const { name, permissions } = req.body;
            const role = await Role.findByIdAndUpdate(
                req.params.roleId,
                { name, permissions },
                { new: true }
            );
            if (!role) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            res.json(role);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteRole: async (req, res) => {
        try {
            const role = await Role.findByIdAndDelete(req.params.roleId);
            if (!role) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            res.json({ message: 'Rol eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = RoleController;

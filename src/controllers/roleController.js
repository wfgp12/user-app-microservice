const Role = require('../models/role');
const { findAggregateRole } = require('../services/roleServices');
const { errorResponse, successResponse } = require('../utils/response-utils');

const RoleController = {
    getAllRoles: async (req, res) => {
        try {
            console.log('*********');
            const roles = await findAggregateRole({}, { _id: 1, name: 1 });
            res.json(successResponse(roles));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    
    createRole: async (req, res) => {
        const { name, permissions } = req.body;
        try {
            const role = new Role({ name, permissions });
            await role.save();
            res.status(201).json(successResponse(role));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    
    getRoleById: async (req, res) => {
        try {
            const role = await Role.findById(req.params.roleId);
            if (!role) {
                return res.status(404).json(errorResponse('Rol no encontrado', 404));
            }
            res.json(successResponse(role));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
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
                return res.status(404).json(errorResponse('Rol no encontrado', 404));
            }
            res.json(successResponse(role));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    
    deleteRole: async (req, res) => {
        try {
            const role = await Role.findByIdAndDelete(req.params.roleId);
            if (!role) {
                return res.status(404).json(errorResponse('Rol no encontrado', 404));
            }
            res.json(successResponse({ message: 'Rol eliminado correctamente' }));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    }
};

module.exports = RoleController;

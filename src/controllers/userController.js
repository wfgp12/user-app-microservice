const User = require('../models/user');
const { findUser } = require('../services/userServices');
const { generateToken } = require('../utils/auth');
const { errorResponse, successResponse } = require('../utils/response-utils');

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(successResponse(users));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },

    createUser: async (req, res) => {
        try {
            const { fullName, documentNumber, dateOfBirth, country, email, password, roles } = req.body;
            const user = new User( { fullName, documentNumber, dateOfBirth, country, email, password, roles });
            await user.save();
            res.status(201).json(successResponse(user));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json(errorResponse('Usuario no encontrado', 404));
            }
            res.json(successResponse(user));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },

    updateUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { username, email, password },
                { new: true }
            );
            if (!user) {
                return res.status(404).json(errorResponse('Usuario no encontrado', 404));
            }
            res.json(successResponse(user));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                return res.status(401).json(errorResponse('Usuario no encontrado', 404));
            }
            res.json(successResponse({ message: 'Usuario eliminado correctamente' }));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await  findUser({ email, password });

            if (!user) {
                return res.status(401).json(errorResponse('Credenciales inválidas', 401));
            }
            
            const token = generateToken(user);
            res.json(successResponse({ user, token }));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    }
};

module.exports = UserController;

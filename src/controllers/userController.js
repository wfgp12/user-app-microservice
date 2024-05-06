const User = require('../models/user');
const { findUser } = require('../services/userServices');
const { generateToken } = require('../utils/auth');

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createUser: async (req, res) => {
        try {
            const { username, email, password, roles } = req.body;
            const user = new User({ username, email, password, roles });
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
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
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await  findUser({ email, password });

            if (!user) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            const token = generateToken(user);
            res.json({ user, token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    }
};

module.exports = UserController;

const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();


const userRoutes = router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
router.get('/:userId', UserController.getUserById);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

module.exports = userRoutes;

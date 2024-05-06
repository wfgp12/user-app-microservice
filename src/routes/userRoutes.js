const express = require('express');
const UserController = require('../controllers/userController');
const { validateLogin } = require('../middlewares/validators/auth-validator');
const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.post('/', UserController.createUser);
userRouter.get('/:userId', UserController.getUserById);
userRouter.put('/:userId', UserController.updateUser);
userRouter.delete('/:userId', UserController.deleteUser);
userRouter.post('/login',validateLogin, UserController.loginUser);

module.exports = userRouter;

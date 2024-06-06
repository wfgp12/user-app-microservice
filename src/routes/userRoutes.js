const express = require('express');
const UserController = require('../controllers/userController');
const { validateLogin } = require('../middlewares/validators/auth-validator');
const handleValidationResult = require('../middlewares/handleValidationErrors');
const { userValidationCreate } = require('../middlewares/validators/user-validator');
const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.post('/',[
    userValidationCreate,
    handleValidationResult
], UserController.createUser);
userRouter.get('/:userId', UserController.getUserById);
userRouter.put('/:userId', UserController.updateUser);
userRouter.delete('/:userId', UserController.deleteUser);
userRouter.post('/login',[
    validateLogin,
    handleValidationResult
], UserController.loginUser);

module.exports = userRouter;

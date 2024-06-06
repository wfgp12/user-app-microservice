const { ObjectId } = require('mongodb');
const { header, check } = require('express-validator');

const { verifyToken } = require('../../utils/auth');
const { findUser } = require('../../services/userServices');

const validateToken = [
    header('Authorization')
        .exists().withMessage('Token de sesión requerido en los headers').bail()
        .custom(async (value, { req }) => {

            const token = value.split(' ')[1];
            const decodedToken = verifyToken(token);
            
            if (!decodedToken) {
                throw new Error('Token de sesión inválido');
            }
            try {
                req.body.user = await findUser({ _id: new ObjectId(decodedToken.userId) });
                return true;
            } catch (error) {
                console.error('Error al decodificar el token:', error);
                throw new Error('Token de sesión inválido');
            }
        }).bail()
]

const validateLogin = [
    check('email')
        .isEmail().withMessage('El email debe ser válido')
        .notEmpty().withMessage('El email es obligatorio'),
    check('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
];

module.exports = {
    validateToken,
    validateLogin
};

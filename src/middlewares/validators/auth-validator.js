const { ObjectId } = require('mongodb');
const { header } = require('express-validator');

const { loginSchema } = require('../schemas/auth-schemas');
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

function validateLogin(req, res, next) {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = {
    validateToken,
    validateLogin
};

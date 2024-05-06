const { loginSchema } = require('../schemas/auth-schemas');
const { verifyToken } = require('../../utils/auth');

function validateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token de sesión requerido' });
    }

    const decodedToken = verifyToken(token);

    if (!decodedToken) {
        return res.status(401).json({ error: 'Token de sesión inválido o expirado' });
    }

    req.userId = decodedToken.userId;
    next();
}

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

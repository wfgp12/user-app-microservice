const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET; // Clave secreta para firmar el token

// Función para generar un token JWT
function generateToken(user) {
    return jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' }); // El token expira en 1 hora
}

// Función para verificar un token JWT
function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null; // Retorna null si el token es inválido o ha expirado
    }
}

module.exports = { generateToken, verifyToken };
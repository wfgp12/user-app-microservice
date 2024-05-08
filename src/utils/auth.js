const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET; 

function generateToken(user) {
    return jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' }); 
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null; 
    }
}

module.exports = { generateToken, verifyToken };
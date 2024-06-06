const { body } = require("express-validator");
const User = require("../../models/user");

module.exports = {
    userValidationCreate: [
        body('fullName').notEmpty().withMessage('Full name is required').bail(),
        body('email').exists().withMessage('email is required')
            .isEmail().withMessage('Invalid email format').custom(async (value) => {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error('Email is already in use');
                }
            }).bail(),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }).bail(),
        body('documentNumber').notEmpty().withMessage('Document number is required').custom(async (value) => {
            const user = await User.findOne({ documentNumber: value });
            if (user) {
                throw new Error('Document number is already in use');
            }
        }).bail(),
        body('dateOfBirth').isISO8601().withMessage('Date of birth must be a valid date'),
        body('country').notEmpty().withMessage('Country is required'),
        body('roles').isArray().withMessage('Roles must be an array')
    ]
}
const { validationResult } = require('express-validator');

const handleValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.errors[0].msg });
    }
    next();
};

module.exports = handleValidationResult;
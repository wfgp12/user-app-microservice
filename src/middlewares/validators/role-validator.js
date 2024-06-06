const { body } = require("express-validator");
const Role = require("../../models/role");
const { validateToken } = require("./auth-validator");
const { validatePermission } = require("./permission-validator");

module.exports = {
    validateCreateRole: [
        ...validateToken,
        ...validatePermission('createRole'),
        body('name')
            .exists().withMessage('El nombre del rol es requerido').bail()
            .notEmpty().withMessage('El nombre del rol no puede estar vacío').bail()
            .custom(async (name) => {
                const roleExist = await Role.findOne({ name });
                if (roleExist) {
                    throw new Error('Este rol ya existe');
                }
                return true;
            }),
        body('permissions')
            .isArray().withMessage('Las permisos deben ser un array')
    ],
    validateEditRole: [
        ...validateToken,
        ...validatePermission('editRole'),
        body('name')
            .optional().bail()
            .notEmpty().withMessage('El nombre del rol no puede estar vacío').bail()
            .custom(async (name) => {
                const roleExist = await Role.findOne({ name });
                if (roleExist) {
                    throw new Error('Este rol ya existe');
                }
                return true;
            }),
        body('permissions')
            .isArray().withMessage('Las permisos deben ser un array')
    ],
}
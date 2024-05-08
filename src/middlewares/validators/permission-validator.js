const { ObjectId } = require('mongodb');
const { check } = require('express-validator');

const { validateToken } = require('./auth-validator');
const { findPermissionsByRole } = require("../../services/roleServices");
const { findPermission } = require('../../services/permissionServices');

const validatePermission = (permission) => [
    check('user')
        .exists().withMessage('No se encontró al usuario').bail()
        .custom(async (user) => {
            try {
                const permissions = await findPermissionsByRole({ _id: new ObjectId(user.roles[0]) })
                if (!permissions?.length || !permissions.includes(permission)) {
                    return res.status(403).json({ error: 'No tienes permisos para crear una nueva funcionalidad' });
                }
                return true;
            } catch (error) {
                console.error('Error al validar los permisos del usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        }
        ).bail()
];

const validateCreatePermission = [
    ...validateToken,
    ...validatePermission('createPermission'),
    check('name')
        .exists().withMessage('El nombre del permiso es requerido').bail()
        .notEmpty().withMessage('El nombre del permiso no puede ser vació').bail()
        .custom(async (name,) => {
            const permissionExist = await findPermission({ name });
            if (permissionExist) throw new Error('Este permiso ya existe')
            return true;
        })
]

const validateUpdatePermission = [
    ...validateToken,
    ...validatePermission('editPermission'),
    check('name').optional().bail()
        .isString().withMessage('El nombre del permiso debe ser una cadena de texto').bail()
        .notEmpty({ignore_whitespace: true}).withMessage('El nombre del permiso no puede ser vació').bail()
        .custom(async (name,) => {
            const permissionExist = await findPermission({ name });
            if (permissionExist) throw new Error('Este permiso ya existe')
            return true;
        }).bail()
]

const validateGetPermission = [
    ...validateToken,
    ...validatePermission('getPermission'),
]

const validateGetAllPermission = [
    ...validateToken,
    ...validatePermission('getAllPermission'),
]

const validateDeletePermission = [
    ...validateToken,
    ...validatePermission('deletePermission'),
]


module.exports = {
    validatePermission,
    validateCreatePermission,
    validateUpdatePermission,
    validateGetPermission,
    validateGetAllPermission,
    validateDeletePermission
}
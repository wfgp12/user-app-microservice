// utils/initializeService.js

const User = require('../models/user');
const Role = require('../models/role');
const Permission = require('../models/permission');

async function initializeService() {
    try {
        // Buscar o crear el rol de administrador
        let adminRole = await Role.findOne({ name: 'Admin' });
        if (!adminRole) {
            adminRole = new Role({
                name: 'Admin',
                permissions: [] // Aquí puedes definir los permisos según necesites
            });
            await adminRole.save();
        }

        // Crear los permisos por defecto si no existen
        const defaultPermissions = ['createPermission', 'deletePermission', 'editPermission', 'getPermission', 'getAllPermission'];
        const permissions = await Promise.all(defaultPermissions.map(async (permissionName) => {
            let permission = await Permission.findOne({ name: permissionName });
            if (!permission) {
                permission = new Permission({ name: permissionName });
                await permission.save();
            }
            return null;
        }));

        // Filtrar y eliminar valores nulos del array de permisos
        const filteredPermissions = permissions.filter(permission => permission);

        // Asignar los permisos al rol de administrador si se crearon nuevos permisos
        if (filteredPermissions.length > 0) {
            adminRole.permissions = [...filteredPermissions, ...adminRole.permissions];
            await adminRole.save();
        }

        // Crear el usuario administrador si no existe
        let adminUser = await User.findOne({ email: 'admin@example.com' });
        if (!adminUser) {
            adminUser = new User({
                fullName: 'Administrador',
                email: 'admin@example.com',
                password: 'password', // Recuerda encriptar la contraseña en producción
                documentNumber: '0123456789',
                dateOfBirth: new Date('1990-01-01'),
                country: 'País',
                roles: [adminRole._id]
            });
            await adminUser.save();

            console.log('Usuario administrador creado con éxito.');
        }
    } catch (error) {
        throw error; // Lanza el error para manejarlo fuera de la función
    }
}

module.exports = initializeService;

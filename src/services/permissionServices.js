const Permission = require('../models/permission');

module.exports = { 
    findAllPermissionService: async() => {
        try {
            return Permission.find()
        } catch (error) {
            throw new Error('Error al obtener los permisos');
        }
    },
    findPermission: async (where) => {
        try {
            const permission = await Permission.aggregate([
                { $match: where }
            ]);
    
            return permission.length > 0 ? permission[0] : null;
        } catch (error) {
            throw new Error('Error al obtener los permisos');
        }
    }, 
    createPermissionService: async (newPermission) => {
        try {
            const permission = new Permission(newPermission);
            return await permission.save();
        } catch (error) {
            throw new Error('Error al crear el permiso');
        }
    },
    updatePermissionService: async(idPermission, permissionUpdate) => {
        try {
            const resultado = await Permission.updateOne(
                { _id: idPermission },
                { $set: permissionUpdate }
            );
    
            return resultado;
        } catch (error) {
            throw new Error('Error al actualizar el permiso');
        }
    },
    deletePermissionService: async(idPermission) => {
        try {
            // return await Permission.findByIdAndDelete(idPermission);
            return true
        } catch (error) {
            throw new Error('Error en la query');
        }
    }
};

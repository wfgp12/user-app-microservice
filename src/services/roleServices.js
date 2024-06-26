const Role = require('../models/role');

const getListRoles = async () => {
    try {
        const roles = await Role.aggregate([
            { $project: { _id: 1, name: 1, permissions: 0 } }
        ]);
        return roles;
    } catch (error) {
        throw new Error('Error del servidor');
    }
}

module.exports = {
    findPermissionsByRole: async (where) => {
        try {
            const [permissions] = await Role.aggregate([
                { $match: where },
                {
                    $lookup: {
                        from: 'permissions',
                        localField: 'permissions',
                        foreignField: '_id',
                        as: 'permissions'
                    }
                },
                { $unwind: '$permissions' },
                { $replaceRoot: { newRoot: '$permissions' } },
                {
                    $group: {
                        _id: null,
                        permissions: { $push: '$name' }
                    }
                }
            ]);
            return permissions?.permissions || null;
        } catch (error) {
            throw new Error('Error al obtener los permisos');
        }
    },
    findAggregateRole: async (where, project) => {
        try {
            const role = await Role.aggregate([
                { $match: where },
                {
                    $lookup: {
                        from: 'permissions',
                        localField: 'permissions',
                        foreignField: '_id',
                        as: 'permissions'
                    }
                },
                {
                    $project: project || { _id: 1, name: 1, permissions: 1 }
                }
            ]);
            return role;
        } catch (error) {
            throw new Error('Error al obtener el rol');
        }
    },
    findRole: async (where) => {
        try {
            return await Role.findOne(where)
        } catch (error) {
            throw new Error('Error al obtener el rol');
        }
    },
    updateRoleService: async (idRol, newData) => {
        try {
            const resultado = await Role.updateOne(
                { _id: idRol },
                { $set: newData }
            );
    
            return resultado;
        } catch (error) {
            throw error;
        }
    }
};

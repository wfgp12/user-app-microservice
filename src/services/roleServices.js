const Role = require('../models/role');

const findPermissionsByRole = async (where) => {
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
        console.error('Error al obtener los permisos:', error);
        throw new Error('Error al obtener los permisos');
    }
};

const findAggregateRole = async (where) => {
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
                $project: { _id: 1, name: 1, permissions: 1 }
            }
        ]);
        return role;
    } catch (error) {
        console.error('Error al obtener el rol:', error);
        throw new Error('Error al obtener el rol');
    }
};

const findRole = async (where) => {
    try {
        return await Role.findOne(where)
    } catch (error) {
        console.error('Error al obtener el rol:', error);
        throw new Error('Error al obtener el rol');
    }
}

const updateRoleService = async (idRol, newData) => {
    try {
        const resultado = await Role.updateOne(
            { _id: idRol },
            { $set: newData }
        );

        return resultado;
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        throw error;
    }
};

module.exports = {
    findPermissionsByRole,
    findAggregateRole,
    findRole,
    updateRoleService
};

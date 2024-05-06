// services/userService.js

const User = require('../models/user');
const Role = require('../models/role');

async function findUser(where) {
    try {
        const user = await User.aggregate([
            { $match: where },
            {
                $lookup: {
                    from: 'roles',
                    localField: 'roles',
                    foreignField: '_id',
                    as: 'roles'
                }
            },
            { $unwind: '$roles' }, // Desenrolla el array de roles
            {
                $lookup: {
                    from: 'permissions',
                    localField: 'roles.permissions',
                    foreignField: '_id',
                    as: 'roles.permissions'
                }
            },
            { $group: { _id: '$_id', user: { $first: '$$ROOT' } } }, // Agrupa los resultados nuevamente por el ID de usuario
            { $replaceRoot: { newRoot: '$user' } } // Reemplaza el objeto raíz con el objeto del usuario
        ]);

        return user.length > 0 ? user[0] : null;
    } catch (error) {
        throw error;
    }
}

module.exports = { findUser };

// services/userService.js

const User = require('../models/user');

async function findUser(where) {
    try {
        const user = await User.aggregate([
            { $match: where },
            // {
            //     $lookup: {
            //         from: 'roles',
            //         localField: 'roles',
            //         foreignField: '_id',
            //         as: 'roles'
            //     }
            // },
            // { $unwind: '$roles' }, 
            // {
            //     $lookup: {
            //         from: 'permissions',
            //         localField: 'roles.permissions',
            //         foreignField: '_id',
            //         as: 'roles.permissions'
            //     }
            // },
            // { $group: { _id: '$_id', user: { $first: '$$ROOT' } } },
            // { $replaceRoot: { newRoot: '$user' } } 
        ]);

        return user.length > 0 ? user[0] : null;
    } catch (error) {
        throw error;
    }
}

module.exports = { findUser };

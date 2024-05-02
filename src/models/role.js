const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] 
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: { type: String, required: true }, // Nombre completo del usuario
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    documentNumber: { type: String, required: true }, // Número de documento
    dateOfBirth: { type: Date, required: true }, // Fecha de nacimiento
    country: { type: String, required: true }, // País de residencia
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});


const User = mongoose.model('User', userSchema);

module.exports = User;

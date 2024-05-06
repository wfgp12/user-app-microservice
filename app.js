
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes');
const roleRoutes = require('./src/routes/roleRoutes');
const permissionRoutes = require('./src/routes/permissionRoutes'); 

const initializeService = require('./src/utils/initializeService');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);

app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.DB_CONNECTION).then(async() => {
    console.log('Conexión a MongoDB establecida correctamente');

    await initializeService();

    app.listen(PORT, () => {
        console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
    });
}).catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
});


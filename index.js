const cors = require('cors');
const path = require('path');
const express = require('express');
const { dbConnection } = require('./database/Connection');

require('dotenv').config();
// Creacion del servidor express

const app = express();


// configuracion de CORS

app.use(cors());

// Carpeta PUBLIC

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Lectura y parseo del body


app.use(express.json());

// Base de datos

dbConnection();




// Rutas

app.use('/api/v1.0/user', require('./routes/Users'));
app.use('/api/v1.0/auth', require('./routes/Auth'));

app.use('/api/v1.0/lines', require('./routes/Lines'));
app.use('/api/v1.0/groups', require('./routes/Groups'));
app.use('/api/v1.0/programs', require('./routes/Programs'));
app.use('/api/v1.0/steps', require('./routes/Steps'));
app.use('/api/v1.0/globales', require('./routes/Global'));


// Rutas globales


// Rutas para el modulo de configuracion

app.use(
  '/api/v1.0/configurations/subCategoryPrograms',require('./routes/subCategoryPrograms')
);

app.listen(process.env.PORT, () => {
  console.log('🚀 - Servidor corriendo  en el puerto', + process.env.PORT);
});

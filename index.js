const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const express = require('express');
const session = require('express-session');

const { dbConnection } = require('./database/Connection');
require('dotenv').config();

// Creación del servidor Express
const app = express();

// Usar el middleware helmet
 app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Configuración de CORS
app.use(cors());

// Carpeta PUBLIC

app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del middleware express-session
app.use(
  session({
    secret:  '#PoZl42lmFerp.Vg+MHWQ#', 
    resave: true,
    saveUninitialized: true,
  })
);


// Base de datos
dbConnection();

// Rutas Login
app.use( '/api/v1.0/auth',     require('./routes/Auth'));
app.use( '/api/v1.0/steps',    require('./routes/Steps'));
app.use( '/api/v1.0/lines',    require('./routes/Lines'));
app.use( '/api/v1.0/groups',   require('./routes/Groups'));
app.use( '/api/v1.0/globales', require('./routes/Global'));
app.use( '/api/v1.0/programs', require('./routes/Programs'));

// Rutas para el módulo de configuración
app.use( '/api/v1.0/configurations/roles',               require('./routes/Role'));
app.use( '/api/v1.0/configurations/user',                require('./routes/Users'));
app.use( '/api/v1.0/configurations/subCategoryPrograms', require('./routes/subCategoryPrograms'));


app.listen(process.env.PORT, () => {
  console.log('🚀 - Servidor corriendo en el puerto', process.env.PORT);
});

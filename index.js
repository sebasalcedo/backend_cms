const cors = require('cors');
const path = require('path');
<<<<<<< HEAD
const helmet = require('helmet');
const express = require('express');
const session = require('express-session');


const  initializeFirebase = require ("./firebase/configurations");


const { dbConnection } = require('./database/Connection');
require('dotenv').config();

// Creación del servidor Express
const app = express();

// Usar el middleware helmet

// Configuración de CORS
app.use(cors());

// Carpeta PUBLIC

app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicio de firebase Storage

initializeFirebase();

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
=======
const express = require('express');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('./database/Connection');

require('dotenv').config();
// Creacion del servidor express

const app = express();

app.use(fileUpload());
// configuracion de CORS

app.use(cors());



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Carpeta PUBLIC

app.use(express.static('public'));

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
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
});

const { initializeApp } = require("firebase/app");
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId:process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const initializeFirebase = () => {
    try {
        const firebase = initializeApp(firebaseConfig);
        return firebase;
    } catch (error) {
        console.error("Error al inicializar Firebase:", error);
        return null;
    }
};

module.exports= initializeFirebase
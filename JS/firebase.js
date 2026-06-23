import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// ===============================
// CONFIGURACIÓN FIREBASE
// ===============================

const firebaseConfig = {
    apiKey: "AIzaSyDMqT6Kv0sP6sNeALpJtUxahnvzSlAoVoY",
    authDomain: "gungo-s-pasteleria.firebaseapp.com",
    projectId: "gungo-s-pasteleria",
    storageBucket: "gungo-s-pasteleria.firebasestorage.app",
    messagingSenderId: "152333800102",
    appId: "1:152333800102:web:ff37d7fca42070715d5a67",
    measurementId: "G-QBTXE40LZP"
};


// ===============================
// INICIALIZAR FIREBASE
// ===============================

const app = initializeApp(firebaseConfig);


// ===============================
// EXPORTAR SERVICIOS
// ===============================

export const db = getFirestore(app);
export const auth = getAuth(app);
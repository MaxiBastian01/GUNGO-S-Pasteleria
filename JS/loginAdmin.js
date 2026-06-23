import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const formulario = document.getElementById("login-form");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        mensaje.textContent = "Login correcto";

        window.location.href = "indexAdmin.html";

    } catch (error) {

        mensaje.textContent =
            "Email o contraseña incorrectos";

        console.error(error);
    }

});
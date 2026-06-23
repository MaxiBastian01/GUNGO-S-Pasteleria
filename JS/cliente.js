// ===============================
// SECCIÓN: FIREBASE Y FIRESTORE
// ===============================

// Importamos la conexión a Firestore desde firebase.js
import { db } from "./firebase.js";

// Importamos funciones necesarias para leer documentos de Firestore
import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ===============================
// FIN SECCIÓN: FIREBASE Y FIRESTORE
// ===============================



// ===============================
// SECCIÓN: ELEMENTOS DEL HTML
// ===============================
const toastCarrito = document.getElementById("toast-carrito");
const contenedor = document.getElementById("productos-container");
const contadorCarrito = document.getElementById("contador-carrito");
const cantidadCarrito = document.getElementById("cantidad-carrito");
const categoriasContainer = document.getElementById("categorias-container");
// ===============================
// FIN SECCIÓN: ELEMENTOS DEL HTML
// ===============================



// ===============================
// SECCIÓN: VARIABLES GLOBALES
// ===============================

let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ===============================
// FIN SECCIÓN: VARIABLES GLOBALES
// ===============================



// ===============================
// SECCIÓN: CARGAR PRODUCTOS DESDE FIRESTORE
// ===============================

async function cargarProductos() {
    contenedor.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "Productos"));

    productos = [];

    querySnapshot.forEach((doc) => {
        const producto = {
            id: doc.id,
            ...doc.data()
        };

        if (producto.disponible === true) {
            productos.push(producto);
        }
    });
    generarCategorias();
    mostrarProductos();
}

// ===============================
// FIN SECCIÓN: CARGAR PRODUCTOS DESDE FIRESTORE
// ===============================



// ===============================
// SECCIÓN: MOSTRAR PRODUCTOS EN HTML
// ===============================

function mostrarProductos(lista = productos) {

    contenedor.innerHTML = "";

    lista.forEach(producto => {

        contenedor.innerHTML += `
            <article class="producto-card">
                <img src="${producto.imagenUrl}" alt="${producto.nombre}">

                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <div class="precio">$${producto.precio}</div>

                    <button class="btn-agregar" data-id="${producto.id}">
                        Agregar al carrito
                    </button>
                </div>
            </article>
        `;
    });

    document.querySelectorAll(".btn-agregar").forEach(boton => {
        boton.addEventListener("click", () => {
            agregarAlCarrito(boton.dataset.id);
        });
    });
}

// ===============================
// FIN SECCIÓN: MOSTRAR PRODUCTOS EN HTML
// ===============================



// ===============================
// SECCIÓN: CARRITO
// ===============================

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);

    const productoEnCarrito = carrito.find(p => p.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();
    mostrarToastCarrito();
}

function actualizarContador() {
    const cantidadTotal = carrito.reduce((total, producto) => {
        return total + producto.cantidad;
    }, 0);

    contadorCarrito.textContent = cantidadTotal;
    cantidadCarrito.textContent = cantidadTotal;
}
function mostrarToastCarrito() {
    toastCarrito.classList.add("mostrar");

    setTimeout(() => {
        toastCarrito.classList.remove("mostrar");
    }, 1800);
}
// ===============================
// FIN SECCIÓN: CARRITO
// ===============================



// ===============================
// SECCIÓN: INICIO DE LA PÁGINA
// ===============================

cargarProductos();
actualizarContador();

// ===============================
// FIN SECCIÓN: INICIO DE LA PÁGINA
// ===============================

// ===============================
// FIN SECCIÓN: Categorias dinamicas    
// ===============================
function generarCategorias() {

    categoriasContainer.innerHTML = "";

    const categorias = [
        "todos",
        ...new Set(productos.map(p => p.categoria))
    ];

    categorias.forEach(categoria => {

        const boton = document.createElement("button");

        boton.textContent =
            categoria.charAt(0).toUpperCase() +
            categoria.slice(1);

        boton.classList.add("categoria-btn");

        boton.addEventListener("click", () => {

            document
                .querySelectorAll(".categoria-btn")
                .forEach(btn => btn.classList.remove("activo"));

            boton.classList.add("activo");

            if (categoria === "todos") {
                mostrarProductos(productos);
            } else {

                const filtrados = productos.filter(
                    p => p.categoria === categoria
                );

                mostrarProductos(filtrados);
            }
        });

        categoriasContainer.appendChild(boton);
    });

    categoriasContainer
        .querySelector(".categoria-btn")
        ?.classList.add("activo");
}
// ===============================
// FIN SECCIÓN: Fin Categorias dinamicas
// ===============================
import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs,
    doc,
    setDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const form = document.getElementById("producto-form");
const productosAdmin = document.getElementById("productos-admin");
const btnLogout = document.getElementById("btn-logout");
const buscadorProductos = document.getElementById("buscador-productos");
const inputId = document.getElementById("producto-id");
const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const inputCategoria = document.getElementById("categoria");
const inputImagenUrl = document.getElementById("imagenUrl");
const inputDisponible = document.getElementById("disponible");

let productos = [];

buscadorProductos.addEventListener("input", () => {
    const texto = buscadorProductos.value.toLowerCase();

    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto) ||
        producto.categoria.toLowerCase().includes(texto)
    );

    mostrarProductosAdmin(productosFiltrados);
});
async function cargarProductosAdmin() {
    productosAdmin.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "Productos"));

    productos = [];

    querySnapshot.forEach((documento) => {
        const producto = {
            id: documento.id,
            ...documento.data()
        };

        productos.push(producto);
    });

    mostrarProductosAdmin();
}

function mostrarProductosAdmin(lista = productos) {
    productosAdmin.innerHTML = "";

    lista.forEach(producto => {
        productosAdmin.innerHTML += `
            <article class="producto-admin-card">

                <img src="${producto.imagenUrl}" alt="${producto.nombre}">

                <h3>${producto.nombre}</h3>

                <p>Precio: $${producto.precio}</p>
                <p>Categoría: ${producto.categoria}</p>
                <p class="estado">
                    ${producto.disponible ? "Disponible" : "No disponible"}
                </p>

                <div class="acciones">
                    <button class="btn-editar" data-id="${producto.id}">
                        Editar
                    </button>

                    <button class="btn-eliminar" data-id="${producto.id}">
                        Eliminar
                    </button>
                </div>

            </article>
        `;
    });

    document.querySelectorAll(".btn-editar").forEach(boton => {
        boton.addEventListener("click", () => {
            editarProducto(boton.dataset.id);
        });
    });

    document.querySelectorAll(".btn-eliminar").forEach(boton => {
        boton.addEventListener("click", () => {
            eliminarProducto(boton.dataset.id);
        });
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id =
        inputId.value ||
        inputNombre.value
            .toLowerCase()
            .replaceAll(" ", "_");

    const producto = {
        nombre: inputNombre.value,
        precio: Number(inputPrecio.value),
        categoria: inputCategoria.value.toLowerCase(),
        imagenUrl: inputImagenUrl.value,
        disponible: inputDisponible.checked
    };

    await setDoc(doc(db, "Productos", id), producto);

    form.reset();
    inputId.value = "";
    inputDisponible.checked = true;

    cargarProductosAdmin();
});

function editarProducto(id) {
    const producto = productos.find(p => p.id === id);

    if (!producto) return;

    inputId.value = producto.id;
    inputNombre.value = producto.nombre;
    inputPrecio.value = producto.precio;
    inputCategoria.value = producto.categoria;
    inputImagenUrl.value = producto.imagenUrl;
    inputDisponible.checked = producto.disponible;
}

async function eliminarProducto(id) {
    const confirmar = confirm("¿Seguro que querés eliminar este producto?");

    if (!confirmar) return;

    await deleteDoc(doc(db, "Productos", id));

    cargarProductosAdmin();
}

btnLogout.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "loginAdmin.html";
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        cargarProductosAdmin();
    } else {
        window.location.href = "loginAdmin.html";
    }
});


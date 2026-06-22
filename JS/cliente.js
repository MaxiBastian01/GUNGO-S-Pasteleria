const productos = [
    {
        id: 1,
        nombre: "Torta Oreo",
        descripcion: "Torta artesanal con crema y galletitas Oreo.",
        precio: 12000,
        categoria: "Tortas",
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    },
    {
        id: 2,
        nombre: "Cupcakes",
        descripcion: "Cupcakes decorados ideales para eventos.",
        precio: 6000,
        categoria: "Cupcakes",
        imagen: "https://images.unsplash.com/photo-1587668178277-295251f900ce"
    },
    {
        id: 3,
        nombre: "Alfajores",
        descripcion: "Alfajores caseros rellenos con dulce de leche.",
        precio: 3500,
        categoria: "Alfajores",
        imagen: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
    }
];

const contenedor = document.getElementById("productos-container");
const contadorCarrito = document.getElementById("contador-carrito");
const cantidadCarrito = document.getElementById("cantidad-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos() {
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        contenedor.innerHTML += `
            <article class="producto-card">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <div class="precio">$${producto.precio}</div>
                    <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">
                        Agregar al carrito
                    </button>
                </div>
            </article>
        `;
    });
}

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
}

function actualizarContador() {
    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    contadorCarrito.textContent = cantidadTotal;
    cantidadCarrito.textContent = cantidadTotal;
}

mostrarProductos();
actualizarContador();
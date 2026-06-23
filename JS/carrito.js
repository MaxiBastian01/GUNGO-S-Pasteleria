const listaCarrito = document.getElementById("carrito-lista");
const totalCarrito = document.getElementById("total-carrito");
const btnWhatsapp = document.getElementById("btn-whatsapp");
const btnVaciar = document.getElementById("btn-vaciar");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = `
            <p>Tu carrito está vacío.</p>
        `;

        totalCarrito.textContent = "$0";
        return;
    }

    carrito.forEach(producto => {
        listaCarrito.innerHTML += `
            <article class="carrito-item">
                <img src="${producto.imagenUrl}" alt="${producto.nombre}">

                <div class="item-info">
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio}</p>

                    <div class="item-controles">
                        <button onclick="restarCantidad('${producto.id}')">-</button>
                        <span>${producto.cantidad}</span>
                        <button onclick="sumarCantidad('${producto.id}')">+</button>
                    </div>

                    <button class="btn-eliminar" onclick="eliminarProducto('${producto.id}')">
                        Eliminar
                    </button>
                </div>
            </article>
        `;
    });

    actualizarTotal();
}

function actualizarTotal() {
    const total = carrito.reduce((acum, producto) => {
        return acum + producto.precio * producto.cantidad;
    }, 0);

    totalCarrito.textContent = `$${total}`;
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function sumarCantidad(id) {
    const producto = carrito.find(p => p.id === id);

    if (producto) {
        producto.cantidad++;
    }

    guardarCarrito();
    mostrarCarrito();
}

function restarCantidad(id) {
    const producto = carrito.find(p => p.id === id);

    if (producto && producto.cantidad > 1) {
        producto.cantidad--;
    }

    guardarCarrito();
    mostrarCarrito();
}

function eliminarProducto(id) {
    carrito = carrito.filter(producto => producto.id !== id);

    guardarCarrito();
    mostrarCarrito();
}

btnVaciar.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
});

btnWhatsapp.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const total = carrito.reduce((acum, producto) => {
        return acum + producto.precio * producto.cantidad;
    }, 0);

    let mensaje = "Hola! Quiero hacer este pedido:%0A%0A";

    carrito.forEach(producto => {
        mensaje += `- ${producto.nombre} x${producto.cantidad}: $${producto.precio * producto.cantidad}%0A`;
    });

    mensaje += `%0ATotal: $${total}`;

    const telefono = "543442509108";
    const url = `https://wa.me/${telefono}?text=${mensaje}`;

    window.open(url, "_blank");
});

mostrarCarrito();
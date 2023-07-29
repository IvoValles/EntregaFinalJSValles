let iniciarSesionBtn = document.getElementById('iniciarSesionBtn');
let mensajeBienvenida = document.getElementById('mensajeBienvenida');

iniciarSesionBtn.addEventListener('click', () => {
  let usuario = prompt('Usuario:');
  let contraseña = prompt('Contraseña:');

  if ((usuario === 'Ivan' || usuario === 'Invitado') && contraseña === '123') {
    iniciarSesionBtn.style.display = 'none';
    mensajeBienvenida.style.display = 'block';
    mensajeBienvenida.textContent = `¡Bienvenido, ${usuario}!`;
  } else {
    alert('No es posible iniciar sesión. Verifica tus credenciales.');
  }
});


const catalogoURL = 'productos.json';

// Función para cargar el catálogo de productos desde el JSON
async function cargarCatalogo() {
  try {
    const response = await fetch(catalogoURL);
    if (!response.ok) {
      throw new Error('No se pudo cargar el catálogo de productos.');
    }
    const data = await response.json();
    catalogoProductos = data;
    generarCatalogo();
  } catch (error) {
    console.error('Error al cargar el catálogo:', error);
    mostrarErrorCatalogo();
  }
}

function mostrarErrorCatalogo() {
  let catalogoContainer = document.getElementById('catalogoProductos');
  catalogoContainer.innerHTML = '<p>Error al cargar el catálogo. Inténtalo de nuevo más tarde.</p>';
}

cargarCatalogo();


let catalogoProductos = [
  {
    nombre: "Producto 1",
    precio: 1000,
    stock: 5,
    imagen: "img/foto1.jpg"
  },
  {
    nombre: "Producto 2",
    precio: 2000,
    stock: 3,
    imagen: "img/foto2.jpg"
  },
  {
    nombre: "Producto 3",
    precio: 2000,
    stock: 3,
    imagen: "img/foto3.jpg"
  },
  {
    nombre: "Producto 4",
    precio: 2000,
    stock: 3,
    imagen: "img/foto4.jpg"
  },
  {
    nombre: "Producto 5",
    precio: 2000,
    stock: 3,
    imagen: "img/foto5.jpg"
  },
  {
    nombre: "Producto 6",
    precio: 2000,
    stock: 3,
    imagen: "img/foto6.jpg"
  },
  {
    nombre: "Producto 7",
    precio: 2000,
    stock: 3,
    imagen: "img/foto7.jpg"
  },
  {
    nombre: "Producto 8",
    precio: 2000,
    stock: 3,
    imagen: "img/foto8.jpg"
  },
  {
    nombre: "Producto 9",
    precio: 2000,
    stock: 3,
    imagen: "img/foto9.jpg"
  },
  
];

let carritoItems = [];



// Función para generar el catálogo de productos
function generarCatalogo() {
  let catalogoContainer = document.getElementById('catalogoProductos');
  catalogoContainer.innerHTML = '';

  catalogoProductos.forEach((producto, index) => {
    let productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');

    let imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    let nombre = document.createElement('p');
    nombre.textContent = producto.nombre;

    let precio = document.createElement('p');
    precio.textContent = `Precio: $${producto.precio}`;

    let stock = document.createElement('p');
    stock.textContent = `Stock: ${producto.stock}`;

    let agregarBtn = document.createElement('button');
    agregarBtn.textContent = 'Agregar al carrito';

    if (producto.stock <= 0) {
      agregarBtn.disabled = true;
      agregarBtn.textContent = 'Sin stock';
    } else {
      agregarBtn.addEventListener('click', () => agregarAlCarrito(index));
    }

    productoDiv.appendChild(imagen);
    productoDiv.appendChild(nombre);
    productoDiv.appendChild(precio);
    productoDiv.appendChild(stock);
    productoDiv.appendChild(agregarBtn);

    catalogoContainer.appendChild(productoDiv);
  });
}

// Función para buscar un producto en el carrito
function buscarProductoEnCarrito(producto) {
  return carritoItems.findIndex((item) => item.nombre === producto.nombre);
}

/// Función para agregar un producto al carrito
function agregarAlCarrito(index) {
  let producto = catalogoProductos[index];
  let productoEnCarrito = carritoItems.find(
    (item) => item.nombre === producto.nombre && item.precio === producto.precio
  );

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
    producto.stock--;
  } else {
    carritoItems.push({ ...producto, cantidad: 1 });
    producto.stock--;
  }

  generarCatalogo();
  generarCarrito();
}

// Función para generar el contenido del carrito
function generarCarrito() {
  let carritoContainer = document.getElementById('carritoItems');
  carritoContainer.innerHTML = '';

  let subtotal = 0;
  carritoItems.forEach((producto) => {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    let nombre = document.createElement('p');
    nombre.textContent = producto.nombre;

    let precio = document.createElement('p');
    precio.textContent = `Precio: $${producto.precio}`;

    let cantidad = document.createElement('p');
    cantidad.textContent = `Cantidad: ${producto.cantidad}`;

    let eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'Eliminar';
    eliminarBtn.addEventListener('click', () => eliminarDelCarrito(producto));

    itemDiv.appendChild(nombre);
    itemDiv.appendChild(precio);
    itemDiv.appendChild(cantidad);
    itemDiv.appendChild(eliminarBtn);

    carritoContainer.appendChild(itemDiv);

    subtotal += producto.precio * producto.cantidad; // Multiplicar precio por cantidad para cada producto en el carrito
  });

  let subtotalElement = document.getElementById('subtotal');
  subtotalElement.textContent = `Subtotal: $${subtotal}`;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(producto) {
  let index = carritoItems.indexOf(producto);
  if (index > -1) {
    carritoItems.splice(index, 1);
    producto.stock++;
    generarCatalogo();
    generarCarrito();
  }
}

// Función realizar la compra
function comprar() {
  let total = carritoItems.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0);

  if (total > 5000) {
    let cuotas = Number(prompt("¿En cuántas cuotas desea pagar? (3 sin interés)"));

    if (!isNaN(cuotas) && cuotas >= 1) {
      let valorCuota = total / cuotas;
      alert(`¡Compra exitosa!\nTotal de la compra: $${total}\nValor de cada cuota: $${valorCuota.toFixed(2)}`);
      carritoItems = [];
      generarCatalogo();
      generarCarrito();
    } else {
      alert("Ingrese un número válido de cuotas.");
    }
  } else {
    alert(`¡Compra exitosa!\nMonto de la compra: $${total}`);
    carritoItems = [];
    generarCatalogo();
    generarCarrito();
  }
}

// Evento botón de comprar
let btnComprar = document.getElementById('btnComprar');
btnComprar.addEventListener('click', () => {
  if (carritoItems.length > 0) {
    comprar();
  } else {
    alert("No hay productos en el carrito. Agrega productos antes de comprar.");
  }
});

generarCatalogo();
generarCarrito();

//Evento boton Light y Dark mode
//dark light mode

let boton = document.getElementById('mode');
let contenedor = document.getElementById('main');
let currentMode = localStorage.getItem('mode') || 'light';
document.body.className = currentMode;
boton.innerText = currentMode === 'light' ? 'Dark Mode' : 'Light Mode';

boton.onclick = () => {
  if (currentMode === 'light') {
    contenedor.classList.replace('light', 'dark');
    document.body.className = 'dark';
    boton.innerText = 'Light Mode';
    currentMode = 'dark';
  } else {
    contenedor.classList.replace('dark', 'light');
    document.body.className = 'light';
    boton.innerText = 'Dark Mode';
    currentMode = 'light';
  }
  localStorage.setItem('mode', currentMode);
};
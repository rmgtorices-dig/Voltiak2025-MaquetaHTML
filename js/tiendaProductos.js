// Array de productos de la tienda
const productos = [
    {
        id: 1,
        nombre: "AirFree",
        categoria: "ventiladores-industriales",
        categoriaNombre: "Ventiladores Industriales",
        imagen: "./img/productos/AIRFREE.png",
        alt: "AirFree"
    },
    {
        id: 2,
        nombre: "Notus",
        categoria: "ventiladores-industriales",
        categoriaNombre: "Ventiladores Industriales",
        imagen: "./img/productos/NOTUS1.png",
        alt: "Notus"
    },
    {
        id: 3,
        nombre: "Classic Home",
        categoria: "ventiladores-evaporativos",
        categoriaNombre: "Ventiladores Evaporativos",
        imagen: "./img/productos/12.png",
        alt: "Classic Home"
    },
    {
        id: 4,
        nombre: "AirCool",
        categoria: "ventiladores-industriales",
        categoriaNombre: "Ventiladores Industriales",
        imagen: "./img/productos/AIRCOOL.png",
        alt: "AirCool"
    },
    {
        id: 5,
        nombre: "Classic R XL",
        categoria: "ventiladores-evaporativos",
        categoriaNombre: "Ventiladores Evaporativos",
        imagen: "./img/productos/roller-clim-560-x-560@3x.png",
        alt: "Classic R XL"
    },
    {
        id: 6,
        nombre: "Eurus III",
        categoria: "ventiladores-industriales",
        categoriaNombre: "Ventiladores Industriales",
        imagen: "./img/productos/Eurus II_07_Aspas negras.png",
        alt: "Eurus III"
    },
    {
        id: 7,
        nombre: "Eurus III",
        categoria: "ventiladores-industriales",
        categoriaNombre: "Ventiladores Industriales",
        imagen: "./img/productos/png E3.png",
        alt: "Eurus III"
    }
];

// Función para renderizar un producto
function renderizarProducto(producto) {
    return `
        <a
            class="product-card store-product-card"
            data-category="${producto.categoria}"
        >
            <div class="store-product-image-wrapper">
                <img
                    src="${producto.imagen}"
                    alt="${producto.alt}"
                    class="store-product-image"
                    loading="lazy"
                    decoding="async"
                />
                <button
                    class="store-product-cart-btn"
                    aria-label="Agregar al carrito"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.74181 20.5545C4.94143 22 7.17414 22 11.6395 22H12.3607C16.8261 22 19.0589 22 20.2585 20.5545M3.74181 20.5545C2.54219 19.1091 2.95365 16.9146 3.77657 12.5257C4.36179 9.40452 4.65441 7.84393 5.7653 6.92196M3.74181 20.5545C3.74181 20.5545 3.74181 20.5545 3.74181 20.5545ZM20.2585 20.5545C21.4581 19.1091 21.0466 16.9146 20.2237 12.5257C19.6385 9.40452 19.3459 7.84393 18.235 6.92196M20.2585 20.5545C20.2585 20.5545 20.2585 20.5545 20.2585 20.5545ZM18.235 6.92196C17.1241 6 15.5363 6 12.3607 6H11.6395C8.46398 6 6.8762 6 5.7653 6.92196M18.235 6.92196C18.235 6.92196 18.235 6.92196 18.235 6.92196ZM5.7653 6.92196C5.7653 6.92196 5.7653 6.92196 5.7653 6.92196Z"
                            stroke="white"
                            stroke-width="2.5"
                            fill="none"
                        ></path>
                    </svg>
                </button>
            </div>
            <div class="store-product-content">
                <p class="store-product-category">
                    ${producto.categoriaNombre}
                </p>
                <h3 class="store-product-name">
                    ${producto.nombre}
                </h3>
            </div>
        </a>
    `;
}

// Función para renderizar todos los productos de forma optimizada
function renderizarProductos(productosArray) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    // Usar requestAnimationFrame para optimizar el renderizado
    requestAnimationFrame(() => {
        // Crear fragmento de documento para mejor rendimiento
        const fragment = document.createDocumentFragment();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = productosArray.map(producto => renderizarProducto(producto)).join('');
        
        // Mover todos los nodos al fragmento
        while (tempDiv.firstChild) {
            fragment.appendChild(tempDiv.firstChild);
        }
        
        // Limpiar y agregar de una vez
        productsGrid.innerHTML = '';
        productsGrid.appendChild(fragment);
    });
}

// Variable para almacenar el filtro actual y evitar re-renderizados innecesarios
let filtroActual = 'todos';

// Función para filtrar productos por categoría
function filtrarProductos(categoria) {
    // Evitar re-renderizado si el filtro es el mismo
    if (filtroActual === categoria) return;
    
    filtroActual = categoria;
    
    if (categoria === 'todos') {
        renderizarProductos(productos);
    } else {
        const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
        renderizarProductos(productosFiltrados);
    }
}

// Inicializar productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar productos iniciales
    renderizarProductos(productos);
    
    // Agregar event listeners a los botones de filtro
    const filterButtons = document.querySelectorAll('.store-filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoria = this.getAttribute('data-filter');
            
            // Evitar procesamiento si ya está activo
            if (this.classList.contains('store-filter-btn-active')) return;
            
            // Remover clase activa de todos los botones
            filterButtons.forEach(btn => {
                btn.classList.remove('store-filter-btn-active');
                btn.classList.add('store-filter-btn-inactive');
            });
            
            // Agregar clase activa al botón clickeado
            this.classList.remove('store-filter-btn-inactive');
            this.classList.add('store-filter-btn-active');
            
            // Filtrar productos
            filtrarProductos(categoria);
        });
    });
});

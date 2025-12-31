// Inicializar animaciones
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Menú Móvil
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#000000'; 
        navLinks.style.padding = '30px';
        navLinks.style.borderTop = '1px solid #222';
    } else {
        navLinks.style.display = 'none';
    }
});

// Efecto Scroll Navbar
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.padding = '10px 0';
        nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        nav.style.padding = '15px 0';
        nav.style.boxShadow = 'none';
    }
});

// Cerrar menú al dar clic en enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            navLinks.style.display = 'none';
            navLinks.classList.remove('active');
        }
    });
});

// --- LÓGICA DE GALERÍA NAVEGABLE (LIGHTBOX) ---

let currentIndex = 0; // Índice de la imagen actual
const imagesList = []; // Array para guardar info de las imágenes

// 1. Recopilar todas las imágenes al cargar
const projectCards = document.querySelectorAll('.project-item');

projectCards.forEach((card, index) => {
    const img = card.querySelector('img');
    const title = card.querySelector('h4').innerText;
    
    // Guardamos la info en el array
    imagesList.push({
        src: img.src,
        title: title
    });

    // Evento click para abrir esta imagen específica
    card.addEventListener('click', function() {
        openModal(index);
    });
});

// Elementos del Modal
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("imgExpanded");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close-modal");

// Función para abrir el modal en una posición específica
function openModal(index) {
    currentIndex = index;
    updateModalContent();
    modal.style.display = "flex";
}

// Función para actualizar la imagen y texto
function updateModalContent() {
    const currentImage = imagesList[currentIndex];
    modalImg.src = currentImage.src;
    captionText.innerHTML = currentImage.title;
}

// Función para cambiar de diapositiva (Next/Prev)
window.changeSlide = function(n) {
    currentIndex += n;
    
    // Lógica de bucle infinito
    if (currentIndex >= imagesList.length) {
        currentIndex = 0; // Volver al inicio
    } else if (currentIndex < 0) {
        currentIndex = imagesList.length - 1; // Ir al final
    }
    
    updateModalContent();
}

// Cerrar Modal
closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
});

// Cerrar clicando fuera
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// --- NAVEGACIÓN CON TECLADO ---
document.addEventListener('keydown', function(e) {
    // Solo si el modal está abierto
    if (modal.style.display === "flex") {
        if (e.key === "ArrowLeft") {
            changeSlide(-1); // Flecha Izquierda
        } else if (e.key === "ArrowRight") {
            changeSlide(1);  // Flecha Derecha
        } else if (e.key === "Escape") {
            modal.style.display = "none"; // Tecla Escape para cerrar
        }
    }
});
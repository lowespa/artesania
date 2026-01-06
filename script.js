// script.js - Funcionalidades para la landing page de artesanías

// Configuración
const CONFIG = {
    animationDelay: 100, // Milisegundos entre animaciones escalonadas
    scrollOffset: 100, // Offset para animaciones al hacer scroll
};

// Elementos a animar
const elementosAnimables = [
    // Identidad cultural
    { selector: '#icono1', delay: 0 },
    { selector: '#icono2', delay: 200 },
    { selector: '#icono3', delay: 400 },
    { selector: '#identidad-img', delay: 0 },
    
    // Galería de productos
    { selector: '#producto1', delay: 0 },
    { selector: '#producto2', delay: 100 },
    { selector: '#producto3', delay: 200 },
    { selector: '#producto4', delay: 300 },
    
    // Artesanos
    { selector: '#artesano1', delay: 0 },
    { selector: '#artesano2', delay: 150 },
    { selector: '#artesano3', delay: 300 },
    
    // Sustentabilidad
    { selector: '#sust-icono1', delay: 0 },
    { selector: '#sust-icono2', delay: 150 },
    { selector: '#sust-icono3', delay: 300 },
    { selector: '#sustentabilidad-texto', delay: 450 },
];

// Botón flotante de contacto
const contactBtn = document.getElementById('contactBtn');
const contactOptions = document.getElementById('contactOptions');
let contactMenuOpen = false;

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de artesanías autóctonas cargada');
    
    // Inicializar funcionalidades
    initFloatingContact();
    initScrollAnimations();
    initProductHoverEffects();
    initSmoothScrolling();
    initHeroAnimation();
    
    // Verificar elementos en vista al cargar
    checkElementsInView();
});

// ========== FUNCIONES PRINCIPALES ==========

// 1. Botón flotante de contacto
function initFloatingContact() {
    if (!contactBtn || !contactOptions) return;
    
    contactBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        contactMenuOpen = !contactMenuOpen;
        
        if (contactMenuOpen) {
            contactOptions.classList.add('active');
            contactBtn.innerHTML = '<i class="fas fa-times"></i>';
            contactBtn.setAttribute('aria-label', 'Cerrar opciones de contacto');
        } else {
            contactOptions.classList.remove('active');
            contactBtn.innerHTML = '<i class="fas fa-comments"></i>';
            contactBtn.setAttribute('aria-label', 'Abrir opciones de contacto');
        }
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!contactBtn.contains(e.target) && !contactOptions.contains(e.target) && contactMenuOpen) {
            contactOptions.classList.remove('active');
            contactBtn.innerHTML = '<i class="fas fa-comments"></i>';
            contactBtn.setAttribute('aria-label', 'Abrir opciones de contacto');
            contactMenuOpen = false;
        }
    });
    
    // Cerrar menú al presionar Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactMenuOpen) {
            contactOptions.classList.remove('active');
            contactBtn.innerHTML = '<i class="fas fa-comments"></i>';
            contactBtn.setAttribute('aria-label', 'Abrir opciones de contacto');
            contactMenuOpen = false;
        }
    });
}

// 2. Animaciones al hacer scroll
function initScrollAnimations() {
    // Observador de intersección para animaciones
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Añadir clase 'visible' después de un pequeño delay
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        
                        // Animación escalonada para elementos específicos
                        if (entry.target.id === 'icono1') {
                            animateStaggered('#icono1, #icono2, #icono3', 200);
                        }
                        
                        if (entry.target.id === 'producto1') {
                            animateStaggered('.producto-card', 100);
                        }
                        
                        if (entry.target.id === 'artesano1') {
                            animateStaggered('.artesano-card', 150);
                        }
                        
                        if (entry.target.id === 'sust-icono1') {
                            animateStaggered('.sust-icono', 150);
                        }
                    }, CONFIG.animationDelay);
                    
                    // Dejar de observar después de animar
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            root: null,
            rootMargin: `0px 0px -${CONFIG.scrollOffset}px 0px`,
            threshold: 0.1
        }
    );
    
    // Observar todos los elementos animables
    elementosAnimables.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
            observer.observe(element);
        }
    });
}

// 3. Efectos hover en productos
function initProductHoverEffects() {
    const productCards = document.querySelectorAll('.producto-card');
    
    productCards.forEach(card => {
        // Efecto al pasar el mouse
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--sombra-elevada)';
            
            // Efecto en la imagen
            const img = this.querySelector('.producto-img img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
            
            // Mostrar overlay
            const overlay = this.querySelector('.producto-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        // Efecto al quitar el mouse
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--sombra-suave)';
            
            // Restaurar imagen
            const img = this.querySelector('.producto-img img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
            
            // Ocultar overlay
            const overlay = this.querySelector('.producto-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
        
        // Accesibilidad: teclado
        card.addEventListener('focus', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--sombra-elevada)';
        });
        
        card.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--sombra-suave)';
        });
    });
}

// 4. Scroll suave para enlaces internos
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo para enlaces internos (no incluye #)
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Calcular posición con offset para el header
                    const headerHeight = 0; // Ajustar si hay header fijo
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú de contacto si está abierto
                    if (contactMenuOpen) {
                        contactOptions.classList.remove('active');
                        contactBtn.innerHTML = '<i class="fas fa-comments"></i>';
                        contactMenuOpen = false;
                    }
                }
            }
        });
    });
}

// 5. Animación del hero
function initHeroAnimation() {
    // La animación del hero ya está en CSS (fadeInUp y heroZoom)
    // Aquí podemos añadir interacciones adicionales si son necesarias
    
    // Efecto parallax en hero (opcional)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-bg-img');
        
        if (hero) {
            // Efecto parallax suave
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0px, ${rate}px, 0px) scale(1.05)`;
        }
    });
}

// ========== FUNCIONES AUXILIARES ==========

// Animación escalonada para múltiples elementos
function animateStaggered(selector, delay) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * delay);
    });
}

// Verificar elementos en vista al cargar la página
function checkElementsInView() {
    const checkElement = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - CONFIG.scrollOffset) &&
            rect.bottom >= 0
        );
    };
    
    elementosAnimables.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element && checkElement(element)) {
            // Si el elemento ya está en vista, animarlo inmediatamente
            setTimeout(() => {
                element.classList.add('visible');
            }, item.delay);
        }
    });
}

// Efecto de carga progresiva para imágenes (Lazy Loading mejorado)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores antiguos
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
        });
    }
}

// Contador de impacto (para la sección de sustentabilidad)
function initImpactCounter() {
    const impactElement = document.querySelector('.sustentabilidad-texto strong');
    
    if (impactElement) {
        // Valores iniciales
        const data = {
            comunidades: 0,
            artesanos: 0,
            tecnicas: 0
        };
        
        // Valores finales
        const finalData = {
            comunidades: 12,
            artesanos: 150,
            tecnicas: 8
        };
        
        // Animación de contadores (si se desea implementar)
        // Esta es una funcionalidad opcional que se puede activar
    }
}

// Optimización de rendimiento para animaciones
function optimizeAnimations() {
    // Usar requestAnimationFrame para animaciones fluidas
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Código relacionado con scroll que requiere optimización
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Inicializar funcionalidades adicionales
window.addEventListener('load', function() {
    // Lazy loading para imágenes
    initLazyLoading();
    
    // Optimización de animaciones
    optimizeAnimations();
    
    // Contador de impacto (opcional)
    // initImpactCounter();
    
    // Asegurar que el botón de contacto sea accesible
    if (contactBtn) {
        contactBtn.setAttribute('aria-label', 'Abrir opciones de contacto');
        contactBtn.setAttribute('aria-expanded', 'false');
        
        // Actualizar estado ARIA cuando se abre/cierra
        contactBtn.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
        });
    }
});

// Manejo de errores en imágenes
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn(`Error al cargar imagen: ${e.target.src}`);
        // Opcional: mostrar una imagen de placeholder
        // e.target.src = 'placeholder.jpg';
    }
}, true);

// Exportar funciones principales para uso en consola (debug)
window.RaicesVivas = {
    initFloatingContact,
    initScrollAnimations,
    initProductHoverEffects,
    toggleContactMenu: function() {
        if (contactBtn) contactBtn.click();
    }
};
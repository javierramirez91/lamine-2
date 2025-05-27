// Configuració global de l'aplicació
const CONFIG = {
    API_KEY: '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',
    API_URL: 'https://openrouter.ai/api/v1/chat/completions',
    MODEL: 'google/gemma-3n-e4b-it:free',
    MAX_TOKENS: 1000,
    TEMPERATURE: 0.7
};

// Gestió del tema
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateToggleButton();
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateToggleButton();
    }

    updateToggleButton() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = this.theme === 'light' ? 'lucide-moon' : 'lucide-sun';
            }
        }
    }
}

// Gestió de l'scroll suau
class SmoothScroll {
    static init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Gestió del loading screen
class LoadingManager {
    static show() {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.style.display = 'flex';
        }
    }

    static hide() {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }
}

// Gestió de la navegació
class NavigationManager {
    static init() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });

        // Gestió del menú mòbil
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });

            // Tancar menú en clicar enllaç
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                });
            });
        }
    }
}

// Gestió d'animacions
class AnimationManager {
    static init() {
        // Inicialitzar AOS si està disponible
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100
            });
        }

        // Animacions personalitzades
        this.initCounters();
        this.initParallax();
    }

    static initCounters() {
        const counters = document.querySelectorAll('.counter');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    static initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Gestió d'errors
class ErrorHandler {
    static show(message, type = 'error') {
        const errorContainer = document.getElementById('error-container') || this.createErrorContainer();
        
        const errorElement = document.createElement('div');
        errorElement.className = `error-message error-${type}`;
        errorElement.innerHTML = `
            <i class="lucide-alert-circle"></i>
            <span>${message}</span>
            <button class="error-close" onclick="this.parentElement.remove()">
                <i class="lucide-x"></i>
            </button>
        `;

        errorContainer.appendChild(errorElement);

        // Auto-remove després de 5 segons
        setTimeout(() => {
            if (errorElement.parentElement) {
                errorElement.remove();
            }
        }, 5000);
    }

    static createErrorContainer() {
        const container = document.createElement('div');
        container.id = 'error-container';
        container.className = 'error-container';
        document.body.appendChild(container);
        return container;
    }
}

// Inicialització de l'aplicació
class App {
    constructor() {
        this.themeManager = new ThemeManager();
        this.chatbot = null;
        this.contentLoader = null;
    }

    async init() {
        try {
            LoadingManager.show();
            
            // Inicialitzar components
            NavigationManager.init();
            SmoothScroll.init();
            AnimationManager.init();

            // Inicialitzar chatbot
            if (typeof Chatbot !== 'undefined') {
                this.chatbot = new Chatbot();
                await this.chatbot.init();
            }

            // Inicialitzar carregador de contingut
            if (typeof ContentLoader !== 'undefined') {
                this.contentLoader = new ContentLoader();
                await this.contentLoader.init();
            }

            // Event listeners
            this.setupEventListeners();

            LoadingManager.hide();
            
        } catch (error) {
            console.error('Error inicialitzant l\'aplicació:', error);
            ErrorHandler.show('Error inicialitzant l\'aplicació. Si us plau, recarrega la pàgina.');
            LoadingManager.hide();
        }
    }

    setupEventListeners() {
        // Toggle tema
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.themeManager.toggle();
            });
        }

        // Gestió de formularis
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Gestió personalitzada de formularis aquí
            });
        });

        // Gestió de botons CTA
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.getAttribute('href') === '#chat') {
                    e.preventDefault();
                    this.scrollToChat();
                }
            });
        });
    }

    scrollToChat() {
        const chatSection = document.getElementById('chat');
        if (chatSection) {
            chatSection.scrollIntoView({ behavior: 'smooth' });
            
            // Focus en el input del chat
            setTimeout(() => {
                const chatInput = document.getElementById('chat-input');
                if (chatInput) {
                    chatInput.focus();
                }
            }, 500);
        }
    }
}

// Inicialitzar l'aplicació quan el DOM estigui carregat
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
    window.app = app; // Fer l'app accessible globalment
});

// Gestió d'errors globals
window.addEventListener('error', (e) => {
    console.error('Error global:', e.error);
    ErrorHandler.show('S\'ha produït un error inesperat.');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rebutjada:', e.reason);
    ErrorHandler.show('Error de connexió. Si us plau, comprova la teva connexió a internet.');
});

// Exportar per a ús global
window.CONFIG = CONFIG;
window.ErrorHandler = ErrorHandler;

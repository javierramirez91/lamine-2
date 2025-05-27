// Configuració global de l'aplicació
const CONFIG = {
    API_KEY: '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',
    API_URL: 'https://openrouter.ai/api/v1/chat/completions',
    MODEL: 'google/gemma-3n-e4b-it:free',
    MAX_TOKENS: 1000,
    TEMPERATURE: 0.7
};

console.log('app.js carregat');

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
        this.contentLoader = new ContentLoader();
    }

    async init() {
        try {
            LoadingManager.show();
            
            // Inicialitzar ContentLoader primer per tenir les dades disponibles
            await this.contentLoader.init();

            // Inicialitzar components UI
            NavigationManager.init();
            SmoothScroll.init();
            AnimationManager.init();

            // Carregar contingut dinàmic a les seccions
            this.populateSubjectiveCriteria();
            this.populatePracticalExamples();
            this.populateSolvencyDetails();

            // Inicialitzar chatbot
            if (typeof Chatbot !== 'undefined') {
                this.chatbot = new Chatbot(this.contentLoader);
                await this.chatbot.init();
            }

            // Event listeners
            this.setupEventListeners();

            // Activar la secció inicial (home per defecte)
            this.showSection('home'); 

            LoadingManager.hide();
            
        } catch (error) {
            console.error('Error inicialitzant l\'aplicació:', error);
            ErrorHandler.show('Error crític inicialitzant l\'aplicació. Si us plau, recarrega la pàgina o contacta suport.');
            LoadingManager.hide();
        }
    }

    populateSubjectiveCriteria() {
        const container = document.querySelector('.criteria-detailed-list');
        if (!container || !this.contentLoader.isContentLoaded()) return;

        const subjectiveCriteriaData = this.contentLoader.getCriteriaInfo('subjectius');
        if (!subjectiveCriteriaData || !subjectiveCriteriaData.subCriterisTextGeneral) {
            container.innerHTML = '<p>Informació no disponible actualment.</p>';
            return;
        }

        let html = '';
        subjectiveCriteriaData.subCriterisTextGeneral.forEach(criterion => {
            html += `
                <div class="criteria-item" data-aos="fade-up">
                    <h4>${criterion.nom}</h4>
                    <p>${criterion.descripcio}</p>
            `;
            if (criterion.subExemples && criterion.subExemples.length > 0) {
                html += '<ul>';
                criterion.subExemples.forEach(sub => {
                    html += `<li><strong>${sub.nom || 'Sub-criteri'}:</strong> ${sub.descripcio || sub.desc} (${sub.fins_a_punts ? sub.fins_a_punts + ' pts' : 'N/A'})</li>`;
                });
                html += '</ul>';
            }
            if (criterion.infoAddicionalSource && this.contentLoader.legalContent.criterisAdjudicacio.tipus.subjectius.textosClau?.[criterion.infoAddicionalSource]) {
                html += `<div class="additional-info-box">
                            <h5>Informació Addicional Clau:</h5>
                            <p>${this.contentLoader.legalContent.criterisAdjudicacio.tipus.subjectius.textosClau[criterion.infoAddicionalSource].substring(0, 250)}...</p>
                            <button class="btn-text" onclick="app.showFullTextModal(\'${criterion.infoAddicionalSource}\', \'criterisAdjudicacio.tipus.subjectius.textosClau\')">Llegir més →</button>
                         </div>`;
            }
            html += '</div>';
        });
        container.innerHTML = html;
    }

    populatePracticalExamples() {
        const container = document.querySelector('.practical-examples-quality');
        if (!container || !this.contentLoader.isContentLoaded()) return;

        const examplesData = this.contentLoader.getPracticalQualityCriteria();
        if (!examplesData || !examplesData.exemplesDetallats) {
            container.innerHTML = '<p>Exemples no disponibles actualment.</p>';
            return;
        }
        
        container.innerHTML = `<p class="intro-text">${examplesData.introduccio}</p>`;
        if(examplesData.aspectesValorar && examplesData.aspectesValorar.length > 0){
            let aspectsHtml = '<h5>Aspectes a valorar clau:</h5><ul>';
            examplesData.aspectesValorar.forEach(aspect => aspectsHtml += `<li>${aspect}</li>`);
            aspectsHtml += '</ul>';
            container.innerHTML += aspectsHtml;
        }

        examplesData.exemplesDetallats.forEach(example => {
            let exampleHtml = `
                <div class="example-card" data-aos="fade-up">
                    <h5>${example.ambit}</h5>
                    ${example.exempleContracte ? `<p><strong>Exemple Contracte:</strong> ${example.exempleContracte}</p>` : ''}
                    ${example.criteriDesc ? `<p><em>${example.criteriDesc.replace(/---/g, '[X]')}</em></p>` : ''}
            `;
            if (example.desglossament && example.desglossament.length > 0) {
                exampleHtml += '<ul>';
                example.desglossament.forEach(item => {
                    exampleHtml += `<li>${item.replace(/---/g, '[Y]')}</li>`;
                });
                exampleHtml += '</ul>';
            }
            if (example.subseccions && example.subseccions.length > 0) {
                example.subseccions.forEach(sub => {
                    exampleHtml += `<h6>${sub.titolSub.replace(/---/g, '[X]')}</h6><ul>`;
                    sub.desglossament.forEach(item => {
                        exampleHtml += `<li>${item.replace(/---/g, '[Z]')}</li>`;
                    });
                    exampleHtml += '</ul>';
                });
            }
            exampleHtml += '</div>';
            container.innerHTML += exampleHtml;
        });
    }

    populateSolvencyDetails() {
        const container = document.querySelector('.solvency-details-content');
        if (!container || !this.contentLoader.isContentLoaded()) return;

        const solvencyData = this.contentLoader.getSolvencyInfo();
        if (!solvencyData) {
            container.innerHTML = '<p>Informació de solvència no disponible actualment.</p>';
            return;
        }

        let html = `<p class="intro-text">${solvencyData.introduccio}</p>`;

        // Solvència Econòmica
        if (solvencyData.economica) {
            html += `<div class="solvency-category" data-aos="fade-up">
                        <h3>${solvencyData.economica.titol}</h3>
                        <p>${solvencyData.economica.descripcio}</p>
                        <ul>`;
            solvencyData.economica.consideracionsVolumNegoci.forEach(cons => html += `<li>${cons}</li>`);
            html += `</ul>
                    <div class="example-box">
                        <strong>Exemple (Volum de Negoci):</strong> ${solvencyData.economica.exempleCalculVolumNegoci}
                    </div>
                    <h4>Altres Mitjans de Solvència Econòmica:</h4>
                    <ul>`;
            solvencyData.economica.altresMitjansEconomica.forEach(mig => {
                html += `<li><strong>${mig.nom}:</strong> ${mig.detall}</li>`;
            });
            html += '</ul></div>';
        }

        // Solvència Tècnica
        if (solvencyData.tecnica) {
            html += `<div class="solvency-category" data-aos="fade-up">
                        <h3>${solvencyData.tecnica.titol}</h3>
                        <p>${solvencyData.tecnica.descripcio}</p>
                        <h4>Mitjans per Tipus de Contracte:</h4>
                        <ul>`;
            solvencyData.tecnica.mitjansPerTipusContracte.forEach(item => html += `<li>${item}</li>`);
            html += '</ul>';
            
            const techSubSections = ['experienciaEmpresa', 'empresesNovaCreacio', 'personalAdscritSolvencia', 'certificatsQualitatSolvencia', 'mostresProducte', 'mitjansMaterialsMinims'];
            techSubSections.forEach(subKey => {
                const subSection = solvencyData.tecnica[subKey];
                if(subSection) {
                    html += `<div class="solvency-subsection">
                                <h5>${subSection.titol}</h5>
                                <p>${subSection.detall || subSection.descripcio}</p>`;
                    if (subKey === 'certificatsQualitatSolvencia') {
                        html += `<p><em>Regulació LCSP:</em> ${subSection.regulacioLCSP}</p>
                                 <p><em>Exposició Motius LCSP:</em> ${subSection.exposicioMotiusLCSP}</p>
                                 <p><em>Regla General vs. Excepció:</em> ${subSection.reglaGeneralVsExcepcio}</p>
                                 <div class="additional-info-box">
                                     <h6>Article Recomanat: ${subSection.articleFJVazquezMatilla.titol}</h6>
                                     <p><strong>Autor:</strong> ${subSection.articleFJVazquezMatilla.autor}</p>
                                     <p><em>${subSection.articleFJVazquezMatilla.resum.substring(0,150)}...</em></p>
                                     <button class="btn-text" onclick="app.showFullTextModal('solvencia.tecnica.certificatsQualitatSolvencia.articleFJVazquezMatilla', null, true)">Llegir Punts Clau →</button>
                                 </div>`;
                    }
                    html += '</div>';
                }
            });
             html += '</div>';
        }
        
        // Foment PYMEs
        if (solvencyData.fomentPYMES) {
            html += `<div class="solvency-category" data-aos="fade-up">
                        <h3>${solvencyData.fomentPYMES.titol}</h3>
                        <p><strong>Importància PYMEs:</strong> ${solvencyData.fomentPYMES.importanciaPYMES}</p>
                        <p><strong>LCSP Art. 1:</strong> ${solvencyData.fomentPYMES.lcspArt1}</p>
                        <p><strong>Llei Foment Empreses Emergents:</strong> ${solvencyData.fomentPYMES.lleiFomentEmpresesEmergents}</p>
                        <h5>Barreres i Reptes per a PYMEs:</h5>
                        <p>${solvencyData.fomentPYMES.barreresPYMES}</p>
                        <h5>Factors de Decisió Clau per a Empreses:</h5>
                        <ul>`;
            solvencyData.fomentPYMES.factorsDecisionEmpreses.forEach(factor => html += `<li>${factor}</li>`);
            html += `    </ul>
                        <p><strong>Impacte Certificats de Qualitat en PYMEs:</strong> ${solvencyData.fomentPYMES.impacteCertificatsQualitatEnPYMES}</p>
                    </div>`;
        }

        // Bones Pràctiques (Si no hi ha una secció específica per a elles)
        const bonesPractiques = this.contentLoader.getBonesPractiques();
        if (bonesPractiques) {
             html += `<div class="solvency-category" data-aos="fade-up">
                        <h3>${bonesPractiques.titol}</h3>
                        <ul>`;
            bonesPractiques.punts.forEach(punt => html += `<li>${punt}</li>`);
            html += '</ul></div>';
        }

        container.innerHTML = html;
    }
    
    showFullTextModal(contentPath, subPath = null, isArticle = false) {
        let contentToShow = "";
        let title = "Informació Detallada";

        try {
            let baseObject = this.contentLoader.legalContent;
            const pathParts = contentPath.split('.');
            let currentData = baseObject;
            for (const part of pathParts) {
                currentData = currentData[part];
                if (currentData === undefined) throw new Error('Ruta de contingut no vàlida');
            }
            
            if(isArticle && currentData.puntsClauArticle) { // Específic per a l'article de FJVazquezMatilla
                title = currentData.titol;
                contentToShow = "<h4>Punts Clau:</h4><ul>";
                currentData.puntsClauArticle.forEach(punt => {
                    contentToShow += `<li>${punt}</li>`;
                });
                contentToShow += "</ul>";
            } else if (subPath) { // Per a textos clau dins d'objectes
                 title = currentData.titol || "Detall";
                 contentToShow = currentData[subPath] || "Contingut no trobat.";
            } else if (typeof currentData === 'string') {
                contentToShow = currentData;
                // Intentar obtenir un títol més significatiu si és possible
                if (pathParts.length > 1) {
                    let parentData = baseObject;
                    for (let i = 0; i < pathParts.length -1; i++) parentData = parentData[pathParts[i]];
                    title = parentData.titol || parentData.nom || title;
                }
            } else if (currentData.descripcio) { // Si és un objecte amb descripció
                title = currentData.titol || currentData.nom || title;
                contentToShow = currentData.descripcio;
                 if(currentData.punts) contentToShow += "<ul>" + currentData.punts.map(p => `<li>${p}</li>`).join('') + "</ul>";
            } else {
                contentToShow = "Contingut no disponible en format de text simple.";
            }
        } catch (e) {
            console.error("Error obtenint contingut per modal: ", e);
            contentToShow = "Error al carregar el contingut.";
        }

        // Crear i mostrar el modal (implementació bàsica)
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close-btn">&times;</button>
            </div>
            <div class="modal-body">
                ${ typeof marked !== 'undefined' ? marked.parse(contentToShow) : contentToShow.replace(/\n/g, '<br>') }
            </div>
        `;
        
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay || e.target.classList.contains('modal-close-btn') || e.target.parentElement.classList.contains('modal-close-btn')) {
                document.body.removeChild(modalOverlay);
            }
        });
    }

    setupEventListeners() {
        // Toggle tema
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.themeManager.toggle();
            });
        }

        // Gestió de la navegació
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                if (sectionId) {
                    this.showSection(sectionId);
                }
            });
        });

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

    showSection(sectionId) {
        document.querySelectorAll('main > section').forEach(section => {
            section.classList.remove('active-section');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active-section');
        } else {
            const firstSection = document.querySelector('main > section');
            if (firstSection) firstSection.classList.add('active-section');
        }
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
    }

    showCriteriaTab(tabName) {
        document.querySelectorAll('.criteria-section .tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelectorAll('.criteria-section .tab-button').forEach(button => {
            button.classList.remove('active');
        });
        
        const tabContent = document.getElementById(`${tabName}-criteria`);
        if (tabContent) {
            tabContent.classList.add('active');
        }
        
        const clickedButton = event.target.closest('.tab-button');
        if(clickedButton) {
            clickedButton.classList.add('active');
        }
    }

    showLegalInfo() {
        if (this.chatbot) {
            this.scrollToChat();
            setTimeout(() => {
                this.chatbot.sendMessage('Explica\'m els articles clau de la LCSP sobre criteris d\'adjudicació');
            }, 500);
        }
    }

    showContractTypes() {
        if (this.chatbot) {
            this.scrollToChat();
            setTimeout(() => {
                this.chatbot.sendMessage('Quins són els diferents tipus de contractes segons la LCSP?');
            }, 500);
        }
    }

    showProcedures() {
        if (this.chatbot) {
            this.scrollToChat();
            setTimeout(() => {
                this.chatbot.sendMessage('Explica\'m els diferents procediments de contractació');
            }, 500);
        }
    }

    showTemplates() {
        alert('Funció de plantilles en desenvolupament. Pregunta a Lamine Yamal per models específics!');
    }

    showCalculator() {
        alert('Calculadora en desenvolupament. Pregunta a Lamine Yamal per ajuda amb càlculs!');
    }

    showCalendar() {
        alert('Calendari en desenvolupament. Pregunta a Lamine Yamal sobre terminis específics!');
    }

    scrollToChat() {
        const chatSection = document.getElementById('chat');
        if (chatSection) {
            chatSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                const chatInput = document.getElementById('chat-input');
                if (chatInput) {
                    chatInput.focus();
                }
            }, 500);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregat, inicialitzant aplicació...');
    const app = new App();
    app.init().then(() => {
        console.log("App inicialitzada completament.");
    }).catch(err => {
        console.error("Error final en la inicialització de l'App:", err);
    });
    window.app = app; 
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

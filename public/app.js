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
            
            await this.contentLoader.init();

            NavigationManager.init();
            SmoothScroll.init();
            // AnimationManager.init(); // Aquesta línia ja hauria d'estar comentada o eliminada.
                                    // La inicialització d'AOS es fa a main.js.

            this.populateSubjectiveCriteria();
            this.populatePracticalExamples();
            this.populateCCVComponents();
            this.populateSolvencyDetails();

            if (typeof Chatbot !== 'undefined') {
                this.chatbot = new Chatbot(this.contentLoader);
                await this.chatbot.init();
            } else {
                console.warn("La classe Chatbot no està definida globalment. El chatbot no s'inicialitzarà.");
            }

            this.setupEventListeners();
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

    populateCCVComponents() {
        const container = document.getElementById('ccv-components-list');
        if (!container) {
            console.warn('Element ccv-components-list no trobat.');
            return;
        }
        if (!this.contentLoader || !this.contentLoader.isContentLoaded()) {
            console.warn('ContentLoader no està llest per a populateCCVComponents');
            container.innerHTML = '<p>Informació de components CCV no disponible (ContentLoader no llest).</p>';
            return;
        }

        const ccvData = this.contentLoader.getCostCicloVidaInfo();
        if (!ccvData || !ccvData.components || ccvData.components.length === 0) {
            container.innerHTML = '<p>No hi ha informació detallada sobre els components del CCV disponible actualment.</p>';
            return;
        }

        let html = '<div class="criteria-grid">'; 
        ccvData.components.forEach(component => {
            html += `
                <div class="criteria-card">
                    <h4>${component.nom || 'Component CCV'}</h4>
                    <p>${component.detall || 'Detalls no disponibles.'}</p>
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
    }

    async populateSolvencyDetails() {
        if (!this.contentLoader || !this.contentLoader.isContentLoaded()) {
            console.warn('ContentLoader no està llest per a populateSolvencyDetails');
            return;
        }
        console.log("Populando detalls de solvència...");

        this.populateSolvencyEconomic();
        this.populateSolvencyTechnical();
        this.populateSolvencyGeneralNotes();

        // Assegurar que la primera sub-pestanya estigui activa si la pestanya de solvència es mostra per defecte
        // Això es gestiona millor quan es fa clic a la pestanya principal de Solvència
        // No obstant, si és la pestanya per defecte de tota la secció, es podria inicialitzar aquí.
        // De moment, la lògica de showCriteriaTab i showSolvencySubTab hauria de gestionar l'estat actiu inicial.
    }

    populateSolvencyEconomic() {
        const economicList = document.getElementById('solvency-economic-list');
        if (!economicList) {
            console.warn('Element solvency-economic-list no trobat.');
            return;
        }
        economicList.innerHTML = ''; // Netejar abans de popular

        const solvencyData = this.contentLoader.getSolvencyInfo('economic'); // Esperem que això retorni un array
        
        if (solvencyData && solvencyData.length > 0) {
            solvencyData.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${item.nom || 'Mitjà d\'acreditació'}:</strong> ${item.descripcio || 'Detalls no disponibles.'}`;
                if (item.articles) {
                    listItem.innerHTML += ` <small class="text-muted"><em>(Ref. LCSP: ${item.articles})</em></small>`;
                }
                economicList.appendChild(listItem);
            });
        } else {
            economicList.innerHTML = '<li>No hi ha informació disponible sobre solvència econòmica.</li>';
        }
    }

    populateSolvencyTechnical() {
        const technicalList = document.getElementById('solvency-technical-list');
        if (!technicalList) {
            console.warn('Element solvency-technical-list no trobat.');
            return;
        }
        technicalList.innerHTML = ''; // Netejar abans de popular

        const solvencyData = this.contentLoader.getSolvencyInfo('technical'); // Esperem que això retorni un array

        if (solvencyData && solvencyData.length > 0) {
            solvencyData.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${item.nom || 'Mitjà d\'acreditació'}:</strong> ${item.descripcio || 'Detalls no disponibles.'}`;
                if (item.articles) {
                    listItem.innerHTML += ` <small class="text-muted"><em>(Ref. LCSP: ${item.articles})</em></small>`;
                }
                technicalList.appendChild(listItem);
            });
        } else {
            technicalList.innerHTML = '<li>No hi ha informació disponible sobre solvència tècnica o professional.</li>';
        }
    }
    
    populateSolvencyGeneralNotes() {
        const notesContainer = document.getElementById('solvency-general-notes');
        if (!notesContainer) {
            console.warn('Element solvency-general-notes no trobat.');
            return;
        }
        notesContainer.innerHTML = ''; // Netejar

        const generalNotes = this.contentLoader.getSolvencyInfo('generalNotes'); // Esperem un array de notes o strings
        if (generalNotes && generalNotes.length > 0) {
            const list = document.createElement('ul');
            list.className = 'solvency-notes-list';
            generalNotes.forEach(note => {
                const listItem = document.createElement('li');
                listItem.textContent = note.text || note; // Si 'note' és un objecte amb propietat 'text' o un string directe
                list.appendChild(listItem);
            });
            notesContainer.appendChild(list);
        } else {
            // Opcional: notesContainer.innerHTML = '<p>No hi ha notes generals addicionals.</p>';
        }
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
        console.log(`Mostrant secció: ${sectionId}`);
        document.querySelectorAll('.main-content > section').forEach(section => {
            section.classList.remove('active-section');
        });
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active-section');
            // Opcional: scroll a la secció
            // targetSection.scrollIntoView({ behavior: 'smooth' }); 
        } else {
            console.warn(`Secció ${sectionId} no trobada.`);
        }

        // Actualitzar enllaç actiu a la navegació
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
    }

    showCriteriaTab(tabName, group = 'criteria') { // group per a futura expansió
        console.log(`Mostrant pestanya: ${tabName} del grup ${group}`);
        const wrapperId = `${group}-content-wrapper`; // e.g., criteria-content-wrapper
        const contentWrapper = document.querySelector(`.${wrapperId}`);

        if (!contentWrapper) {
            console.error(`Wrapper de contingut de pestanyes '${wrapperId}' no trobat.`);
            return;
        }

        // Amagar tots els continguts de pestanyes dins d'aquest wrapper
        contentWrapper.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Mostrar el contingut de la pestanya seleccionada
        const targetContentId = `${tabName}-criteria`; // e.g., automatic-criteria, solvency-criteria
        const targetContent = document.getElementById(targetContentId);
        if (targetContent) {
            targetContent.classList.add('active');
        } else {
            console.warn(`Contingut de pestanya ${targetContentId} no trobat.`);
        }

        // Actualitzar botó actiu dins del grup de pestanyes correcte
        const tabButtonsContainer = document.querySelector(`.${group}-tabs`); 
        if (tabButtonsContainer) {
            tabButtonsContainer.querySelectorAll('.tab-button').forEach(button => {
                button.classList.remove('active');
                // Comprovar si l'atribut onclick conté el tabName correcte
                const onclickAttr = button.getAttribute('onclick');
                if (onclickAttr && onclickAttr.includes(`showCriteriaTab('${tabName}'`)) {
                    button.classList.add('active');
                }
            });
        } else {
            console.warn(`Contenidor de botons de pestanyes '.${group}-tabs' no trobat.`);
        }
    }

    showSolvencySubTab(subTabName) {
        console.log(`Mostrant sub-pestanya de solvència: ${subTabName}`);
        const wrapper = document.querySelector('#solvency-criteria .solvency-sub-content-wrapper');
        if (!wrapper) {
            console.error("Wrapper de sub-contingut de solvència no trobat.");
            return;
        }

        // Amagar tots els sub-continguts
        wrapper.querySelectorAll('.solvency-sub-tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Mostrar el sub-contingut seleccionat
        const targetContent = document.getElementById(`solvency-${subTabName}-content`);
        if (targetContent) {
            targetContent.classList.add('active');
        } else {
            console.warn(`Sub-contingut de solvència solvency-${subTabName}-content no trobat.`);
        }

        // Actualitzar botó actiu de sub-pestanya
        const subTabButtonsContainer = document.querySelector('#solvency-criteria .solvency-sub-tabs');
        if (subTabButtonsContainer) {
            subTabButtonsContainer.querySelectorAll('.sub-tab-button').forEach(button => {
                button.classList.remove('active');
                const onclickAttr = button.getAttribute('onclick');
                if (onclickAttr && onclickAttr.includes(`showSolvencySubTab('${subTabName}'`)) {
                    button.classList.add('active');
                }
            });
        } else {
            console.warn("Contenidor de botons de sub-pestanyes de solvència no trobat.");
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

// Gestió d'errors globals
window.addEventListener('error', (e) => {
    console.error('Error global:', e.error);
    if (window.ErrorHandler && typeof window.ErrorHandler.show === 'function') {
        window.ErrorHandler.show('S\'ha produït un error inesperat.');
    }
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rebutjada:', e.reason);
    if (window.ErrorHandler && typeof window.ErrorHandler.show === 'function') {
        // Millorar el missatge per ser més específic si és possible
        let message = 'S\'ha produït un error asíncron o una promesa ha estat rebutjada.';
        if (e.reason && e.reason.message) {
            // Comprovar si és un error de xarxa típic
            if (e.reason.message.toLowerCase().includes('failed to fetch') || e.reason.message.toLowerCase().includes('networkerror')) {
                message = 'Error de xarxa. Comprova la teva connexió a Internet.';
            } else {
                // message += ` Detall: ${e.reason.message}`; // Pot ser massa tècnic per l'usuari
            }
        }
        window.ErrorHandler.show(message);
    }
});

// Exportar classes principals a window per a ús global
// Assegurar-se que les definicions de les classes (ThemeManager, SmoothScroll, LoadingManager, NavigationManager, AnimationManager, ErrorHandler, App) 
// estan ABANS d'aquestes assignacions a window, o que són importades i re-exportades si s'usa un sistema de mòduls intern a app.js.

// Assumint que ErrorHandler es defineix en aquest mateix arxiu abans d'aquest punt:
if (typeof ErrorHandler !== 'undefined') {
    window.ErrorHandler = ErrorHandler;
}

if (typeof App !== 'undefined') {
    window.App = App;
}

/* ELIMINAT AQUEST BLOC PERQUÈ main.js ARA S'ENCARREGA DE LA INICIALITZACIÓ
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregat, inicialitzant aplicació des de app.js (REDUNDANT)...');
    const app = new App();
    app.init().then(() => {
        console.log("App inicialitzada completament des de app.js (REDUNDANT).");
    }).catch(err => {
        console.error("Error final en la inicialització de l'App des de app.js (REDUNDANT):", err);
    });
    window.app = app; 
});
*/

// Si altres classes definides en app.js (ThemeManager, etc.) necessiten ser globals,
// també s'haurien d'exportar aquí:
// if (typeof ThemeManager !== 'undefined') { window.ThemeManager = ThemeManager; }
// etc.

// Log para verificar que main.js se está cargando
console.log('main.js carregat correctament');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded des de main.js, iniciant App...');
    
    // Comprovem que les classes necessàries estan disponibles globalment
    if (typeof App === 'undefined') {
        console.error('Error: La classe App no està definida. Assegura\'t que app.js s\'ha carregat correctament.');
        if (window.ErrorHandler && typeof window.ErrorHandler.show === 'function') {
            window.ErrorHandler.show('Error crític: La classe App no està disponible. L\'aplicació no pot iniciar.');
        }
        return;
    }
    if (typeof ContentLoader === 'undefined') {
        console.error('Error: La classe ContentLoader no està definida. Assegura\'t que content-loader.js s\'ha carregat correctament.');
        if (window.ErrorHandler && typeof window.ErrorHandler.show === 'function') {
             window.ErrorHandler.show('Error crític: La classe ContentLoader no està disponible.');
        }
        return;
    }
    if (typeof Chatbot === 'undefined') {
        console.error('Error: La classe Chatbot no està definida. Assegura\'t que chatbot.js s\'ha carregat correctament.');
        if (window.ErrorHandler && typeof window.ErrorHandler.show === 'function') {
            window.ErrorHandler.show('Error crític: La classe Chatbot no està disponible.');
        }
        return;
    }
    
    // Inicialitzar AOS (Animation On Scroll) un cop el DOM està carregat i sabem que AOS està disponible.
    // Aquest és un bon lloc per fer-ho si App.init() no ho gestiona o per assegurar que es fa un sol cop.
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
        console.log('AOS inicialitzat des de main.js');
    } else {
        console.warn('AOS no està definit. Les animacions de scroll no funcionaran.');
    }

    try {
        // Instanciar i inicialitzar l'App
        console.log('Creant instància de App des de main.js...');
        const appInstance = new App(); // Les classes ContentLoader i Chatbot s'instancien dins del constructor/init d'App
        
        appInstance.init().then(() => {
            console.log("App inicialitzada amb èxit des de main.js.");
            window.app = appInstance; // Assignar a window per accés global
        }).catch(error => {
            console.error("Error durant la promesa d'inicialització de l'App (appInstance.init) des de main.js:", error);
            if (window.ErrorHandler && typeof window.ErrorHandler.show === 'function') {
                window.ErrorHandler.show('S\'ha produït un error greu durant l\'inici de l\'aplicació (promesa init).');
            }
        });
    } catch (error) {
        console.error("Error crític instanciant App o cridant a init() des de main.js (try...catch general):", error);
        if (window.ErrorHandler && typeof window.ErrorHandler.show === 'function') {
            window.ErrorHandler.show('Error molt greu en arrencar l\'aplicació (error general).');
        }
    }
}); 
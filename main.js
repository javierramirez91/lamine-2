// Log para verificar que main.js se está cargando
console.log('main.js carregat correctament');

// Función para esperar a que las clases estén disponibles
function waitForClasses() {
    return new Promise((resolve) => {
        const checkClasses = () => {
            if (typeof App !== 'undefined' && typeof ContentLoader !== 'undefined' && typeof Chatbot !== 'undefined') {
                console.log('Totes les classes disponibles');
                resolve();
            } else {
                console.log('Esperant classes...', {
                    App: typeof App !== 'undefined',
                    ContentLoader: typeof ContentLoader !== 'undefined', 
                    Chatbot: typeof Chatbot !== 'undefined'
                });
                setTimeout(checkClasses, 100);
            }
        };
        checkClasses();
    });
}

// Esperar a que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

async function initApp() {
    console.log('Inicialitzant aplicació des de main.js...');
    
    try {
        // Esperar a que las clases estén disponibles
        await waitForClasses();
        
        // Inicializar AOS cuando esté disponible
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100
            });
            console.log('AOS inicialitzat');
        }
        
        // Crear e inicializar la aplicación principal
        console.log('Creant instància de App...');
        window.app = new App();
        await window.app.init();
        console.log('App inicialitzada correctament!');
        
    } catch (error) {
        console.error('Error inicialitzant aplicació:', error);
        // Mostrar mensaje de error al usuario
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <div class="loading-content">
                    <h2 style="color: #ff4444;">Error carregant l'aplicació</h2>
                    <p>Si us plau, recarrega la pàgina</p>
                    <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #007BFF; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        Recarregar
                    </button>
                </div>
            `;
        }
    }
} 
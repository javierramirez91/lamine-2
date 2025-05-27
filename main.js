// Importar estilos
import './styles.css';

// Log para verificar que main.js se está cargando
console.log('main.js carregat correctament');

// Los otros archivos JS ya se cargarán automáticamente porque contienen clases globales
// No necesitamos importarlos como módulos

// Esperar a que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function initApp() {
    console.log('Inicialitzant aplicació des de main.js...');
    
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
} 
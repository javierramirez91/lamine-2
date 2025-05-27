import fsExtra from 'fs-extra';
const { readFileSync, writeFileSync, copyFileSync, ensureDirSync, existsSync } = fsExtra;
import { resolve } from 'path';

console.log('[Post-Build] Iniciant ajustos finals...');

const distPath = resolve('dist');
const publicPath = resolve('public');

// Arxius JS a copiar des de /public a /dist (arrel)
const jsFilesToEnsureInDist = ['app.js', 'chatbot.js', 'content-loader.js'];

console.log('[Post-Build] Copiant arxius JS addicionals...');
jsFilesToEnsureInDist.forEach(file => {
    const sourcePath = resolve(publicPath, file);
    const destPath = resolve(distPath, file); 
    if (existsSync(sourcePath)) {
        try {
            copyFileSync(sourcePath, destPath);
            console.log(`  ✓ Copiat: ${sourcePath} -> ${destPath}`);
        } catch (err) {
            console.error(`  ✗ ERROR copiant ${file}:`, err);
        }
    } else {
        console.warn(`  ⚠️ ATENCIÓ: L'arxiu font no existeix, no es copiarà: ${sourcePath}`);
    }
});

const indexPath = resolve(distPath, 'index.html');

if (!existsSync(indexPath)) {
    console.error(`
    --------------------------------------------------------------------
    ERROR CRÍTIC POST-BUILD: L'arxiu 'dist/index.html' no existeix!
    Això significa que el build de Vite probablement ha fallat o no ha generat l'HTML esperat.
    Revisa els logs del build de Vite per a més detalls.
    El script post-build no pot continuar.
    --------------------------------------------------------------------
    `);
    process.exit(1);
}

console.log(`[Post-Build] Processant: ${indexPath}`);
let htmlContent = readFileSync(indexPath, 'utf-8');

// Comprovació inicial del contingut llegit (primeres 200 caràcters)
// console.log('[Post-Build] Contingut inicial (parcial) de index.html:\n', htmlContent.substring(0, 200));

// Assegurar que les referències als JS copiats siguin absolutes des de l'arrel
jsFilesToEnsureInDist.forEach(file => {
    // Busca patrons com: src="./app.js", src="app.js", src="/public/app.js", src="public/app.js"
    // i els converteix a src="/app.js"
    const regexPatterns = [
        new RegExp(`src\s*=\s*"\.\/${file}"`, 'g'),
        new RegExp(`src\s*=\s*"${file}"`, 'g'),
        new RegExp(`src\s*=\s*"\/public\/${file}"`, 'g'),
        new RegExp(`src\s*=\s*"public\/${file}"`, 'g')
    ];
    
    let replaced = false;
    regexPatterns.forEach(regex => {
        if (htmlContent.match(regex)) {
            htmlContent = htmlContent.replace(regex, `src="/${file}"`);
            console.log(`  ✓ Actualitzada ruta per a ${file} (patró: ${regex}) a src="/${file}"`);
            replaced = true;
        }
    });
    if (!replaced) {
        console.warn(`  ⚠️ No s'ha trobat cap patró de ruta per actualitzar per a ${file}. Verifica l'HTML.`);
    }
});

// Comprovació addicional: assegurar que les rutes als assets generats per Vite siguin absolutes
// Vite normalment ho fa bé, però això és una doble comprovació.
let replacedAssets = false;
if (htmlContent.match(/href="\.\/assets\//g)) {
    htmlContent = htmlContent.replace(/href="\.\/assets\//g, 'href="/assets/');
    console.log('  ✓ Corregida ruta relativa CSS: href="./assets/ -> href="/assets/');
    replacedAssets = true;
}
if (htmlContent.match(/src="\.\/assets\//g)) {
    htmlContent = htmlContent.replace(/src="\.\/assets\//g, 'src="/assets/');
    console.log('  ✓ Corregida ruta relativa JS (assets): src="./assets/ -> src="/assets/');
    replacedAssets = true;
}
if (!replacedAssets) {
    console.log('  ⓘ Les rutes als assets de Vite ja semblen ser absolutes o no n\'hi ha de relatives.');
}

// Guardar els canvis
try {
    writeFileSync(indexPath, htmlContent, 'utf-8');
    console.log(`[Post-Build] ✓ Fitxer 'dist/index.html' actualitzat correctament.`);
} catch (err) {
    console.error(`[Post-Build] ✗ ERROR escrivint a 'dist/index.html':`, err);
    process.exit(1);
}

console.log('[Post-Build] Procés finalitzat amb èxit! ✨'); 
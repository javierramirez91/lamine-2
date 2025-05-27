import fsExtra from 'fs-extra';
const { readFileSync, writeFileSync, copyFileSync, ensureDirSync, readdirSync, existsSync } = fsExtra;
import { resolve, dirname } from 'path';

console.log('Post-build: Iniciant procés d\'ajustament...');

const distPath = resolve('dist');
const publicPath = resolve('public');
const assetsDistPath = resolve(distPath, 'assets');

// 1. Assegurar que la carpeta dist/assets existeix
ensureDirSync(assetsDistPath);

// 2. Llista d'arxius JS a copiar des de la carpeta public (si existeixen)
const jsFilesToCopy = ['app.js', 'chatbot.js', 'content-loader.js'];

jsFilesToCopy.forEach(file => {
    const sourcePath = resolve(publicPath, file);
    const destPath = resolve(distPath, file); // Copiar a l'arrel de dist
    if (existsSync(sourcePath)) {
        copyFileSync(sourcePath, destPath);
        console.log(`✓ Copiat ${file} a ${destPath}`);
    } else {
        console.warn(`ATENCIÓ: No s'ha trobat ${sourcePath} per copiar.`);
    }
});

// 3. Llegir l'index.html generat per Vite dins de la carpeta dist
const viteGeneratedIndexHtmlPath = resolve(distPath, 'index.html');
if (!existsSync(viteGeneratedIndexHtmlPath)) {
    console.error(`ERROR CRÍTIC: No s'ha trobat ${viteGeneratedIndexHtmlPath}. El build de Vite pot haver fallat o la ruta és incorrecta.`);
    process.exit(1);
}

let htmlContent = readFileSync(viteGeneratedIndexHtmlPath, 'utf-8');

console.log('✓ Llegit index.html generat per Vite.');

// 4. Modificar les rutes dels scripts copiats per apuntar a l'arrel
// Vite ja hauria d'haver gestionat correctament les rutes als seus assets (CSS i JS principal amb hash)
// Només ajustem els que hem copiat manualment des de /public

// Assegurem que les rutes siguin absolutes des de l'arrel del lloc
htmlContent = htmlContent.replace(/src="\.\/assets\//g, 'src="/assets/');
htmlContent = htmlContent.replace(/href="\.\/assets\//g, 'href="/assets/');

// Ajustar els scripts que hem copiat manualment a l'arrel de dist
jsFilesToCopy.forEach(file => {
    // Exemples de patrons que podria haver generat Vite o estar a l'HTML original
    const regex1 = new RegExp(`src="\.\/${file}"`, 'g');
    const regex2 = new RegExp(`src="${file}"`, 'g'); 
    const regex3 = new RegExp(`src="\/public\/${file}"`, 'g');
    const regex4 = new RegExp(`src="public\/${file}"`, 'g');

    htmlContent = htmlContent.replace(regex1, `src="/${file}"`);
    htmlContent = htmlContent.replace(regex2, `src="/${file}"`);
    htmlContent = htmlContent.replace(regex3, `src="/${file}"`);
    htmlContent = htmlContent.replace(regex4, `src="/${file}"`);
});

// 5. (Opcional però recomanat) Assegurar que l'enllaç al CSS principal de Vite utilitza una ruta absoluta
// Vite normalment ho fa bé, però per si de cas.
// Busca un enllaç CSS dins de la carpeta /assets/
htmlContent = htmlContent.replace(/href="assets\//g, 'href="/assets/'); // Si la ruta fos relativa
htmlContent = htmlContent.replace(/href="\.\/assets\//g, 'href="/assets/'); // Si la ruta fos relativa amb ./assets/


// 6. Escribir el HTML final modificat a dist/index.html
writeFileSync(viteGeneratedIndexHtmlPath, htmlContent);
console.log('✓ index.html final actualitzat correctament a la carpeta dist.');

console.log('✓ Procés de Post-build finalitzat amb èxit!'); 
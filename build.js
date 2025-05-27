import { build } from 'vite';
import { copyFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

// Build con Vite
await build();

// Copiar archivos JS a dist
const files = ['content-loader.js', 'chatbot.js', 'app.js', 'main.js', 'styles.css'];
const distPath = resolve('dist');

console.log('Copiando archivos JavaScript a dist...');

files.forEach(file => {
  try {
    copyFileSync(resolve(file), resolve(distPath, file));
    console.log(`✓ Copiado ${file}`);
  } catch (error) {
    console.error(`✗ Error copiando ${file}:`, error.message);
  }
});

console.log('Build completado!'); 
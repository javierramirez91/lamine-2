# 🚀 Guia de Desplegament - Contractació Pública App

## 📋 Preparació per al Desplegament

### 1. Verificació Local
```bash
# Instal·lar dependències
npm install

# Executar en mode desenvolupament
npm run dev

# Build per producció
npm run build

# Preview del build
npm run preview
```

### 2. Configuració Netlify

#### Opció A: Deploy Manual
1. Executar `npm run build`
2. Pujar la carpeta `dist/` a Netlify
3. Configurar domeni personalitzat (opcional)

#### Opció B: Deploy Automàtic (Recomanat)
1. Connectar repositori GitHub a Netlify
2. Configuració automàtica amb `netlify.toml`
3. Deploy automàtic en cada push

## ⚙️ Configuració Netlify

### Build Settings
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"
```

### Headers de Seguretat
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://openrouter.ai; connect-src 'self' https://openrouter.ai https://api.openrouter.ai; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-ancestors 'none';"
```

### Redirects SPA
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🔧 Variables d'Entorn

### API Configuration
- `API_KEY`: Ja configurada en el codi
- `API_URL`: https://openrouter.ai/api/v1/chat/completions
- `MODEL`: google/gemma-3n-e4b-it:free

### Netlify Environment Variables (Opcional)
```bash
# Si vols externalitzar l'API key
VITE_API_KEY=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
VITE_API_URL=https://openrouter.ai/api/v1/chat/completions
VITE_MODEL=google/gemma-3n-e4b-it:free
```

## 📊 Optimitzacions de Rendiment

### Build Optimizations
- **Minificació**: Terser per JavaScript
- **Compressió**: Gzip automàtic a Netlify
- **Code Splitting**: Chunks automàtics per vendors
- **Legacy Support**: Polyfills per navegadors antics

### CDN i Cache
- **Static Assets**: Cache de 1 any
- **HTML**: Cache de 1 hora
- **API Responses**: No cache per dades dinàmiques

## 🔒 Seguretat

### Content Security Policy
- Permet només scripts de l'origen i OpenRouter
- Bloqueja inline scripts maliciosos
- Protegeix contra XSS i clickjacking

### Headers de Seguretat
- `X-Frame-Options`: Prevé clickjacking
- `X-XSS-Protection`: Protecció XSS del navegador
- `X-Content-Type-Options`: Prevé MIME sniffing
- `Referrer-Policy`: Controla informació de referrer

## 🌐 Domeni Personalitzat

### Configuració DNS
```
Type: CNAME
Name: www
Value: [your-site].netlify.app

Type: A
Name: @
Value: 75.2.60.5
```

### SSL/TLS
- Certificat SSL automàtic via Let's Encrypt
- HTTPS forçat per defecte
- HTTP/2 activat automàticament

## 📈 Monitorització

### Analytics
- Google Analytics (opcional)
- Netlify Analytics inclòs
- Core Web Vitals tracking

### Error Tracking
- Console errors capturats
- API errors gestionats
- Fallbacks per connexió offline

## 🚀 Checklist de Desplegament

### Pre-Deploy
- [ ] Tests locals passats
- [ ] Build sense errors
- [ ] Verificació responsive
- [ ] Test de funcionalitat del chatbot
- [ ] Verificació de temes fosc/clar

### Post-Deploy
- [ ] Verificació URL de producció
- [ ] Test de funcionalitat completa
- [ ] Verificació headers de seguretat
- [ ] Test de rendiment (Lighthouse)
- [ ] Verificació SEO

### Monitoring
- [ ] Configurar alerts de downtime
- [ ] Monitoritzar Core Web Vitals
- [ ] Revisar logs d'errors
- [ ] Tracking d'ús de l'API

## 🔄 CI/CD Pipeline

### GitHub Actions (Opcional)
```yaml
name: Deploy to Netlify
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🆘 Troubleshooting

### Errors Comuns
1. **Build Error**: Verificar dependències i Node version
2. **API Error**: Comprovar API key i CORS
3. **404 Error**: Verificar redirects SPA
4. **CSP Error**: Ajustar Content Security Policy

### Debug
```bash
# Verificar build local
npm run build && npm run preview

# Debug amb logs
npm run build -- --debug

# Verificar dependències
npm audit
```

## 📞 Suport

Per problemes de desplegament:
1. Revisar logs de Netlify
2. Verificar configuració DNS
3. Comprovar variables d'entorn
4. Contactar suport tècnic

---

**🏆 Lamine Yamal està preparat per ser despletat i ajudar amb contractació pública!** 
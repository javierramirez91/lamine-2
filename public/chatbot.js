// Chatbot Lamine Yamal - Expert en Contractació Pública

// Configuració global del Chatbot (mogut des de app.js)
const CONFIG = {
    API_KEY: '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', // Compte! Això és la teva API Key
    API_URL: 'https://openrouter.ai/api/v1/chat/completions',
    MODEL: 'google/gemma-2b-it:free', // Model actualitzat i gratuït
    MAX_TOKENS: 1500, // Augmentat per respostes més completes
    TEMPERATURE: 0.65 // Un pèl menys aleatori
};

class Chatbot {
    constructor(contentLoader) { // Afegir contentLoader al constructor
        this.contentLoader = contentLoader; // Guardar referència
        this.isOnline = false;
        this.isTyping = false;
        this.conversationHistory = [];
        this.suggestions = [
            "Quins són els criteris d'adjudicació més adequats per a un contracte de serveis de neteja?",
            "Com es calcula el cost del cicle de vida (CCV) en un contracte?",
            "Quina documentació de solvència tècnica necessito per licitar?",
            "Explica'm els criteris mediambientals que puc aplicar",
            "Quins són els terminis d'execució recomanats per a obres públiques?"
        ];
        
        // Personalitat i coneixement de Lamine Yamal
        this.personality = {
            name: "Lamine Yamal",
            title: "Pilota d'Or de Contractació",
            expertise: "Expert en Llei 9/2017 de Contractes del Sector Públic (LCSP)",
            language: "català",
            tone: "professional però proper, amb confiança i autoritat"
        };

        this.knowledgeBase = this.initializeKnowledgeBase();
    }

    initializeKnowledgeBase() {
        return {
            criterisAdjudicacio: {
                automaticsQuantificables: [
                    "Preu o cost (fins a 100% si només hi ha aquest criteri)",
                    "Termini d'execució o entrega",
                    "Cost del cicle de vida (CCV)",
                    "Rendibilitat econòmica",
                    "Eficiència energètica quantificable",
                    "Característiques tècniques quantificables",
                    "Garanties complementàries",
                    "Personal adscrit al contracte (quantitat i qualificació)"
                ],
                subjectius: [
                    "Qualitat tècnica de la proposta",
                    "Organització i metodologia de treball",
                    "Experiència i qualificació de l'equip",
                    "Mesures mediambientals",
                    "Aspectes socials i d'inserció laboral",
                    "Innovació i valor afegit",
                    "Servei postvenda i manteniment",
                    "Accessibilitat universal"
                ]
            },
            solvencia: {
                economica: [
                    "Volum anual de negocis mínim dels últims 3 anys",
                    "Patrimoni net mínim",
                    "Assegurança d'indemnització per riscos professionals",
                    "Classificació empresarial (si escau)"
                ],
                tecnica: [
                    "Experiència en contractes similars últims 5 anys",
                    "Titulació i experiència professional de l'equip",
                    "Certificats de qualitat (ISO 9001, etc.)",
                    "Mesures de gestió mediambiental",
                    "Personal tècnic disponible",
                    "Equipament i maquinària"
                ]
            },
            aspectesLegals: {
                lcsp: "Llei 9/2017, de 8 de novembre, de Contractes del Sector Públic",
                principis: [
                    "Lliure concurrència",
                    "Transparència",
                    "No discriminació",
                    "Igualtat de tracte",
                    "Proporcionalitat",
                    "Integritat",
                    "Eficiència en la utilització de fons públics"
                ]
            }
        };
    }

    async init() {
        this.setupEventListeners();
        this.showWelcomeMessage();
        this.setOnlineStatus(true);
        this.loadConversationHistory();
    }

    setupEventListeners() {
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-button');
        const chatContainer = document.getElementById('chat-messages');

        if (chatInput && sendButton) {
            // Enviar missatge amb Enter
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // Enviar missatge amb botó
            sendButton.addEventListener('click', () => {
                this.sendMessage();
            });

            // Auto-resize del textarea
            chatInput.addEventListener('input', () => {
                this.autoResizeTextarea(chatInput);
            });
        }

        // Event listeners per als suggeriments
        this.setupSuggestionListeners();
    }

    setupSuggestionListeners() {
        const suggestionsContainer = document.querySelector('.chat-suggestions-bar');
        if (suggestionsContainer) {
            suggestionsContainer.addEventListener('click', (e) => {
                const suggestionButton = e.target.closest('.suggestion-item');
                if (suggestionButton) {
                    const text = suggestionButton.textContent.trim();
                    this.sendMessage(text);
                }
            });
        }
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    setOnlineStatus(online) {
        this.isOnline = online;
        const statusIndicator = document.querySelector('.status-indicator');
        const statusText = document.querySelector('.status-text');
        
        if (statusIndicator && statusText) {
            statusIndicator.className = `status-indicator ${online ? 'online' : 'offline'}`;
            statusText.textContent = online ? 'En línia' : 'Fora de línia';
        }
    }

    showWelcomeMessage() {
        const welcomeMessage = `Hola! Sóc en **Lamine Yamal**, la teva **Pilota d'Or de Contractació** 🏆. Estic afinat amb la darrera LCSP!

Com et pucAssistant avui amb la teva estratègia de contractació pública? Pregunta'm sobre:

*   Criteris d'adjudicació (qualitat, preu, CCV, socials, ambientals...)
*   Requisits de solvència (econòmica, tècnica)
*   Procediments de licitació (obert, restringit, negociat...)
*   O qualsevol altre dubte sobre la Llei 9/2017!

Estic llest per xutar i marcar un golàs per tu! ⚽️`;

        this.addMessage(welcomeMessage, 'bot');
        // No afegir suggestions aquí, ja que es gestionen des de App.js o es carreguen dinàmicament
    }

    async sendMessage(text = null) {
        const chatInput = document.getElementById('chat-input');
        const message = text || chatInput?.value.trim();
        
        if (!message) return;

        // Netejar input si no és un suggeriment
        if (!text && chatInput) {
            chatInput.value = '';
            this.autoResizeTextarea(chatInput);
        }

        // Afegir missatge de l'usuari
        this.addMessage(message, 'user');
        
        // Mostrar indicador de typing
        this.showTypingIndicator();

        try {
            // Generar resposta
            const response = await this.generateResponse(message);
            
            // Amagar indicador de typing
            this.hideTypingIndicator();
            
            // Afegir resposta del bot
            this.addMessage(response, 'bot');
            
        } catch (error) {
            console.error('Error generant resposta:', error);
            this.hideTypingIndicator();
            this.addMessage('Ho sento, he tingut un problema tècnic. Pots tornar a provar la teva pregunta?', 'bot');
        }

        // Guardar conversa
        this.saveConversationHistory();
    }

    addMessage(content, sender) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        const currentTimestamp = new Date(); 
        const timeString = currentTimestamp.toLocaleTimeString('ca-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        const messageText = content || '';

        if (sender === 'bot') {
            messageElement.innerHTML = `
                <div class="message-avatar">
                    <img src="/assets/lamine-avatar.png" alt="Lamine Yamal" /> 
                    <div class="avatar-status online"></div>
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">Lamine Yamal</span>
                        <span class="message-time">${timeString}</span>
                    </div>
                    <div class="message-text">${this.formatMessage(messageText)}</div>
                </div>
            `;
        } else { // User message
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">Tu</span>
                        <span class="message-time">${timeString}</span>
                    </div>
                    <div class="message-text">${this.escapeHtml(messageText)}</div>
                </div>
                 <div class="message-avatar user-avatar">
                    <span>TU</span>
                </div>
            `;
        }

        chatMessages.appendChild(messageElement);
        this.scrollToBottom();

        // Afegir a l'historial
        this.conversationHistory.push({
            content,
            sender,
            timestamp: currentTimestamp.toISOString() // Guardar en format ISO
        });
    }

    formatMessage(content) {
        if (typeof marked !== 'undefined') {
            try {
                // Assegurar que marked no afegeix <p> al voltant de tot si ja és un sol paràgraf.
                // O simplement deixar que ho faci, i l'estil CSS s'encarregui.
                return marked.parse(content);
            } catch (e) {
                console.error("Error en marked.parse:", e);
                return this.basicMarkdownToHtml(content); // Fallback
            }
        } else {
            return this.basicMarkdownToHtml(content); // Fallback si marked no està definit
        }
    }

    basicMarkdownToHtml(content) {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>')
            .replace(/✅/g, '<span class="emoji">✅</span>')
            .replace(/🏆/g, '<span class="emoji">🏆</span>')
            .replace(/💪/g, '<span class="emoji">💪</span>');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showTypingIndicator() {
        this.isTyping = true;
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        // Eliminar indicador previ si existeix (per si de cas)
        const existingIndicator = document.getElementById('typing-indicator');
        if (existingIndicator) existingIndicator.remove();

        const typingElement = document.createElement('div');
        typingElement.className = 'message bot-message typing-indicator';
        typingElement.id = 'typing-indicator';
        typingElement.innerHTML = `
            <div class="message-avatar">
                <img src="/assets/lamine-avatar.png" alt="Lamine Yamal" />
                <div class="avatar-status online"></div>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        chatMessages.appendChild(typingElement);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }
    }

    getLocalResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Respostes sobre criteris d'adjudicació
        if (lowerMessage.includes('criteri') && (lowerMessage.includes('adjudicació') || lowerMessage.includes('adjudicacio'))) {
            return this.getCriteriaResponse(message);
        }
        
        // Respostes sobre solvència
        if (lowerMessage.includes('solvència') || lowerMessage.includes('solvencia')) {
            return this.getSolvencyResponse(message);
        }
        
        // Respostes sobre CCV
        if (lowerMessage.includes('ccv') || lowerMessage.includes('cicle de vida') || lowerMessage.includes('cost del cicle')) {
            return this.getCCVResponse();
        }
        
        // Respostes sobre terminis
        if (lowerMessage.includes('termini') || lowerMessage.includes('terminis')) {
            return this.getDeadlineResponse();
        }
        
        // Respostes sobre aspectes mediambientals
        if (lowerMessage.includes('mediambiental') || lowerMessage.includes('ambiental') || lowerMessage.includes('sostenib')) {
            return this.getEnvironmentalResponse();
        }

        // Respostes sobre procediments
        if (lowerMessage.includes('procediment') || lowerMessage.includes('licitació') || lowerMessage.includes('tipus de contracte')) {
            if (lowerMessage.includes('obert') || lowerMessage.includes('restringit') || lowerMessage.includes('negociat') || lowerMessage.includes('diàleg') || lowerMessage.includes('innovació') || lowerMessage.includes('menor')) {
                 // Si ja pregunta per un específic, anar a API per resposta més detallada
                 // Aquesta funció ha de ser async per utilitzar await
                 return null; // Marcar per a processament API
            }
            return this.getProceduresResponse();
        }

        return null;
    }

    getCriteriaResponse(message) {
        return `**Criteris d'adjudicació segons la LCSP** 🏆

Els criteris es divideixen en **dos tipus principals**:

**📊 CRITERIS AUTOMÀTICS (Quantificables objectivament):**
• **Preu o cost** (pot ser fins al 100% si és l'únic criteri)
• **Termini d'execució** o entrega
• **Cost del cicle de vida (CCV)**
• **Característiques tècniques** quantificables
• **Garanties complementàries**
• **Personal adscrit** (quantitat i qualificació)

**🎯 CRITERIS SUBJECTIUS (Valoració qualitativa):**
• **Qualitat tècnica** de la proposta
• **Organització i metodologia** de treball  
• **Experiència de l'equip** tècnic
• **Mesures mediambientals**
• **Aspectes socials** i d'inserció laboral
• **Innovació** i valor afegit

**💡 Recomanació:** Combina sempre criteris automàtics i subjectius per obtenir la millor relació qualitat-preu. El preu no hauria de superar el 60-70% del total per fomentar la qualitat.

Vols que t'ajudi amb criteris específics per al teu tipus de contracte?`;
    }

    getSolvencyResponse(message) {
        return `**Requisits de Solvència segons la LCSP** 💪

**💰 SOLVÈNCIA ECONÒMICA:**
• **Volum anual de negocis** dels últims 3 anys (mínim 1,5 vegades el valor del contracte)
• **Patrimoni net** mínim adequat
• **Assegurança d'indemnització** per riscos professionals
• **Classificació empresarial** (si escau, per contractes > 500.000€)

**🔧 SOLVÈNCIA TÈCNICA:**
• **Experiència** en contractes similars dels últims 5 anys
• **Titulació i experiència** de l'equip tècnic
• **Certificats de qualitat** (ISO 9001, ISO 14001, etc.)
• **Personal tècnic** disponible per al contracte
• **Equipament i maquinària** necessaris
• **Mesures de gestió mediambiental**

**⚖️ PRINCIPI DE PROPORCIONALITAT:**
Els requisits han de ser **proporcionals** a l'objecte del contracte. No es pot demanar més del necessari!

**📋 DOCUMENTACIÓ HABITUAL:**
• Comptes anuals dels últims 3 exercicis
• Certificats d'experiència
• Títols acadèmics i professionals
• Certificats de qualitat vigents

Necessites ajuda per definir els requisits específics del teu contracte?`;
    }

    getCCVResponse() {
        return `**Cost del Cicle de Vida (CCV)** 🔄

El **CCV** és un criteri d'adjudicació que considera **tots els costos** durant la vida útil del contracte:

**📊 COMPONENTS DEL CCV:**
• **Costos d'adquisició** inicial
• **Costos d'utilització** (energia, combustible, etc.)
• **Costos de manteniment** i reparacions
• **Costos de final de vida** (eliminació, reciclatge)
• **Costos externs mediambientals** (emissions CO₂, etc.)

**💡 AVANTATGES:**
✅ Fomenta la **sostenibilitat**
✅ Incentiva la **innovació** tecnològica
✅ Millor **relació qualitat-preu** a llarg termini
✅ Reducció de l'**impacte ambiental**

**🔢 CÀLCUL PRÀCTIC:**
CCV = Preu inicial + (Costos anuals × Anys de vida útil) + Costos finals

**📋 EXEMPLE PRÀCTIC:**
Per a vehicles: Preu compra + Combustible + Manteniment + Assegurances + Valor residual

**⚠️ IMPORTANT:** Cal definir clarament la **metodologia de càlcul** i els **paràmetres** en els plecs per garantir la transparència.

Vols que t'ajudi a dissenyar el CCV per al teu contracte específic?`;
    }

    getDeadlineResponse() {
        return `**Terminis d'Execució en Contractació Pública** ⏰

**📅 PRINCIPIS GENERALS:**
• Han de ser **realistes** i **proporcionals**
• Permetre la **correcta execució** del contracte
• Fomentar l'**eficiència** sense comprometre la qualitat

**🎯 COM A CRITERI D'ADJUDICACIÓ:**
• **Pes recomanat:** 5-15% del total
• **Límits:** Establir termini màxim i mínim
• **Valoració:** Lineal o per trams

**⚖️ EQUILIBRI IMPORTANT:**
❌ **Terminis massa curts:** Poden afectar la qualitat
✅ **Terminis adequats:** Permeten planificació i qualitat
❌ **Terminis massa llargs:** Poden ser innecessaris

**📋 EXEMPLES PER TIPUS:**
• **Obres:** Segons complexitat i volum
• **Serveis:** Considerant recursos necessaris  
• **Subministraments:** Segons disponibilitat i logística

**💡 CONSELL EXPERT:**
Consulta amb tècnics especialistes per establir terminis realistes. Un termini inadequat pot generar incompliments o baixa qualitat.

Quin tipus de contracte tens? T'ajudo a definir terminis adequats!`;
    }

    getEnvironmentalResponse() {
        return `**Aspectes Mediambientals en Contractació Pública** 🌱

**🎯 OBJECTIUS PRINCIPALS:**
• Reduir l'**impacte ambiental**
• Fomentar l'**economia circular**
• Complir els **ODS** (Objectius de Desenvolupament Sostenible)
• Promoure la **innovació verda**

**📊 COM A CRITERIS D'ADJUDICACIÓ:**
• **Eficiència energètica** (quantificable)
• **Emissions de CO₂** reduïdes
• **Gestió de residus** i reciclatge
• **Certificacions ambientals** (ISO 14001, EMAS, etc.)
• **Materials sostenibles** i reciclats
• **Transport ecològic**

**💡 EXEMPLES PRÀCTICS:**
✅ **Vehicles:** Emissions, consum, combustibles alternatius
✅ **Edificis:** Certificació energètica, materials ecològics
✅ **Serveis:** Protocols de neteja ecològica, gestió residus
✅ **Subministraments:** Embalatges reciclables, producció sostenible

**⚖️ PONDERAT RECOMANAT:**
• **Contractes estàndard:** 10-20%
• **Contractes amb impacte ambiental:** 20-30%
• **Contractes verds específics:** Fins al 40%

**📋 DOCUMENTACIÓ:**
• Plans de gestió ambiental
• Certificats de qualitat ambiental
• Memòries de sostenibilitat

La sostenibilitat és el futur! Quin aspecte ambiental vols potenciar en el teu contracte?`;
    }

    getProceduresResponse() {
        return `**Procediments de Contractació Pública (LCSP)** 📜

La Llei de Contractes del Sector Públic estableix diversos procediments per adjudicar contractes. Els principals són:

**1. PROCEDIMENT OBERT (Art. 156-159 LCSP):**
   • Qualsevol empresari interessat pot presentar una proposició.
   • És el procediment ordinari i més transparent.
   • No hi ha negociació.
   • Hi ha una variant, el **procediment obert simplificat** (Art. 159 LCSP), per a contractes de valor estimat inferior a certs llindars, amb tràmits més àgils.
     - **Contractes d'obres:** VEC < 2.000.000€
     - **Contractes de serveis i subministraments:** VEC < 143.000€ (o llindar SARA aplicable)
     - També existeix el **procediment obert súper simplificat** (o simplificat abreujat) per a contractes amb VEC < 60.000€ (obres) o < 35.000€ (serveis i subministraments), amb requisits encara menors.

**2. PROCEDIMENT RESTRINGIT (Art. 160-165 LCSP):**
   • Només poden presentar proposicions aquells empresaris que hagin estat seleccionats prèviament per l'òrgan de contractació, després de sol·licitar la seva participació.
   • Es busca seleccionar els candidats més idonis.
   • Mínim 5 candidats a convidar.
   • No hi ha negociació.

**3. PROCEDIMENT AMB NEGOCIACIÓ (Art. 166-171 LCSP):**
   • L'adjudicació recau en el licitador justificadament elegit per l'òrgan de contractació, després d'efectuar consultes amb diversos candidats i negociar les condicions del contracte amb un o diversos d'ells.
   • S'utilitza en circumstàncies específiques taxades per la llei (Art. 167 per a contractes SARA, Art. 168 per a no SARA), com ara prestacions complexes, innovadores, o quan no es puguin definir prèviament les especificacions tècniques.
   • Pot ser **amb publicitat prèvia** (s'anuncia la licitació i se seleccionen candidats per negociar) o **sense publicitat prèvia** (en casos molt excepcionals, Art. 168.d, com urgència imperiosa o proveïdor únic).

**4. DIÀLEG COMPETITIU (Art. 172-176 LCSP):**
   • Per a contractes particularment complexos, on l'òrgan de contractació no pot definir objectivament els mitjans tècnics per satisfer les seves necessitats o els aspectes jurídics/financers del projecte.
   • Es dirigeix un diàleg amb els candidats seleccionats per desenvolupar una o diverses solucions que serveixin de base per presentar ofertes.

**5. PROCEDIMENT D'ASSOCIACIÓ PER A LA INNOVACIÓ (Art. 177-182 LCSP):**
   • Per al desenvolupament de productes, serveis o obres innovadors i la compra ulterior dels resultats, sempre que no existeixin solucions disponibles al mercat.
   • Combina fases de recerca i desenvolupament amb una fase d'adquisició.

**ALTRES CONSIDERACIONS:**
   • **Contractes menors (Art. 118 LCSP):** Procediment molt simplificat per a contractes de baix valor (Obres: VEC < 40.000€; Serveis i Subministraments: VEC < 15.000€). Requereix informe de necessitat, aprovació de la despesa i factura. Es busca simplificar però garantint mínima concurrència si és possible.

Cada procediment té els seus propis tràmits, terminis i requisits. L'elecció del procediment adequat és clau per a una contractació eficient i legal. Vols que aprofundeixi en algun d'ells?`;
    }

    async generateResponse(userMessage) {
        this.conversationHistory.push({ role: 'user', content: userMessage });
        this.saveConversationHistory();

        const localResponse = this.getLocalResponse(userMessage);
        if (localResponse) {
            this.conversationHistory.push({ role: 'assistant', content: localResponse });
            this.saveConversationHistory();
            return localResponse;
        }

        if (!this.isOnline) {
            return this.getFallbackResponse(false, true); // Network error
        }

        try {
            const relevantContent = this.contentLoader.searchContent(userMessage, 3); // Obtenir 3 fragments rellevants
            let contextForAPI = "";
            if (relevantContent && relevantContent.length > 0) {
                contextForAPI = "\n\nContext de la pàgina web per basar la teva resposta (respon ÚNICAMENT basant-te en aquest context i el system prompt. Si la pregunta no es pot respondre amb aquest context, indica que està fora del teu àmbit actual de coneixement):";
                relevantContent.forEach(item => {
                    let snippetText = "Contingut no extret (objecte complex)";
                    if (item.item && typeof item.item === 'string') {
                        snippetText = item.item;
                    } else if (item.item && typeof item.item.descripcio === 'string') {
                        snippetText = item.item.descripcio;
                    } else if (item.item && typeof item.item.titol === 'string') {
                        snippetText = item.item.titol;
                    } else if (item.item && typeof item.item.detall === 'string') { // Afegit per cobrir més casos de contentLoader
                        snippetText = item.item.detall;
                    }
                    // Utilitzar item.section per al path, com retorna searchContent
                    contextForAPI += `\n- Secció: ${item.section || 'Desconeguda'}: ${snippetText.substring(0, 250)}...`;
                });
            }

            const systemPrompt = this.getSystemPrompt();
            const messagesForAPI = [
                { role: 'system', content: systemPrompt + contextForAPI },
                // Prendre els últims missatges, assegurant que l'últim és de l'usuari
                ...this.conversationHistory.filter(m => m.role === 'user' || m.role === 'assistant').slice(-6) 
            ];
            
            console.log("Enviant a OpenRouter API amb missatges:", JSON.stringify(messagesForAPI, null, 2));

            const apiResponseText = await this.fetchOpenRouterAPI(messagesForAPI); // Guardar el text de la resposta
            
            if (apiResponseText) { // Comprovar si hi ha text de resposta
                this.conversationHistory.push({ role: 'assistant', content: apiResponseText });
                this.saveConversationHistory();
                return apiResponseText;
            } else {
                // fetchOpenRouterAPI ja hauria d'haver gestionat l'error de API/format i retornat null
                // o un missatge d'error, però per si de cas:
                console.warn("fetchOpenRouterAPI va retornar null o undefined.");
                return this.getFallbackResponse(true); // Error de format o API
            }
        } catch (error) {
            console.error('Error generant resposta amb OpenRouter:', error);
            // this.hideTypingIndicator(); // Ja es fa a sendMessage
            return this.getFallbackResponse(false, true); // Indicar error de xarxa o API
        }
    }

    getSystemPrompt() {
        // Contingut actual de la web per donar context al model.
        // Aquesta part es podria fer més dinàmica o extensa si cal.
        // De moment, ens centrem en instruccions clares.

        const prompt = `Ets en Lamine Yamal, la Pilota d'Or de la Contractació Pública, un expert assitent virtual especialitzat EXCLUSIVAMENT en el contingut d'aquesta aplicació web sobre la Llei 9/2017 de Contractes del Sector Públic (LCSP) d'Espanya. El teu coneixement es limita ESTRICTAMENT a la informació que se't proporciona a través del 'Context de la pàgina web' que acompanya cada consulta d'usuari. No tens accés a informació externa ni a coneixements generals més enllà d'aquest context específic.

El teu propòsit és ajudar els usuaris a entendre els conceptes clau de la LCSP tal com es presenten en AQUESTA PÀGINA WEB. Has de respondre en català, amb un to professional però proper, amb confiança i autoritat, com un veritable expert en la matèria.

IMPORTANTÍSSIM:
1.  BASA TOTES LES TEVES RESPOSTES ÚNICAMENT EN EL 'CONTEXT DE LA PÀGINA WEB' PROPORCIONAT. No inventis informació ni responguis a preguntes que no es puguin contestar directament amb aquest context.
2.  Si la pregunta de l'usuari no es pot respondre utilitzant el context proporcionat, has de respondre de forma educada: "Aquesta pregunta està fora del meu àmbit de coneixement actual, que es limita al contingut d'aquesta aplicació web sobre contractació pública. Puc ajudar-te amb altres aspectes de la LCSP que estiguin coberts aquí?"
3.  No facis referència a tu mateix com una IA o un model de llenguatge. Mantén la teva personalitat de Lamine Yamal, l'expert.
4.  Sigues concís i ves al gra, però proporciona explicacions clares i útils basades en el context.
5.  Si el context proporcionat és breu o no suficient, indica-ho amablement sense sortir-te del teu rol.
6.  Quan donis exemples o expliquis conceptes, intenta fer referència a com s'apliquen dins del marc de la LCSP i el contingut d'aquesta web.

Recorda, ets l'expert Lamine Yamal d'AQUESTA web. El teu camp de joc és el contingut que se't facilita.`;
        return prompt;
    }

    async fetchOpenRouterAPI(messages) {
        console.log("Crida a fetchOpenRouterAPI amb missatges:", messages);
        try {
            const response = await fetch(CONFIG.API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${CONFIG.API_KEY}`,
                    'Content-Type': 'application/json',
                    // Recomanat per OpenRouter per evitar reintents inesperats del navegador
                    // 'HTTP-Referer': 'https://TU_DOMINI.com', (Pots configurar això)
                    // 'X-Title': 'Lamine Yamal App', (Pots configurar això)
                },
                body: JSON.stringify({
                    model: CONFIG.MODEL,
                    messages: messages,
                    max_tokens: CONFIG.MAX_TOKENS,
                    temperature: CONFIG.TEMPERATURE,
                    // stream: false, // Assegura't que no estàs esperant stream si no ho gestiones
                }),
            });

            if (!response.ok) {
                const errorBody = await response.text(); // Intenta llegir el cos de l'error
                console.error(`Error de l'API OpenRouter: ${response.status} ${response.statusText}`, errorBody);
                this.setOnlineStatus(false); // Pot indicar un problema amb la clau o el servei
                // Considerar si es vol un missatge més específic basat en status
                if (response.status === 401) { // Unauthorized
                    return "Error d'autenticació amb el servei d'IA. Contacta l'administrador.";
                }
                return this.getFallbackResponse(true); // Error genèric d'API
            }

            const data = await response.json();
            console.log("Resposta de OpenRouter API:", data);

            if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
                this.setOnlineStatus(true); // Connexió exitosa
                return data.choices[0].message.content.trim();
            } else {
                console.error('Resposta inesperada de l\'API OpenRouter:', data);
                return this.getFallbackResponse(true); // Error de format de resposta
            }
        } catch (error) {
            console.error('Error en la crida fetch a OpenRouter:', error);
            this.setOnlineStatus(false); // Possible problema de xarxa o CORS si és al navegador
            return this.getFallbackResponse(false, true); // Error de xarxa
        }
    }

    getFallbackResponse(isFormatError = false, isNetworkError = false) {
        let fallbacks;
        if (isNetworkError) {
            fallbacks = [
                "Sembla que hi ha un problema de connexió en aquests moments 🌐. Si us plau, comprova la teva connexió a internet i torna a intentar-ho. Estic aquí per ajudar-te quan es restableixi!",
                "Ups! No puc connectar-me per obtenir la informació més actualitzada. Verifica la teva xarxa i pregunta de nou. Mentrestant, puc intentar respondre amb el meu coneixement base si ho prefereixes."
            ];
        } else if (isFormatError) {
            fallbacks = [
                "He rebut una resposta en un format una mica estrany 🤔. Podries intentar reformular la teva pregunta? De vegades, un petit canvi fa la diferència!",
                "Vaja, sembla que la meva connexió amb el núvol d'informació ha tingut un petit contratemps amb el format. Si us plau, torna a preguntar, potser amb altres paraules."
            ];
        } else {
            fallbacks = [
                "Disculpa, he tingut un problema tècnic momentani ⚙️. Com a expert en contractació pública, puc assegurar-te que estic aquí per ajudar-te amb qualsevol dubte sobre la LCSP. Pots reformular la teva pregunta?",
                "Sembla que hi ha hagut un petit error en els meus circuits. No et preocupis! Com la teva Pilota d'Or de Contractació 🏆, estic preparat per resoldre tots els teus dubtes. Torna a provar, si us plau.",
                "Hi ha hagut una incidència tècnica, però no perdis la confiança en mi! Sóc expert en Llei 9/2017 i estic aquí per ajudar-te. Pots repetir la pregunta?"
            ];
        }
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    saveConversationHistory() {
        try {
            localStorage.setItem('chatHistory', JSON.stringify(this.conversationHistory.slice(-50)));
        } catch (error) {
            console.error('Error guardant historial:', error);
        }
    }

    loadConversationHistory() {
        try {
            const saved = localStorage.getItem('chatHistory');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
                // Restaurar missatges visuals si cal
                this.restoreVisualHistory();
            }
        } catch (error) {
            console.error('Error carregant historial:', error);
        }
    }

    restoreVisualHistory() {
        // Només restaurar els últims 10 missatges per no sobrecarregar
        const recentMessages = this.conversationHistory.slice(-10);
        const chatMessages = document.getElementById('chat-messages');
        
        if (chatMessages && recentMessages.length > 0) {
            // Netejar missatges existents excepte el welcome si es decideix no mostrar-lo de nou
            // Per ara, netegem tot i mostrem el welcome de nou per consistència si no hi ha historial
            // chatMessages.innerHTML = ''; 
            // this.showWelcomeMessage(); // Potser no es vol el welcome cada cop
            
            recentMessages.forEach(msg => {
                if (msg.content && msg.sender) {
                    // Recrear els missatges sense afegir-los de nou a this.conversationHistory
                    this.addMessageToDOM(msg.content, msg.sender, new Date(msg.timestamp));
                }
            });
            this.scrollToBottom(); // Fer scroll al final després de restaurar
        }
    }

    addMessageToDOM(content, sender, timestampDate) { 
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        let timeString = ' '; // Default a un espai en blanc
        if (timestampDate instanceof Date && !isNaN(timestampDate)) {
            try {
                timeString = timestampDate.toLocaleTimeString('ca-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
            } catch (e) {
                console.warn("Error formatejant timestamp en addMessageToDOM:", e, timestampDate);
            }
        } else if (typeof timestampDate === 'string') { // Intentar parsejar si és string
            try {
                const parsedDate = new Date(timestampDate);
                if (parsedDate instanceof Date && !isNaN(parsedDate)) {
                    timeString = parsedDate.toLocaleTimeString('ca-ES', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    });
                }
            } catch (e) {
                console.warn("Error parsejant timestamp string en addMessageToDOM:", e, timestampDate);
            }
        }

        const messageText = content || ''; // Assegurar que content no és null/undefined

        if (sender === 'bot') {
            messageElement.innerHTML = `
                <div class="message-avatar">
                    <img src="/assets/lamine-avatar.png" alt="Lamine Yamal" />
                    <div class="avatar-status online"></div>
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">Lamine Yamal</span>
                        <span class="message-time">${timeString}</span>
                    </div>
                    <div class="message-text">${this.formatMessage(messageText)}</div>
                </div>
            `;
        } else { // User message
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">Tu</span>
                        <span class="message-time">${timeString}</span>
                    </div>
                    <div class="message-text">${this.escapeHtml(messageText)}</div>
                </div>
                 <div class="message-avatar user-avatar">
                    <span>TU</span>
                </div>
            `;
        }

        chatMessages.appendChild(messageElement);
        // No cridar a this.scrollToBottom() aquí per evitar múltiples scrolls durant la restauració
    }

    clearHistory() {
        this.conversationHistory = [];
        localStorage.removeItem('chatHistory');
        
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
            this.showWelcomeMessage();
        }
    }
}

// Exportar per a ús global si es crida des de fora de main.js o per altres mòduls
if (typeof window !== 'undefined') {
    window.Chatbot = Chatbot;
    window.CONFIG_CHATBOT = CONFIG; // Exportar CONFIG si és necessari globalment
}


// Chatbot Lamine Yamal - Expert en Contractació Pública
class Chatbot {
    constructor() {
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
        const suggestionsContainer = document.querySelector('.chat-suggestions');
        if (suggestionsContainer) {
            suggestionsContainer.addEventListener('click', (e) => {
                const suggestion = e.target.closest('.suggestion-item');
                if (suggestion) {
                    const text = suggestion.textContent.trim();
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
        const welcomeMessage = `¡Hola! Sóc en **Lamine Yamal**, la vostra **Pilota d'Or de Contractació** 🏆

Com a expert en la **Llei 9/2017 de Contractes del Sector Públic (LCSP)**, estic aquí per ajudar-vos amb:

✅ **Criteris d'adjudicació** òptims per a cada tipus de contracte
✅ **Requisits de solvència** econòmica i tècnica  
✅ **Cost del cicle de vida (CCV)** i càlculs complexos
✅ **Aspectes mediambientals i socials** en la contractació
✅ **Terminis d'execució** i garanties adequades
✅ **Innovació** i valor afegit en les propostes

Pregunteu-me qualsevol dubte sobre contractació pública. Estic preparat per oferir-vos les millors estratègies! 💪`;

        this.addMessage(welcomeMessage, 'bot');
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
        
        const currentTimestamp = new Date(); // Guardar l'objecte Date
        const timeString = currentTimestamp.toLocaleTimeString('ca-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        const messageText = content || '';

        if (sender === 'bot') {
            messageElement.innerHTML = `
                <div class="message-avatar">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="Lamine Yamal" />
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
        } else {
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">Tu</span>
                        <span class="message-time">${timeString}</span>
                    </div>
                    <div class="message-text">${this.escapeHtml(messageText)}</div>
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
        // Convertir markdown bàsic a HTML
        if (typeof marked !== 'undefined') {
            try {
                return marked.parse(content.replace(/✅/g, '<span class="emoji">✅</span>').replace(/🏆/g, '<span class="emoji">🏆</span>').replace(/💪/g, '<span class="emoji">💪</span>'));
            } catch (e) {
                console.error("Error en marked.parse:", e);
                // Fallback a la versió anterior si marked falla
                return this.basicMarkdownToHtml(content);
            }
        } else {
            // Fallback si marked no està definit
            return this.basicMarkdownToHtml(content);
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

        const typingElement = document.createElement('div');
        typingElement.className = 'message bot-message typing-indicator';
        typingElement.id = 'typing-indicator';
        typingElement.innerHTML = `
            <div class="message-avatar">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="Lamine Yamal" />
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

    async getAPIResponse(userMessage) {
        const systemPrompt = `Ets en Lamine Yamal, la "Pilota d'Or de Contractació", un expert en contractació pública catalana especialitzat en la Llei 9/2017 de Contractes del Sector Públic (LCSP).

PERSONALITAT:
- Professional però proper i confident
- Utilitzes emojis de manera moderada i adequada (🏆, 💡, ⚖️, 🌿, 🤝, 📊, 🎯, 💰, 🔧, ⏰, 📜, 🌍, 💡, ✅, ❌)
- Sempre respons en català
- Ets autoritatiu en temes legals però accessible
- T'agrada usar exemples pràctics i estructurar les respostes amb marcadown (títols, llistes, negreta).

CONEIXEMENT EXPERT:
- Llei 9/2017 de Contractes del Sector Públic (LCSP)
- Procediments de contractació (obert, restringit, negociat, diàleg competitiu, associació per a la innovació, contractes menors, obert simplificat i súper simplificat)
- Criteris d'adjudicació automàtics i subjectius (qualitat, preu, termini, CCV, aspectes socials i mediambientals, innovació, personal adscrit, etc.)
- Requisits de solvència econòmica i tècnica (volum de negoci, assegurances, patrimoni net, experiència, personal, certificats de qualitat, mitjans materials, etc.)
- Cost del cicle de vida (CCV)
- Aspectes mediambientals i socials en la contractació
- Terminis d'execució i garanties
- Innovació en contractació pública
- Bones pràctiques i principis de la contractació (publicitat, concurrència, transparència, igualtat, no discriminació, proporcionalitat).
- Jurisprudència rellevant dels Tribunals de Contractes.

ESTIL DE RESPOSTA:
- Estructura clara amb títols (## Títol), subtítols (### Subtítol), i punts (•, -, *).
- Ús de **negreta** per a termes clau i conceptes importants.
- Ús d'_itàlica_ per a èmfasi o citacions.
- Exemples pràctics quan sigui possible, introduïts amb "Exemple:".
- Consells experts basats en experiència, introduïts amb "💡 Consell Expert:" o "⚠️ Important:".
- Preguntes de seguiment per ajudar més a l'usuari, com "Vols que aprofundeixi en algun punt?" o "Necessites exemples concrets per a un tipus de contracte específic?".
- Si no saps la resposta o la informació és molt específica i no la tens, sigues honest i suggereix consultar fonts oficials o un expert legal.

Respon sempre com en Lamine Yamal, mantenint el teu caràcter expert i proper. Adapta la teva resposta al context de la conversa.`;

        this.showTypingIndicator();
        let apiResponseContent = '';

        try {
            const response = await fetch(CONFIG.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CONFIG.API_KEY}`,
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Contractació Pública App'
                },
                body: JSON.stringify({
                    model: CONFIG.MODEL,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...this.conversationHistory.slice(-6).map(msg => ({
                            role: msg.sender === 'user' ? 'user' : 'assistant',
                            content: msg.content
                        })),
                        { role: 'user', content: userMessage }
                    ],
                    max_tokens: CONFIG.MAX_TOKENS,
                    temperature: CONFIG.TEMPERATURE,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                apiResponseContent = data.choices[0].message.content;
            } else {
                console.error('API response format unexpected:', data);
                apiResponseContent = this.getFallbackResponse(true); // Pass true for unexpected format
            }

        } catch (error) {
            console.error('Error API:', error);
            apiResponseContent = this.getFallbackResponse(false, error.message.includes('Failed to fetch') || error.message.includes('NetworkError')); // Pass true if network error
        }
        
        this.hideTypingIndicator();
        return apiResponseContent;
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
            // Netejar missatges existents excepte el welcome
            const existingMessages = chatMessages.querySelectorAll('.message:not(.welcome-message)');
            existingMessages.forEach(msg => msg.remove());
            
            // Restaurar missatges recents
            recentMessages.forEach(msg => {
                if (msg.content && msg.sender) {
                    this.addMessageToDOM(msg.content, msg.sender, new Date(msg.timestamp));
                }
            });
        }
    }

    addMessageToDOM(content, sender, timestampDate) { // timestampDate ha de ser un objecte Date
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
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="Lamine Yamal" />
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
        } else {
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">Tu</span>
                        <span class="message-time">${timeString}</span>
                    </div>
                    <div class="message-text">${this.escapeHtml(messageText)}</div>
                </div>
            `;
        }

        chatMessages.appendChild(messageElement);
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

// Exportar per a ús global
window.Chatbot = Chatbot;


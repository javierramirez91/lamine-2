// Chatbot Lamine Yamal - Expert en Contractació Pública

// Configuració global del Chatbot
const CONFIG = {
    // API_KEY JA NO ÉS NECESSÀRIA AQUÍ, ES GESTIONA AL BACKEND (NETLIFY FUNCTION)
    API_URL: '/.netlify/functions/api-proxy', // Endpoint de la funció de Netlify
    MODEL: 'mistralai/devstral-small:free', // Nou model especificat per l'usuari
    MAX_TOKENS: 1500, 
    TEMPERATURE: 0.65 
};

class Chatbot {
    constructor(config, contentLoader) {
        this.config = config; // Guardem la configuració
        this.chatHistory = [];
        this.chatMessages = document.getElementById('chat-messages');
        this.userInput = document.getElementById('chat-user-input');
        this.sendButton = document.getElementById('chat-send-button');
        this.clearButton = document.getElementById('chat-clear-button');
        this.helpButtons = document.querySelectorAll('.chat-help-btn');
        this.suggestionButtons = document.querySelectorAll('.suggestion-btn');
        this.contentLoader = contentLoader; 

        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => this.sendMessage());
        }
        if (this.userInput) {
            this.userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
        if (this.clearButton) {
            this.clearButton.addEventListener('click', () => this.clearHistory());
        }
        
        this.helpButtons.forEach(button => {
            button.addEventListener('click', () => {
                const helpText = button.getAttribute('data-help');
                if (this.userInput) {
                    this.userInput.value = helpText;
                    this.sendMessage(); // Enviar automàticament el text d'ajuda
                }
            });
        });

        this.suggestionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const suggestionText = button.textContent.trim(); // o button.getAttribute('data-suggestion')
                if (this.userInput) {
                    this.userInput.value = suggestionText;
                    // this.sendMessage(); // Opcional: enviar directament o només omplir l'input
                }
            });
        });

        this.showWelcomeMessage();
    }

    showWelcomeMessage() {
        const welcomeListItems = [
            "Criteris d'adjudicació (qualitat, preu, CCV, socials, ambientals...)",
            "Requisits de solvència (econòmica, tècnica)",
            "Procediments de licitació (obert, restringit, negociat...)",
            "O qualsevol altre dubte sobre la Llei 9/2017!"
        ];

        let listHtml = '<ul class="welcome-list">';
        welcomeListItems.forEach(item => {
            listHtml += `<li>${this.escapeHtml(item)}</li>`;
        });
        listHtml += '</ul>';

        const welcomeMessage = `👋 Hola! Sóc en <strong>Lamine Yamal</strong>, la teva <strong>Pilota d'Or de Contractació</strong> 🏆. Estic afinat amb la darrera LCSP!
<br><br>Com et puc ajudar avui amb la teva estratègia de contractació pública? Pregunta'm sobre:
${listHtml}
Estic llest per xutar i marcar un golàs per tu! ⚽️`;

        this.addMessage(welcomeMessage, 'bot', true); // true indica que és un missatge especial (HTML)
    }

    escapeHtml(unsafe) {
        const div = document.createElement('div');
        div.textContent = unsafe;
        return div.innerHTML;
    }

    formatMessage(text) {
        if (typeof text !== 'string') {
            return '';
        }
        // Si el contingut ja sembla ser HTML (per exemple, el missatge de benvinguda), no el processem.
        if (text.trim().startsWith('<ul class="welcome-list">') || text.trim().startsWith('<p>')) {
            return text;
        }
        return this.basicMarkdownToHtml(text);
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

    addMessage(message, sender, isError = false, isHTML = false) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        const currentTimestamp = new Date(); 
        const timeString = currentTimestamp.toLocaleTimeString('ca-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        const formattedContent = isHTML ? message : this.formatMessage(message);

        if (sender === 'bot') {
            // Avatar per al bot (LY)
            const avatarInitial = this.personality.name.substring(0, 2).toUpperCase();
            messageElement.innerHTML = `
                <div class="message-avatar bot-avatar">
                    <span>${avatarInitial}</span>
                </div>
                <div class="message-content">
                    <div class="message-text">${formattedContent}</div>
                </div>
            `;
        } else { // User message
            // Avatar per a l'usuari (TU) - es podria personalitzar més endavant
            const userAvatarInitial = "TU";
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${this.escapeHtml(message)}</div>
                </div>
                 <div class="message-avatar user-avatar">
                    <span>${userAvatarInitial}</span>
                 </div>
            `;
        }

        chatMessages.appendChild(messageElement);
        this.scrollToBottom();

        // Afegir a l'historial
        this.chatHistory.push({
            content: message,
            sender,
            timestamp: currentTimestamp.toISOString() // Guardar en format ISO
        });
    }

    async sendMessage() {
        const chatInput = document.getElementById('chat-user-input');
        const message = chatInput?.value.trim();
        
        if (!message) return;

        // Netejar input si no és un suggeriment
        chatInput.value = '';
        this.autoResizeTextarea(chatInput);

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

    async fetchOpenRouterAPI(userMessageContent, conversationHistory) {
        const systemPrompt = this.getSystemPrompt();
        const messagesForAPI = [
            { role: "system", content: systemPrompt },
            ...conversationHistory,
            { role: "user", content: userMessageContent }
        ];

        // L'objecte this.config s'ha d'utilitzar aquí
        const requestBody = {
            model: this.config.MODEL, // Utilitza el model de la configuració
            messages: messagesForAPI,
            temperature: this.config.TEMPERATURE, // Passa la temperatura des de la config
            max_tokens: this.config.MAX_TOKENS    // Passa max_tokens des de la config
        };

        try {
            // Utilitza this.config.API_URL per a la trucada
            const response = await fetch(this.config.API_URL, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // La clau API ja no s'envia des d'aquí, es gestiona al proxy
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: { message: "Error desconegut de l'API al processar la resposta d'error." } }));
                console.error('Error de l\'API d\'OpenRouter (via proxy):', response.status, errorData);
                const errorMessage = errorData.error?.message || `Error HTTP: ${response.status}`;
                this.addMessage(`Error de l'API: ${errorMessage}`, 'bot', true);
                return null;
            }

            const data = await response.json();
            return data.choices && data.choices.length > 0 ? data.choices[0].message.content : null;

        } catch (error) {
            console.error('Error en la connexió amb OpenRouter (via proxy):', error);
            this.addMessage("No s'ha pogut connectar amb el servei d'IA. Intenta-ho més tard.", 'bot', true);
            return null;
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

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
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

    saveConversationHistory() {
        try {
            localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory.slice(-50)));
        } catch (error) {
            console.error('Error guardant historial:', error);
        }
    }

    clearHistory() {
        this.chatHistory = [];
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


const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async function(event, context) {
    // Només permetre peticions POST
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Mètode no permès. Si us plau, utilitza POST." }),
            headers: { 'Content-Type': 'application/json' }
        };
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
        console.error("Error: La variable d\'entorn OPENROUTER_API_KEY no està configurada.");
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error de configuració del servidor: la clau API no està disponible." }),
            headers: { 'Content-Type': 'application/json' }
        };
    }

    let requestBody;
    try {
        requestBody = JSON.parse(event.body);
    } catch (e) {
        console.error("Error al parsejar el cos de la petició:", e);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Cos de la petició invàlid." }),
            headers: { 'Content-Type': 'application/json' }
        };
    }

    // Assegurar-nos que el model i els missatges estan presents
    if (!requestBody.model || !requestBody.messages) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "El model i els missatges són requerits en el cos de la petició." }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
    
    // Model per defecte si no es proporciona, o per forçar un model específic si calgués
    const modelToUse = requestBody.model || 'mistralai/devstral-small:free';


    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${openRouterApiKey}`,
                "Content-Type": "application/json",
                // Es poden afegir altres headers que OpenRouter pugui requerir o recomanar
                // "HTTP-Referer": event.headers.referer, // Opcional: per passar el referer del lloc
                // "X-Title": "Lamine Yamal IA", // Opcional: per identificar el teu lloc a OpenRouter
            },
            body: JSON.stringify({
                model: modelToUse,
                messages: requestBody.messages,
                // Pots afegir aquí altres paràmetres que accepti l\'API d\'OpenRouter
                // com temperature, max_tokens, etc., si els vols controlar des del backend
                // o si vols que el frontend els pugui especificar i els reenvies.
                // Per exemple, si el frontend els envia:
                // temperature: requestBody.temperature,
                // max_tokens: requestBody.max_tokens,
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text(); // Intenta obtenir text si no és JSON
            console.error(`Error de OpenRouter: ${response.status} - ${errorBody}`);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: `Error de l\'API externa: ${response.statusText}`, details: errorBody }),
                headers: { 'Content-Type': 'application/json' }
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };

    } catch (error) {
        console.error("Error al connectar amb OpenRouter:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error intern del servidor al connectar amb l\'API externa.", details: error.message }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
}; 
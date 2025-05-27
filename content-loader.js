// Carregador de Contingut Legal - Contractació Pública
class ContentLoader {
    constructor() {
        this.legalContent = {};
        this.isLoaded = false;
    }

    async init() {
        try {
            await this.loadLegalContent();
            this.isLoaded = true;
            console.log('Contingut legal carregat correctament amb informació detallada LCSP.');
        } catch (error) {
            console.error('Error carregant contingut legal:', error);
        }
    }

    async loadLegalContent() {
        this.legalContent = {
            lcspInfo: { // Renamed from 'lcsp' to avoid conflict with article content
                title: "Llei 9/2017 de Contractes del Sector Públic",
                description: "Marc legal principal per a la contractació pública a Catalunya i Espanya.",
                principisGenerals: [
                    "Lliure concurrència i no discriminació",
                    "Igualtat de tracte entre candidats",
                    "Transparència en els procediments",
                    "Proporcionalitat dels requisits",
                    "Integritat i prevenció de la corrupció",
                    "Eficiència en la utilització de fons públics",
                    "Responsabilitat mediambiental i social"
                ],
                articlesClau: {
                    art145: {
                        titol: "Article 145 LCSP - Criteris d'adjudicació del contracte",
                        punts: [
                            "Adjudicació basada en pluralitat de criteris per a la millor relació qualitat-preu (apartat 1).",
                            "Avaluació de la relació qualitat-preu amb criteris econòmics i qualitatius (apartat 2).",
                            "Criteris qualitatius poden incloure: qualitat (característiques tècniques, estètiques, funcionals), organització/qualificació/experiència del personal adscrit (si afecta significativament l'execució), servei postvenda i assistència tècnica, condicions d'entrega o execució, característiques mediambientals o socials, innovació (apartat 2.a i b).",
                            "Requisits dels criteris: vinculats a l'objecte, formulació objectiva, respecte als principis d'igualtat, no discriminació, transparència i proporcionalitat, no conferir llibertat de decisió il·limitada (apartat 5.a).",
                            "Han de garantir avaluació en condicions de competència efectiva i anar acompanyats d'especificacions per comprovar la informació dels licitadors (apartat 5.b i c)."
                        ]
                    },
                    art146: {
                        titol: "Article 146 LCSP - Aplicació dels criteris d'adjudicació",
                        punts: [
                            "Si s'usa un únic criteri, ha d'estar relacionat amb costos (preu o cost del cicle de vida).",
                            "Si s'usen múltiples criteris, detallar-los al plec amb la seva ponderació.",
                            "Criteris dependents de judici de valor: no més del 50% de la puntuació total, tret d'excepcions justificades (ex. contractes de serveis Anexo IV o component intel·lectual rellevant, on qualitat ≥ 51%). Aquesta regla ha estat matisada jurisprudencialment.",
                            "La valoració de criteris subjectes a judici de valor s'encomanarà a un comitè d'experts o organisme tècnic especialitzat."
                        ]
                    },
                    art147: {
                        titol: "Article 147 LCSP - Criteris d'adjudicació relacionats amb aspectes socials o mediambientals",
                        punts: [
                            "Permet la inclusió explícita de criteris per valorar aspectes socials (inserció laboral, igualtat, condicions laborals) i mediambientals (reducció emissions, eficiència energètica, ús de renovables, etc.)."
                        ]
                    },
                    art148: {
                        titol: "Article 148 LCSP - Càlcul del cost del cicle de vida (CCV)",
                        punts: [
                            "Permet avaluar ofertes considerant tots els costos rellevants durant la vida útil.",
                            "Inclou costos d'adquisició, utilització (energia, recursos), manteniment, fi de vida (recollida, reciclatge).",
                            "Pot incloure costos imputats a externalitats mediambientals (emissions GEH) si el seu valor monetari pot ser determinat i verificat.",
                            "Els plecs han d'indicar les dades a facilitar pels licitadors i el mètode de càlcul.",
                            "La metodologia ha de ser objectiva, no discriminatòria i accessible."
                        ]
                    }
                }
            },
            costCicloVida: {
                titol: "El Cost del Cicle de Vida (CCV)",
                descripcioLegal: "Regulat principalment a l'article 148 de la LCSP. Permet una valoració econòmica més completa de les ofertes.",
                components: [
                    { nom: "Costos d'Adquisició", detall: "Preu de compra, costos d'instal·lació, transport, assegurances inicials." },
                    { nom: "Costos d'Utilització", detall: "Consum d'energia (electricitat, combustible), consum d'aigua, consum d'altres recursos (fungibles), costos de formació del personal." },
                    { nom: "Costos de Manteniment", detall: "Manteniment preventiu programat, costos estimats de manteniment correctiu (reparacions, peces de recanvi), costos de personal tècnic." },
                    { nom: "Costos de Fi de Vida", detall: "Costos de desmuntatge o desinstal·lació, costos de transport a planta de tractament, costos de reciclatge, reutilització o eliminació (taxes)." },
                    { nom: "Costos d'Externalitats Mediambientals Monetizables", detall: "Cost d'emissions de CO2, cost d'altres emissions (NOx, SOx, partícules) si hi ha metodologies robustes per a la seva monetització." }
                ],
                metodologiaCalcul: {
                    requisitsPlecs: "Indicar dades a facilitar pels licitadors i el mètode que utilitzarà l'òrgan de contractació.",
                    principisMetodologia: ["Objectiva i no discriminatòria", "Accessible a totes les parts interessades", "Basada en dades verificables."],
                    formesValoracio: [
                        "Com a criteri únic de cost (si es justifica, Art. 146.2.a LCSP).",
                        "Com a criteri principal dins la part econòmica (amb ponderació, puntuació inversament proporcional al CCV calculat)."
                    ],
                    calculExternalitats: "Mètode basat en criteris verificables objectivament, accessible, dades facilitables amb esforç raonable. Es poden usar mètodes comuns UE."
                },
                exemples: [
                    { titol: "Adquisició d'Autobusos Urbans (Vida útil: 12 anys)", detall: "Criteri: Menor CCV. Components: Preu adquisició, consum combustible, manteniment preventiu, peces desgast, emissions CO2/NOx. Valoració: Suma de costos i puntuació inversament proporcional." },
                    { titol: "Subministrament i Instal·lació de Lluminàries LED (Vida útil: 15 anys)", detall: "Criteri mixt: 70% Preu Adquisició, 30% Cost Consum Energètic. Components CCV (parcial): Potència lluminària, hores funcionament. Valoració: Preu per regla de tres inversa, Consum energètic amb puntuació inversament proporcional al cost a 15 anys." }
                ],
                consideracionsJurisprudencials: [
                    "Claredat i Transparència en els plecs (metodologia, dades).",
                    "Justificació de la metodologia i paràmetres utilitzats.",
                    "Verificabilitat de les dades (preferència per dades certificables).",
                    "No Discriminació (el mètode no ha de conduir a tecnologies/proveïdors sense justificació).",
                    "Complexitat vs. Proporcionalitat (valorar si la complexitat és proporcional al contracte)."
                ]
            },
            criterisAdjudicacio: {
                introduccio: "Els criteris d'adjudicació són clau per seleccionar l'oferta amb la millor relació qualitat-preu. Han de ser clars, objectius, vinculats a l'objecte del contracte i no discriminatoris.",
                tipus: {
                    automatics: {
                        titol: "Criteris Avaluables Mitjançant Fórmules (Automàtics/Objectius)",
                        descripcio: "Valoració mitjançant aplicació directa de xifres o fórmules matemàtiques.",
                        exemplesConcretsOCR: [ // Información de la primera imagen
                            { nom: "Mejora Plazo de Garantía", punts: 7.5, descripcio: "Ampliación plazo garantía establecido. Aumento máximo 3 años, valorándose a 2,5 pts/año aumentado. Criterio: fórmula proporcional directa.", categoria:"Garantia" },
                            { nom: "Eficiencia Energética 01", punts: 2, descripcio: "Aporte energías renovables y/o compromiso calificación energética del edificio (o cuantificación mejora). Criterio: 1 punto por letra, máx 2 puntos.", categoria:"Mediambiental" },
                            { nom: "Eficiencia Energética 02", punts: 1, descripcio: "Reducción demanda energía primaria y emisiones CO2 del edificio (respecto a mínims normatius o umbral PPT). Criterio: proporción de magnitudes.", categoria:"Mediambiental" },
                            { nom: "Asistencia Técnica (Dirección Obra)", punts: 3, descripcio: "Número de visitas en fase de Dirección de Obra. Aumento máximo 2 visita/semana, valorándose a 1,5 pts/visita-semana adicional. Criterio: fórmula proporcional directa.", categoria:"Servei" },
                        ],
                        subCriterisDetallats: {
                            preu: {
                                titol: "Criteri Preu",
                                fonamentLegal: ["Art. 145.2.c LCSP", "Art. 146.2.a LCSP", "Art. 102.2 i 102.3 LCSP"],
                                modalitatsPresentacio: ["Preu Global Alçat", "Preus Unitaris", "Percentatge de Descompte", "Sistema Mixte"],
                                formesValoracio: ["Preu Més Baix (binària o directa)", "Fórmules de Proporcionalitat (Regla de Tres Inversa Simple, Regla de Tres Lineal sobre Baixa, Fórmules Polinòmiques)"],
                                baixesAnormals: "Regulat a l'Art. 149 LCSP. Identificació amb paràmetres objectius i procediment contradictori.",
                                jurisprudenciaClau: ["Claredat de fórmules (TACRC 142/2019)", "Proporcionalitat i no discriminació (TACRC 55/2020)", "Preu zero o simbòlic (TACRC 1120/2017)"]
                            },
                            costCicloVidaRef: { // Referencia a la sección detallada
                                titol: "Cost del Cicle de Vida (CCV)",
                                veureSeccio: "costCicloVida"
                            },
                            terminiExecucio: {
                                titol: "Termini d'Execució o Entrega",
                                fonamentLegal: ["Art. 145.2.a LCSP (com a condició d'entrega/execució)"],
                                descripcio: "Valora la reducció del temps per a la realització completa de la prestació.",
                                plecsHanDEspecifiar: ["Termini màxim de referència", "Unitat de mesura per la reducció", "Fórmula exacta de valoració", "Límit a la reducció valorable (termini mínim viable justificat)"],
                                formesValoracio: ["Puntuació Proporcional a la Reducció", "Puntuació per Trams de Reducció", "Màxima Puntuació al Menor Termini Ofertat"],
                                jurisprudenciaClau: ["Viabilitat del termini ofertat", "Penalitzacions per incompliment (Art. 192 LCSP)", "Claredat en la definició", "Límits a la reducció valorable (TACRC 784/2018)"]
                            },
                            garantiaAddicional: {
                                titol: "Període de Garantia Addicional",
                                fonamentLegal: ["Art. 145.2.a LCSP (com a part de qualitat o servei postvenda)", "Art. 210.e LCSP (com a condició especial d'execució)"],
                                descripcio: "Valora l'extensió del període de garantia legal o mínim exigit.",
                                plecsHanDEspecifiar: ["Període de garantia mínim obligatori", "Abast de la garantia addicional valorable", "Unitat de mesura per l'ampliació"],
                                formesValoracio: ["Puntuació Proporcional a l'Ampliació", "Puntuació Fixa per Trams d'Ampliació", "Màxima Puntuació a la Major Ampliació (amb límit)"],
                                jurisprudenciaClau: ["Claredat en l'abast", "Solvència del garant", "Proporcionalitat de la ponderació"]
                            },
                            caracteristiquesTecniquesQuant: {
                                titol: "Característiques Tècniques Quantificables o Certificables",
                                fonamentLegal: ["Art. 145.2.a LCSP (qualitat, característiques tècniques)"],
                                tipologia: ["Rendiment o Eficiència Superior (energètica, consum aigua, velocitat procés)", "Major Durabilitat o Resistència (cicles vida, resistència materials)", "Menors Emissions o Impacte Ambiental Quantificable (NOx, material reciclat, petjada carboni)", "Funcionalitats Addicionals Mesurables (canals, resolució, capacitat)", "Possessió de Segells/Certificacions Específiques de Producte (Ecolabel, EPEAT, etc.)"],
                                formesValoracio: ["Puntuació Directa per Nivell Alcançat", "Puntuació Proporcional a la Millora", "Suma de Punts per Característiques Addicionals"],
                                jurisprudenciaClau: ["Objectivitat i Verificabilitat", "No Restringir Competència Indegudament", "Rellevància per l'Objecte", "Distinció amb Requisits Mínims (TACRC 63/2015)"]
                            },
                            altresPrestacionsQuant: {
                                titol: "Altres Prestacions Addicionals Quantificables",
                                descripcio: "Millores o prestacions addicionals objectivament quantificables i valorables mitjançant fórmula.",
                                exemples: ["Hores de formació addicionals", "Documentació tècnica extra detallada", "Llicències de programari addicionals sense cost", "Equipaments o accessoris complementaris útils", "Compromís de resposta tècnica en termini inferior al màxim", "Major freqüència d'informes"],
                                formesValoracio: ["Puntuació Proporcional a la Quantitat Addicional", "Punts Fixos per Unitat Addicional"]
                            }
                        }
                    },
                    subjectius: {
                        titol: "Criteris la Quantificació dels Quals Depèn d'un Judici de Valor (Subjectius/Qualitatius)",
                        descripcio: "La seva valoració requereix una apreciació tècnica o qualitativa per un comitè d'experts. S'avaluen abans que els criteris automàtics.",
                        principisEssencials: ["Definició clara i detallada als plecs", "Motivació suficient i raonada de la valoració", "Discrecionalitat tècnica vs. Arbitrarietat", "Competència i imparcialitat de l'òrgan de valoració"],
                        jurisprudenciaGeneralRellevant: ["TACRC 1065/2016 (motivació)", "TACRC 785/2019 (major motivació que automàtics)", "TACRC 423/2024 (límits control judicial)"],
                        exemplesConcretsOCR: [ // Información de la primera imagen (parte subjetiva) y segunda imagen
                            { nom: "Mejora del Equipo Técnico (aspectos cualitativos de especialización)", punts: 10, descripcio: "Incorporació perfils tècnics diferents als de l'equip base, amb especialització singular (arqueologia, restauració, etc.). Es valora composició complementària, tasques específiques, justificació de treballs similars i formació. Cada tècnic especialista suma punts.", categoria:"Personal" },
                            { nom: "Criterios Sociales (incorporación arquitectos)", punts: 1.5, descripcio: "Incorporació arquitectes amb menys de 5 anys col·legiació, o reincorporats post-maternitat/paternitat, o en atur de llarga durada. S'atorguen punts per incorporar almenys un arquitecte amb aquestes característiques.", categoria:"Social" },
                            { nom: "Especialización (personal adscrito)", punts: 5, descripcio: "Especialització en treballs similars (redacció projectes/DO) del personal adscrit a l'execució. Es valora per nombre de projectes similars (fins a 5 punts).", categoria:"Personal" },
                            { nom: "Formación continua (personal)", punts: 5, descripcio: "Acreditació de formació contínua del personal integrat. 1 punt cada 3 anys de formació contínua per professional, màxim 5 punts.", categoria:"Personal" },
                            {
                                nom: "Memoria Técnica (Qualitat de la proposta)", punts: 35, // De la segunda imagen
                                subcriteris: [
                                    { nom: "Interés Conceptual y Valor Arquitectónico", fins_a_punts: 8, desc: "Respecte tipologia, ordenació volums, ocupació, relacions espacials/volumètriques." },
                                    { nom: "Valoración solución compositiva y/o estética", fins_a_punts: 7, desc: "Àmbits discursiu i visual, racionalitat, funcionalitat, equilibri espais (interiors, exteriors, entorn)." },
                                    { nom: "Grado de idoneidad a tipología y uso", fins_a_punts: 5, desc: "Innovació, disseny, solucions tècniques/constructives, productes/equips/sistemes prescrits que atenguin millor relació cost-eficàcia (preu i/o CCV art.146 LCSP)." },
                                    { nom: "Características medioambientales", fins_a_punts: 5, desc: "Eficiència energètica, minimització incidències futures (materials/solucions eficients i fàcil manteniment), minimització petjada carboni (anàlisi CV materials/productes/equips/sistemes)." },
                                    { nom: "Incorporación técnicas de bioclimatismo", fins_a_punts: 5, desc: "Implementació noves tecnologies edificació, entorn sostenible, qualitat ambient interior, reducció efectes negatius." },
                                    { nom: "Integración planteamientos que mejoren determinaciones técnicas/económicas PPT", fins_a_punts: 2.5, desc: "No incloïes en altres apartats." },
                                    { nom: "Capacidad de Adecuación al Programa de Necesidades", fins_a_punts: 2.5, desc: "Justificació propostes alternatives, justificació superfícies, funcionalitat, adaptació equipament." }
                                ]
                            },
                            {
                                nom: "Calidad del Servicio (prestación de servicios)", punts: 10, // De la segunda imagen, asumiendo que "Servicio: 10,00" se refiere a esto.
                                subcriteris: [
                                    { nom: "Nivel de detalle contenido técnico propuesta (estudio previo/anteproyecto)", fins_a_punts: 2 },
                                    { nom: "Nivel de cumplimiento recomendaciones/especificaciones técnicas PPT", fins_a_punts: 2 },
                                    { nom: "Análisis preliminar cumplimiento exigencias básicas normativas (CTE, accesibilidad)", fins_a_punts: 1 },
                                    { nom: "Estudio de viabilidad Económica de la propuesta", fins_a_punts: 5 }
                                ]
                            }
                        ],
                        subCriterisDetallats: {
                            qualitatTecnica: { // Ampliado con información del texto y OCR
                                titol: "Qualitat Tècnica de la Proposta / Memòria Tècnica Descriptiva",
                                fonamentLegal: ["Art. 145.2.a LCSP (qualitat, característiques tècniques/estètiques/funcionals)"],
                                objecteValoracio: ["Coherència global", "Comprensió necessitats", "Adequació i viabilitat solucions tècniques", "Nivell detall i rigor documentació", "Robustesa, fiabilitat, escalabilitat", "Integració sistemes", "Claredat expositiva"],
                                desglossamentSubcriterisExemples: ["Comprensió dels Objectius i Necessitats", "Adequació i Disseny de la Solució Tècnica", "Nivell de Detall, Claritat i Rigor Documentació Tècnica", "Viabilitat i Realisme de la Proposta", "(Veure exemples OCR per a desglossament Memòria Tècnica contracte serveis)"],
                                formaValoracioGeneral: ["Establiment d'escales/nivells", "Anàlisi individualitzat i comparatiu", "Informe de valoració detallat (identificar membres comitè, procés avaluació, resum proposta, puntuació, motivació exhaustiva per subcriteri)"],
                                jurisprudenciaClau: ["Necessitat desglossament subcriteris (TACRC 984/2017, 182/2020)", "Motivació exhaustiva i comparativa (TACRC 709/2018)", "Informe tècnic no pot contradir plec", "Límits control judicial discrecionalitat tècnica"]
                            },
                            metodologiaPlaTreball: {
                                titol: "Metodologia o Pla de Treball",
                                fonamentLegal: ["Art. 145.2.a LCSP (qualitat, procés producció/prestació)"],
                                objecteValoracio: ["Adequació metodologia", "Claredat i coherència pla de treball", "Identificació fases/tasques/fites/entregables", "Assignació de recursos", "Mecanismes control i seguiment", "Gestió riscos execució", "Protocols comunicació"],
                                desglossamentSubcriterisExemples: ["Adequació i Detall Planificació Tasques i Cronograma", "Assignació Recursos i Mitjans", "Sistema Control Qualitat, Seguiment i Reporting", "Gestió Riscos i Pla Contingències", "Protocols Comunicació i Coordinació"],
                                formaValoracioGeneral: ["Definició nivells qualitat/compliment", "Anàlisi individualitzat i comparatiu", "Informe valoració detallat"],
                                jurisprudenciaClau: ["Distinció amb solvència", "Valorar plans concrets, no intencions genèriques", "Necessitat concreció plecs (TACRC 388/2018)", "Motivació detallada (TACRC 1118/2024)"]
                            },
                            personalAdscrit: {
                                titol: "Organització, Qualificació i Experiència del Personal Adscrit al Contracte",
                                fonamentLegal: ["Art. 145.2.a LCSP (si qualitat personal afecta significativament millor execució)"],
                                descripcio: "Valora idoneïtat equip humà específic per al contracte.",
                                distincioSolvencia: "Solvència és aptitud mínima general; criteri adjudicació valora personal concret per a AQUEST contracte.",
                                doctrinaTJUE_C601_13: "Experiència equip concret pot ser característica intrínseca oferta, vinculada a qualitat professional.",
                                requisitsInclusioComACriteri: ["Experiència superior al mínim de solvència", "Compliment Art. 145.5 LCSP", "Justificació a l'expedient (Art. 116.4 LCSP) que qualitat personal afecta execució (TCCSP 88/2019)"],
                                desglossamentSubcriterisExemples: ["Estructura Organitzativa i Coordinació Equip", "Qualificació Acadèmica i Formació Específica Addicional Personal Clau", "Experiència Professional Específica i Rellevant Personal Clau", "Dedicació Horària Efectiva Personal Clau", "Pla Gestió Coneixement, Estabilitat i Mecanismes Substitució Personal"],
                                formaValoracioGeneral: ["Identificació personal clau als plecs", "Presentació documentació (CVs, cartes compromís)", "Valoració per Comitè Experts", "Compromís adscripció i substitució (amb aprovació òrgan contractació)"],
                                jurisprudenciaClau: ["Vinculació a l'objecte", "No discriminació PIMEs", "Intentar objectivació", "Mínim és solvència, millora és criteri (TACRC 135/2019)", "Compromís adscripció efectiu (TACRC 678/2021)"]
                            },
                            caracteristiquesMediambientalsQualit: {
                                titol: "Característiques Mediambientals (Subjectes a Judici de Valor)",
                                fonamentLegal: ["Art. 1.3 LCSP (transversal)", "Art. 145.2.b LCSP", "Art. 147 LCSP"],
                                objecteValoracioExemples: ["Qualitat Pla Gestió Ambiental específic", "Propostes minimització residus innovadores", "Plans protecció biodiversitat", "Ús tècniques constructives/productives menor impacte", "Qualitat anàlisi cicle vida qualitatiu"],
                                desglossamentSubcriterisExemples: ["Qualitat i Abast Pla Gestió Ambiental Específic", "Propostes Innovadores Minimizació Residus i Ús Eficient Recursos", "Qualitat Pla Protecció Biodiversitat", "Qualitat Anàlisi Cicle Vida (ACV) Qualitatiu"],
                                jurisprudenciaClau: ["Vinculació estricta objecte (TJUE C-448/01, TACRC 175/2019)", "No discriminació i verificabilitat", "Evitar doble valoració", "Precisió definició (no genèrics)", "Caràcter addicional propostes (TACRC 831/2020)"]
                            },
                            caracteristiquesSocialsQualit: {
                                titol: "Característiques Socials (Subjectes a Judici de Valor)",
                                fonamentLegal: ["Art. 1.3 LCSP", "Art. 145.2.b LCSP", "Art. 147 LCSP"],
                                objecteValoracioExemplesOCR: ["Inserció laboral col·lectius vulnerables", "Subcontractació Centres Especials Ocupació/Empreses Inserció", "Plans igualtat gènere aplicats a execució", "Foment contractació femenina", "Mesures conciliació", "Millora condicions laborals/salarials", "Formació i protecció salut/seguretat personal adscrit"],
                                desglossamentSubcriterisExemples: ["Qualitat i Abast Pla Inserció Laboral Col·lectius Vulnerables", "Qualitat i Impacte Pla Igualtat Gènere Específic Contracte", "Qualitat Propostes Millora Condicions Laborals Personal Adscrit"],
                                jurisprudenciaClau: ["Vinculació estricta execució contracte (no política general empresa)", "Verificabilitat", "No discriminació", "Claredat i precisió plecs", "Proporcionalitat ponderació"]
                            },
                            innovacioSolucio: {
                                titol: "Innovació de la Solució",
                                fonamentLegal: ["Art. 145.2.a LCSP", "Art. 1.3 LCSP"],
                                objecteValoracio: ["Originalitat i grau novetat", "Valor afegit i beneficis tangibles", "Viabilitat tècnica i econòmica", "Maduresa innovació (TRL)"],
                                desglossamentSubcriterisExemples: ["Grau Novetat i Originalitat", "Valor Afegit i Beneficis Concrets", "Viabilitat Tècnica i Maduresa", "Potencial Escalabilitat o Replicabilitat"],
                                formaValoracioGeneral: ["Definició clara problema/repte", "Evitar restricció excessiva", "Comitè experts amb visió futur", "Motivació detallada"],
                                jurisprudenciaClau: ["Vinculació objecte i necessitats reals", "Claredat definició criteri (TACRC 200/2019)", "Evitar discriminació tecnològica", "Equilibri risc/innovació", "Motivació rigorosa"]
                            },
                            serveiPostvendaAssistenciaTecnicaQualit: {
                                titol: "Servei Postvenda i Assistència Tècnica (Aspectes Qualitatius)",
                                fonamentLegal: ["Art. 145.2.a LCSP"],
                                objecteValoracio: ["Qualitat Pla Suport i Manteniment", "Organització SAT (personal, nivells, escalat)", "Proactivitat servei (manteniment predictiu)", "Qualitat documentació suport", "Procediments gestió garanties/reparacions", "Disponibilitat i qualificació personal suport", "Plans formació ús/manteniment bàsic"],
                                desglossamentSubcriterisExemples: ["Qualitat i Exhaustivitat Pla Suport i Manteniment", "Organització i Mitjans SAT", "Qualitat Documentació Suport i Eines Autoajuda", "Qualitat Plans Formació Ús i Manteniment Bàsic"],
                                jurisprudenciaClau: ["Concreció i detall plecs", "Distinció obligacions mínimes garantia", "Realisme i credibilitat propostes", "Valorar qualitat aplicada al contracte, no simple existència SAT", "Motivació basada en elements concrets pla ofertat"]
                            },
                            milloresRequisitsMinimsQualit: {
                                titol: "Millores sobre els Requisits Mínims (Subjectes a Judici de Valor)",
                                fonamentLegal: ["Art. 145.2.a LCSP (qualitat, característiques tècniques/funcionals/estètiques)", "Innovació"],
                                descripcio: "Valora prestacions, característiques o funcionalitats addicionals ofertes per sobre dels mínims del PPT, amb valoració qualitativa.",
                                condicionsMillores: ["No ser requisits encoberts", "No modificar substancialment objecte contracte", "Ser gratuïtes o incloses en preu ofertat"],
                                desglossamentSubcriterisOEspecificacioAmbits: ["Definir àmbits/categories de millores valorables (programari, materials obra, procediments servei)", "Establir com descriure i justificar millores", "Indicar paràmetres qualitatius per jutjar valor"],
                                exemplesAmbitsSubcriteris: ["Millores Funcionalment Programari (Utilitat i Rellevància Funcionalitats Addicionals)", "Millores Qualitat Materials Obra (Impacte en Durabilitat/Manteniment/Sostenibilitat)", "Millores Prestació Servei Atenció Ciutadà (Innovació i Eficàcia en Experiència Ciutadà)"],
                                formaValoracioGeneral: ["Presentació separada i clara", "Llista tancada (recomanable) o oberta de millores", "Valoració per Comitè Experts", "No puntuació de 'no millores' o irrellevants", "Motivació rigorosa"],
                                jurisprudenciaClau: ["Definició precisa plecs (TACRC 115/2018)", "No alteració objecte contracte", "Gratuïtat i no condicionament", "Objectivitat en valoració (beneficis reals)", "Evitar valorar elements que haurien de ser requisits mínims", "Proporcionalitat ponderació"]
                            },
                            caracteristiquesEstetiquesFuncionalsQualit: {
                                titol: "Característiques Estètiques o Funcionals (Subjectes a Judici de Valor)",
                                fonamentLegal: ["Art. 145.2.a LCSP (qualitat, característiques estètiques/funcionals)"],
                                descripcio: "Valora aspectes d'aparença visual, disseny, ergonomia, usabilitat o adequació funcional qualitativa.",
                                objecteValoracio: ["Estètica (bellesa, harmonia, originalitat, adequació entorn)", "Funcionalitat Qualitativa (usabilitat, UX, ergonomia, adaptabilitat)", "Coherència forma/funció", "Capacitat transmissió valors/sensacions"],
                                desglossamentSubcriterisExemples: [
                                    "Estètica: Originalitat i Qualitat Disseny; Adequació Context/Entorn; Capacitat Comunicativa/Representativa Disseny",
                                    "Funcionalitat: Usabilitat i Experiència Usuari (UX); Ergonomia i Confort"
                                ],
                                formaValoracioGeneral: ["Presentació elements visuals/prototips", "Comitè experts amb perfil adequat", "Definició paràmetres 'bon disseny/funcionalitat'", "Evitar 'm'agrada/no m'agrada' simplista", "Possibilitat sessions presentació (regulades)"],
                                jurisprudenciaClau: ["Justificació rellevància criteri", "Composició comitè experts (TACRC 544/2013)", "Risc subjectivitat extrema (motivació acurada)", "No ser únic criteri o preponderant sense justificació forta", "Plecs han de guiar subjectivitat"]
                            },
                             accessibilitatUniversalQualit: { // Nueva sección basada en mención en OCR
                                titol: "Accessibilitat Universal i Disseny per a Tothom (Aspectes Qualitatius)",
                                fonamentLegal: ["Art. 145.2.a LCSP (implícit en qualitat i característiques funcionals)", "Legislació específica sobre accessibilitat"],
                                descripcio: "Valora les propostes que van més enllà dels requisits mínims d'accessibilitat, oferint solucions que milloren significativament l'ús i la comprensió per a persones amb diverses capacitats.",
                                objecteValoracio: [
                                    "Qualitat de les solucions d'accessibilitat proposades (física, sensorial, cognitiva).",
                                    "Aplicació de principis de disseny universal en la proposta global.",
                                    "Superació dels estàndards mínims d'accessibilitat (ex. WCAG per a webs, normatives UNE específiques).",
                                    "Innovació en solucions d'accessibilitat.",
                                    "Consideració de les necessitats de diversos col·lectius d'usuaris."
                                ],
                                desglossamentSubcriterisExemples: [
                                    "Qualitat i detall del Pla d'Accessibilitat per al projecte/servei.",
                                    "Propostes d'adaptació específica per a diferents tipus de discapacitat.",
                                    "Usabilitat i facilitat d'ús de les solucions d'accessibilitat proposades.",
                                    "Formació del personal en atenció a persones amb diversitat funcional (si aplica al servei)."
                                ],
                                formaValoracioGeneral: ["Presentació de memòria específica o secció detallada sobre accessibilitat.", "Valoració per comitè amb coneixements en accessibilitat.", "Motivació basada en l'impacte real de les mesures proposades."],
                                jurisprudenciaClau: ["Necessitat de concreció en els plecs.", "Vinculació amb l'objecte del contracte.", "Valoració de millores efectives sobre els mínims legals."]
                            },
                            condicionsEntregaExecucioQualit: {
                                titol: "Condicions d'Entrega o Execució (Aspectes Qualitatius)",
                                fonamentLegal: ["Art. 145.2.a LCSP (condicions entrega/execució, procés producció/prestació)"],
                                descripcio: "Valora aspectes qualitatius de la forma, mode, seguretat, logística o minimització de molèsties durant l'entrega o execució.",
                                objecteValoracio: ["Qualitat Pla Entrega/Execució", "Mesures integritat subministraments", "Protocols coordinació", "Minimització molèsties/interferències", "Mesures seguretat i salut laboral superiors a mínims", "Qualitat plans prova/posada en marxa/integració", "Flexibilitat/adaptabilitat condicions entrega"],
                                desglossamentSubcriterisExemples: ["Qualitat i Detall Pla Logística i Entrega (Subministraments)", "Propostes Minimizació Molèsties i Impactes Durant Execució (Obres/Serveis in situ)", "Qualitat Pla Seguretat i Salut Laboral Específic (Superant mínims)", "Qualitat Pla Proves, Posada en Marxa i Integració (Sistemes)"],
                                formaValoracioGeneral: ["Descripció en oferta tècnica", "Avaluació per Comitè Experts", "Concreció i verificabilitat compromisos", "Informe motivat"],
                                jurisprudenciaClau: ["Vinculació objecte i proporcionalitat", "Claredat plecs", "No confondre amb obligacions mínimes", "Possibilitat verificació", "Motivació detallada"]
                            }
                        }
                    }
                }
            },
            solvencia: { // Ampliado con información del OCR y el texto
                titol: "Requisits de Solvència",
                descripcio: "Condicions mínimes d'aptitud per participar i executar el contracte. Regulats als Arts. 86-94 LCSP. No confondre amb criteris d'adjudicació.",
                tipusSegonsContracteLCSP: [ // De la imagen 3
                    { tipus: "Obres", article: "Art. 88 LCSP", exemples: "Relació obres executades, tècnics, maquinària, classificació (si escau)." },
                    { tipus: "Subministraments", article: "Art. 89 LCSP", exemples: "Relació principals subministraments, mostres, descripció instal·lacions tècniques, sistemes gestió cadena subministrament, certificats qualitat." },
                    { tipus: "Serveis", article: "Art. 90 LCSP", exemples: "Relació principals serveis, tècnics/unitats tècniques, titulacions/experiència personal, mesures gestió mediambiental, mitjans humans/materials, capacitat producció." }
                ],
                economica: {
                    titol: "Solvència Econòmica i Financera (Art. 87 LCSP)",
                    descripcio: "Garanteix la fortalesa financera per afrontar obligacions i riscos del contracte.",
                    mitjans: [
                        { nom: "Volum Anual de Negocis (Art. 87.1.a)", detall: "Global o específic de l'àmbit del contracte, referit al millor exercici dels 3 últims anys. Límit general: no excedir 1,5 vegades el VEC (o valor mitjà anual del VEC en plurianuals), excepte justificació. Considerar que alt volum no garanteix salut financera total." },
                        { nom: "Assegurança d'Indemnització per Riscos Professionals (Art. 87.1.b)", detall: "Justificant d'existència i vigència. Comú en serveis professionals. Import cobertura proporcional, límit general 1.500.000€ (excepte justificació)." },
                        { nom: "Patrimoni Net o Ràtio de Solvència Financera (Art. 87.1.c)", detall: "Acreditar nivell mínim de Patrimoni Net o ràtio entre Actius i Passius. Basat en comptes anuals aprovats i dipositats." }
                    ],
                    consideracionsGenerals: "Justificació, proporcionalitat, no restricció indeguda de competència."
                },
                tecnica: {
                    titol: "Solvència Tècnica o Professional",
                    descripcio: "Acredita capacitat tècnica i coneixements per executar correctament el contracte.",
                    mitjansPrincipals: [
                        {
                            nom: "Experiència de l'Empresa en Treballs Similars",
                            periodeReferencia: { obres: "Últims 5 anys (Art. 88.1.a)", subministraments: "Últims 3 anys (Art. 89.1.a)", serveis: "Últims 3 anys (Art. 90.1.a)" },
                            definicioSimilar: "El plec ha de definir amb claredat. No limitar a tipus d'entitat o territori sense justificació. CPV per serveis/subministraments (precaució amb generalitat 3 primers dígits). Obres: grup/subgrup classificació.",
                            proporcionalitat: "No exigir nombre desproporcionat de treballs previs ni valor excessiu.",
                            empresesNovaCreacio: "Per contractes sota certs llindars (Obres VEC < 500.000€, Subm./Serv. no SARA), admetre obligatòriament mitjans alternatius per empreses < 5 anys (Arts. 88.4, 89.4, 90.5 LCSP). Error comú ometre-ho."
                        },
                        {
                            nom: "Qualificació i Experiència del Personal (com a solvència)",
                            detall: "Exigir titulacions i experiència mínima del personal que potencialment executarà. Distingir de criteri d'adjudicació que valora equip concret ofertat.",
                            fonament: ["Art. 90.1.e LCSP (serveis)", "Art. 88.1.b LCSP (obres)"]
                        },
                        {
                            nom: "Certificats de Qualitat i Gestió Mediambiental (ISO, UNE, EMAS)",
                            qualitat: { fonament: "Art. 93 LCSP", detall: "Relació amb objecte, proporcionalitat. Admetre equivalents UE i altres proves." },
                            mediambiental: { fonament: "Art. 94 LCSP", detall: "Referència a EMAS o altres reconeguts. Admetre equivalents UE i altres proves." },
                            consideracions: "Impacte en PIMEs. Exposició Motius LCSP: certificats gestió mediambiental com a condició solvència tècnica."
                        },
                        {
                            nom: "Mostres, Descripcions i Fotografies de Productes",
                            fonament: "Art. 89.1.c LCSP (subministraments)",
                            detall: "Per verificar compliment especificacions mínimes. Presentació abans fi termini ofertes. Plec ha d'indicar devolució i cost."
                        },
                        {
                            nom: "Mitjans Materials Mínims (Instal·lacions, Maquinària, Equip Tècnic)",
                            fonament: ["Art. 88.1.d (obres)", "Art. 89.1.d (subministraments)", "Art. 90.1.g (serveis)"],
                            detall: "Exigir si són objectivament necessaris, rellevants i proporcionals. Acreditar disponibilitat (no propietat necessàriament)."
                        }
                    ]
                }
            },
            conclusionsBonesPractiques: {
                 titol: "Bones Pràctiques Generals en la Definició de Criteris i Solvència",
                 punts: [
                    "Planificació i Estudi Previ: Analitzar adequadament les necessitats i el mercat abans de definir requisits.",
                    "Redacció Clara i Precisa dels Plecs: Evitar ambigüitats que generin incertesa o impugnacions.",
                    "Foment de la Concurrència: Dissenyar requisits de solvència i criteris d'adjudicació que no restringeixin innecessàriament la participació, especialment de PIMEs i empreses de nova creació.",
                    "Proporcionalitat: Tant la solvència exigida com la ponderació dels criteris han de ser proporcionals a l'objecte i valor del contracte.",
                    "Distinció Clara Solvència/Criteris: No utilitzar un requisit de solvència com a criteri d'adjudicació, tret que es valori una millora substancial sobre el mínim.",
                    "Desglossament de Criteris Subjectius: Detallar els subcriteris i paràmetres de valoració per evitar l'arbitrarietat.",
                    "Motivació Exhaustiva: Justificar totes les decisions, especialment en la valoració de criteris subjectius i en l'exclusió d'ofertes.",
                    "Ús Adequat de les Millores: Definir clarament quines millores es valoraran i com, evitant que alterin l'objecte del contracte.",
                    "Formació Contínua: El personal implicat en la contractació ha d'estar actualitzat en normativa i bones pràctiques."
                 ]
            }
        };
    }

    // Mètodes per accedir al contingut
    getLcspInfo() {
        return this.legalContent.lcspInfo || null;
    }

    getArticleInfo(articleKey) {
        return this.legalContent.lcspInfo?.articlesClau?.[articleKey] || null;
    }
    
    getCostCicloVidaInfo() {
        return this.legalContent.costCicloVida || null;
    }

    getCriteriaInfo(type = null) {
        if (!this.legalContent.criterisAdjudicacio) return null;
        if (!type) {
            return this.legalContent.criterisAdjudicacio;
        }
        return this.legalContent.criterisAdjudicacio.tipus?.[type] || null;
    }
    
    getDetailedCriteriaInfo(type, subCriteriKey) {
        const criteriaType = this.getCriteriaInfo(type);
        return criteriaType?.subCriterisDetallats?.[subCriteriKey] || null;
    }

    getSolvencyInfo(type = null) {
        if (!this.legalContent.solvencia) return null;
        if (!type) {
            return this.legalContent.solvencia;
        }
        return this.legalContent.solvencia[type] || null;
    }

    getSpecialAspects(type = null) { // Assuming aspectsEspecials structure exists or will be added
        if (!this.legalContent.aspectesEspecials) return null;
        if (!type) {
            return this.legalContent.aspectesEspecials;
        }
        return this.legalContent.aspectesEspecials[type] || null;
    }
    
    getBonesPractiques() {
        return this.legalContent.conclusionsBonesPractiques || null;
    }

    searchContent(query) {
        const results = [];
        const searchTerm = query.toLowerCase();

        const searchInObject = (obj, path, type) => {
            for (const key in obj) {
                if (typeof obj[key] === 'string' && obj[key].toLowerCase().includes(searchTerm)) {
                    results.push({ type, section: path.join('.'), item: obj[key], relevance: 2 });
                } else if (obj[key]?.title?.toLowerCase().includes(searchTerm)) {
                     results.push({ type, section: path.join('.'), item: obj[key], relevance: 5 });
                } else if (obj[key]?.descripcio?.toLowerCase().includes(searchTerm)) {
                     results.push({ type, section: path.join('.'), item: obj[key], relevance: 3 });
                } else if (Array.isArray(obj[key])) {
                    obj[key].forEach((item, index) => {
                        if (typeof item === 'string' && item.toLowerCase().includes(searchTerm)) {
                            results.push({ type, section: `${path.join('.')}.${key}[${index}]`, item: item, relevance: 1 });
                        } else if (typeof item === 'object' && item !== null) {
                            searchInObject(item, [...path, key, index], type);
                        }
                    });
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    searchInObject(obj[key], [...path, key], type);
                }
            }
        };
        
        if (this.legalContent.lcspInfo) searchInObject(this.legalContent.lcspInfo, ['LCSP'], 'Marc Legal');
        if (this.legalContent.costCicloVida) searchInObject(this.legalContent.costCicloVida, ['CCV'], 'Cost Cicle Vida');
        if (this.legalContent.criterisAdjudicacio) searchInObject(this.legalContent.criterisAdjudicacio, ['Criteris Adjudicació'], 'Criteris Adjudicació');
        if (this.legalContent.solvencia) searchInObject(this.legalContent.solvencia, ['Solvència'], 'Solvència');
        if (this.legalContent.conclusionsBonesPractiques) searchInObject(this.legalContent.conclusionsBonesPractiques, ['Bones Pràctiques'], 'Bones Pràctiques');
        
        // Simple relevance boost for title matches
        results.forEach(res => {
            if (res.item?.titol && typeof res.item.titol === 'string' && res.item.titol.toLowerCase().includes(searchTerm)) {
                res.relevance += 5;
            }
        });
        return results.sort((a, b) => b.relevance - a.relevance).slice(0, 15); // Limit results
    }


    calculateRelevance(item, searchTerm) { // Basic relevance, can be improved
        let relevance = 0;
        if (item.nom && item.nom.toLowerCase().includes(searchTerm)) relevance += 10;
        if (item.descripcio && item.descripcio.toLowerCase().includes(searchTerm)) relevance += 5;
        if (item.titol && item.titol.toLowerCase().includes(searchTerm)) relevance += 8;
        
        // Check other string properties
        for (const key in item) {
            if (typeof item[key] === 'string' && item[key].toLowerCase().includes(searchTerm)) {
                relevance +=1;
            }
        }
        return relevance;
    }

    generateSuggestions(context = '') {
        const suggestions = [];
        const lowerContext = context.toLowerCase();

        if (lowerContext.includes('criteri') || lowerContext.includes('adjudicació')) {
            suggestions.push(
                "Quins són els principis dels criteris d'adjudicació segons l'Art. 145 LCSP?",
                "Com es valora el Cost del Cicle de Vida (CCV)?",
                "Quins subcriteris pot tenir la Qualitat Tècnica d'una proposta?",
                "Explica'm la diferència entre criteris automàtics i subjectius."
            );
        }
        if (lowerContext.includes('solvència') || lowerContext.includes('aptitud')) {
            suggestions.push(
                "Quins són els mitjans de solvència econòmica més comuns?",
                "Com s'acredita l'experiència de l'empresa com a solvència tècnica?",
                "Què diu la LCSP sobre les empreses de nova creació i la solvència?",
                "Poden ser els certificats de qualitat un requisit de solvència?"
            );
        }
         if (lowerContext.includes('termini') || lowerContext.includes('plazo')) {
            suggestions.push(
                "Com es valora el termini d'execució com a criteri d'adjudicació?",
                "Quines consideracions jurisprudencials hi ha sobre el termini d'execució?"
            );
        }
        if (lowerContext.includes('personal') || lowerContext.includes('equip')) {
            suggestions.push(
                "Com es valora l'experiència del personal adscrit al contracte?",
                "Quina és la diferència entre la solvència del personal i el criteri d'adjudicació del personal?",
                "Què va dir el TJUE sobre l'experiència del personal com a criteri?"
            );
        }
        if (lowerContext.includes('mediambiental') || lowerContext.includes('social')) {
            suggestions.push(
                "Exemples de criteris mediambientals qualitatius.",
                "Com es pot valorar la inserció laboral com a criteri social?",
                "Quina vinculació han de tenir els criteris socials/mediambientals amb l'objecte del contracte?"
            );
        }
        if (suggestions.length === 0) {
            suggestions.push(
                "Què diu l'article 145 de la LCSP?",
                "Explica el Cost del Cicle de Vida (CCV).",
                "Quins tipus de criteris subjectius existeixen?",
                "Com s'acredita la solvència tècnica per a serveis?"
            );
        }
        return [...new Set(suggestions)].slice(0, 5); // Unique suggestions, max 5
    }

    getContextualInfo(userMessage) { // Basic contextual info, can be expanded
        const lowerMessage = userMessage.toLowerCase();
        let contextData = {};
        if (lowerMessage.includes('145')) contextData.art145 = this.getArticleInfo('art145');
        if (lowerMessage.includes('148') || lowerMessage.includes('cicle de vida') || lowerMessage.includes('ccv')) {
            contextData.ccv = this.getCostCicloVidaInfo();
        }
        if (lowerMessage.includes('solvència') || lowerMessage.includes('solvencia')) {
             contextData.solvencia = this.getSolvencyInfo();
        }
        if (lowerMessage.includes('criteri')) {
            contextData.criteris = this.getCriteriaInfo();
        }
        return contextData;
    }

    isContentLoaded() {
        return this.isLoaded;
    }
}

window.ContentLoader = ContentLoader;

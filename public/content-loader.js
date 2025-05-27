// Carregador de Contingut Legal - Contractació Pública
class ContentLoader {
    constructor() {
        this.isLoaded = false;
        this.legalContent = {};
        this.imagesData = {
            criteris_automatic_subjectius: null, // Placeholder for first image data
            memoria_tecnica_servei: null,      // Placeholder for second image data
            solvencia_detall: null             // Placeholder for third image data
        };
    }

    async init() {
        try {
            // Simular la càrrega de dades de les imatges (en un cas real, s'extrauria la info)
            this.loadImagesData(); 
            await this.loadLegalContent();
            this.isLoaded = true;
            console.log('ContentLoader inicialitzat i contingut carregat.');
        } catch (error) {
            console.error('Error inicialitzant ContentLoader:', error);
            // Aquí es podria afegir un avís a l'usuari
            throw error; // Rellençar l'error per a que App ho gestioni
        }
    }

    loadImagesData() {
        // Dades extretes manualment de la primera imatge (criteris automàtics i subjectius)
        this.imagesData.criteris_automatic_subjectius = [
            { tipus: 'automatic', nom: "Mejora plazo de Garantía", punts: 7.5, descripcio: "Mejora en la ampliación del plazo de garantía establecido. Aumento máximo considerado técnicamente: 3 años, valorándose a 2,5 ptos/año aumentado en el plazo de garantía ofrecido respecto al establecido con carácter de mínimo en el Pliego de Prescripciones Técnicas. Criterio: fórmula proporcional directa." },
            { tipus: 'subjectiu', nom: "Mejora del Equipo Técnico", punts: 10, descripcio: "Incorporación al equipo técnico redactor de los siguientes perfiles técnicos, siendo estos profesionales distintos a los componentes del citado equipo que aporten un plus de calidad al servicio contratado a través de su perfil especializado en una rama o materia singular que sea requerida. Por ejemplo: arqueología, restauración, calidad, medioambiente... según el tipo de obra. Se presentará documento con la composición complementaria del equipo técnico con el que se concurre, indicándose expresamente el técnico asignado a cada categoría o especialidad, y especificando la concreta labor de que se ocupará cada uno de ellos, con objeto de que para las bajas desproporcionadas habrá de justificar pormenorizadamente el coste de cada uno de ellos y aportar los respectivos contratos. Cada técnico especialista relacionado con el objeto contractual supondrá 2 puntos. En apartado específico se explicitarán aquellos trabajos similares desarrollados, con referencia a la formación específica en la rama de especialidad declarada, que se acreditará mediante certificados expedidos por el órgano competente o destinatario de los trabajos en el caso de proyectos y/o obras realizados, y títulos oficiales en el caso de la formación y área de conocimiento." },
            { tipus: 'automatic', nom: "Eficiencia Energética 01", punts: 2, descripcio: "Aporte de energías renovables y compromiso de calificación energética del edificio, o cuantificación, si procede, de la mejora respecto a la exigencia básica normativa o del requisito establecido por el Órgano de Contratación con carácter de mínimo común. Criterio: 1 punto por letra, con máximo de 2 puntos." },
            { tipus: 'automatic', nom: "Eficiencia Energética 02", punts: 1, descripcio: "Eficiencia energética, concretada en la reducción de la demanda de energía primaria y en las emisiones de CO2 del edificio con relación a las exigencias mínimas normativas, o respecto al umbral prestacional que en este sentido venga determinado por el PPT como mejora respecto al requisito básico por parte del Órgano de Contratación en términos de reducción de la demanda de energía primaria y de las emisiones de CO2 (hay que objetivar el sistema de justificación, habrá que homologar los resultados según el programa de utilización). Criterio: proporción de magnitudes." },
            { tipus: 'automatic', nom: "Asistencia Técnica", punts: 3, descripcio: "Número de visitas en fase de Dirección de Obra. Aumento máximo considerado técnicamente: 1 visita/semana, valorándose a 1,5 pts/visita-semana adicional respecto al establecido con carácter de mínimo en el Pliego de Prescripciones Técnicas. Criterio: fórmula proporcional directa." },
            { tipus: 'subjectiu', nom: "Criterios sociales", punts: 1.5, descripcio: "Incorporación en el equipo de arquitectura adscrito a la ejecución del contrato: a) con menos de 5 años de Colegiación, b) reincorporación al ejercicio profesional de arquitectos en baja por maternidad o paternidad acreditables en los tres años siguientes al nacimiento, c) en situación de desempleo acreditable de al menos dos años. Criterio: se otorgan los puntos por la incorporación de al menos un arquitecto con estas características." },
            { tipus: 'subjectiu', nom: "Especialización", punts: 5, descripcio: "Especialización en trabajos similares. Redacción de proyectos o dirección de obras de similares características por el personal adscrito a la ejecución del contrato (uso característico, superficie construida igual o superior al 75% de la superficie del edificio objeto del servicio). Especialización en trabajos similares al del objeto del contrato. (Hasta 5p) ->4 5p 1.4.1 4p 0 0p" },
            { tipus: 'subjectiu', nom: "Formación continua", punts: 5, descripcio: "La acreditación de una adecuada formación continua del personal integrado en el equipo puntuará con 1 punto cada tres años de formación continua que se acredite por cada profesional con un máximo de 5 puntos." }
        ];

        // Dades extretes manualment de la segona imatge (Memòria Tècnica i Servei)
        this.imagesData.memoria_tecnica_servei = {
            memoria_tecnica: {
                puntuacio_maxima: 35,
                subcriteris: [
                    { nom: "a. Calidad de la propuesta", descripcio: "Interés Conceptual y Valor Arquitectónico de la propuesta respecto de la configuración de la edificación (tipología, ordenación de volúmenes, ocupación, y relaciones espaciales y/o volumétricas).", fins_a_punts: 8 },
                    { nom: "a. Calidad de la propuesta", descripcio: "Valoración de la solución compositiva y/o estética en los ámbitos discursivo y visual, de su racionalidad y funcionalidad, así como del equilibrio entre diferentes espacios que conforman la propuesta (interiores y exteriores, relación con el entorno, e inserción urbana).", fins_a_punts: 7 },
                    { nom: "a. Calidad de la propuesta", descripcio: "Grado de idoneidad de la propuesta a la tipología y uso de la edificación objeto del servicio, teniendo en cuenta la innovación, el diseño y las soluciones técnicas y constructivas aplicadas, así como los productos, equipos y sistemas prescritos que atiendan a la mejor relación coste-eficacia sobre la base de su precio y/o su ciclo de vida, según el art. 148 LCSP.", fins_a_punts: 5 },
                    { nom: "a. Calidad de la propuesta", descripcio: "Características medioambientales de la propuesta. Eficiencia energética de la misma, y reducción de incidencias futuras mediante elección de materiales y soluciones constructivas eficientes y de fácil mantenimiento. Minimización de la huella de las emisiones de carbono con análisis del ciclo de vida de los materiales, productos, equipos y sistemas propuestos.", fins_a_punts: 5 },
                    { nom: "a. Calidad de la propuesta", descripcio: "Incorporación de técnicas de bioclimatismo, y/o implementación de nuevas tecnologías a la edificación, en un entorno sostenible, con objetivo en la calidad del ambiente interior y la reducción de los efectos negativos sobre el entorno.", fins_a_punts: 5 },
                    { nom: "a. Calidad de la propuesta", descripcio: "Integración de planteamientos que garanticen y/o mejoren las determinaciones técnicas y económicas del PPT, no incluidas en otros apartados.", fins_a_punts: 2.5 },
                    { nom: "a. Calidad de la propuesta", descripcio: "Capacidad de Adecuación al Programa de Necesidades proporcionado por el Órgano de Contratación, justificación de propuestas alternativas al programa, justificación de superficies presentadas, justificación de la funcionalidad de la propuesta y adaptación al equipamiento que se propone.", fins_a_punts: 2.5 }
                ]
            },
            servei: {
                puntuacio_maxima: 10,
                subcriteris: [
                    { nom: "b. Calidad del Servicio", descripcio: "Nivel de detalle del contenido técnico de la propuesta a nivel de estudio previo anteproyecto, u otro, según establece el PPT.", fins_a_punts: 2 },
                    { nom: "b. Calidad del Servicio", descripcio: "Nivel de cumplimiento de las recomendaciones/especificaciones técnicas del PPT (promotor/órgano contratación).", fins_a_punts: 2 },
                    { nom: "b. Calidad del Servicio", descripcio: "Análisis preliminar del cumplimiento de las exigencias básicas normativas de la propuesta, en especial de las de seguridad en caso de incendio y accesibilidad.", fins_a_punts: 1 },
                    { nom: "b. Calidad del Servicio", descripcio: "Estudio de viabilidad Económica de la propuesta.", fins_a_punts: 5 }
                ]
            },
            nota: "No podrá incluirse ningún importe o dato que pueda conllevar el conocimiento de la oferta económica del licitador. Su incumplimiento conllevará la exclusión."
        };

        // Dades extretes manualment de la tercera imatge (Solvència)
        this.imagesData.solvencia_detall = [
            { tema: "Medios de Solvencia Permitidos", detall: "Los medios de solvencia técnica varían según el tipo de contrato, como se establece en la LCSP: •Obras: Art. 88 LCSP. •Suministros: Art. 89 LCSP. •Servicios: Art. 90 LCSP." },
            { tema: "Experiencia de la Empresa", detall: "Si se solicita experiencia, debe ser concreta y relacionada con el objeto del contrato. No se debe limitar a características específicas como tipo de entidad o territorio. Para definir \"similares\", se pueden utilizar: •Obras: Grupo y subgrupo predominantes. •Servicios y Suministros: Código CPV (aunque los tres primeros dígitos pueden ser muy generales)." },
            { tema: "Proporcionalidad en la Solicitud de Trabajos Previos", detall: "No exigir demasiados trabajos específicos o previos. En contratos de menor valor (por ejemplo, obras de menos de 500.000 euros o servicios bajo umbrales SARA), se debe permitir a las empresas de nueva creación utilizar medios alternativos (menos de 5 años)." },
            { tema: "Personal Adscrito al Contrato", detall: "La solvencia técnica puede incluir la cualificación y experiencia mínima del personal adscrito. A diferencia de la experiencia de la empresa, la experiencia y cualificación del personal puede ser: Solvencia técnica, Prescripción del pliego técnico, Criterio de adjudicación, Condición especial de ejecución." },
            { tema: "Certificaciones de Calidad (ISO, UNE)", detall: "Pueden exigirse como solvencia, siempre que guarden relación directa con el objeto del contrato. Tener en cuenta que su exigencia podría excluir a pequeñas empresas que no dispongan de ellas." },
            { tema: "Muestras de Producto (para suministros y servicios)", detall: "En contratos de suministros, se puede exigir muestras del producto a entregar. La muestra debe presentarse antes del plazo de presentación de ofertas." },
            { tema: "Medios Materiales Mínimos", detall: "Se pueden solicitar cuando sean relevantes: instalaciones, maquinaria o equipos." }
        ];
    }

    async loadLegalContent() {
        // Aquesta funció podria carregar dades d'un JSON extern en el futur
        // De moment, definim el contingut directament aquí, ampliant-lo amb la nova informació
        this.legalContent = {
            lcspInfo: {
                titol: "Marc Legal LCSP",
                descripcio: "La Llei 9/2017 de Contractes del Sector Públic és la normativa principal que regula la contractació a Espanya.",
                articlesClau: {
                    art131: { titol: "Article 131.1 LCSP", punts: ["Exigeix que els plecs estableixin els criteris d'adjudicació."] },
                    art145: {
                        titol: "Article 145 LCSP - Criteris d'adjudicació del contracte",
                        punts: [
                            "La adjudicació es realitzarà utilitzant una pluralitat de criteris basats en la millor relació qualitat-preu.",
                            "La millor relació qualitat-preu s'avaluarà, generalment, amb criteris econòmics i qualitatius.",
                            "Els criteris qualitatius poden incloure: qualitat (valor tècnic, estètica, funcionalitat, accessibilitat, disseny), organització, qualificació i experiència del personal adscrit (si afecta significativament la millor execució), servei postvenda, assistència tècnica, condicions d'entrega/execució, característiques mediambientals o socials, innovació.",
                            "Requisits dels criteris (Art. 145.5): vinculació a l'objecte, formulació objectiva, respecte als principis d'igualtat, no discriminació, transparència i proporcionalitat, no conferir llibertat de decisió il·limitada, permetre avaluació en competència efectiva, publicitat amb ponderació.",
                            "Ponderació criteris subjectius vs automàtics (Art. 146.2 i 146.3): Generalment, judici de valor no > 50%, excepte justificació. En serveis Anexo IV o component intel·lectual rellevant, qualitat ≥ 51%."
                        ]
                    },
                    art146: {
                        titol: "Article 146 LCSP - Aplicació dels criteris d'adjudicació",
                        punts: [
                            "Si hi ha un sol criteri, ha de ser el preu o un basat en la rendibilitat (com CCV).",
                            "Si hi ha diversos criteris, s'han de detallar al plec amb la seva ponderació.",
                            "Per criteris subjectes a judici de valor, es requereix un informe de valoració motivat d'un comitè d'experts o organisme tècnic especialitzat, emès abans de conèixer els criteris automàtics."
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
                },
                principisGeneralsCriteris: [
                    "Vinculació al objecte del contracte.",
                    "Formulació objectiva (clara, precisa).",
                    "Respecte als principis d'igualtat, no discriminació i transparència.",
                    "Proporcionalitat.",
                    "No conferir una llibertat de decisió il·limitada.",
                    "Publicitat (en PCAP o document descriptiu, amb ponderació).",
                    "Garantir la competència efectiva."
                ]
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
                exemples: this.imagesData.memoria_tecnica_servei?.memoria_tecnica?.subcriteris?.find(sc => sc.descripcio.includes("art. 148 LCSP")) ? [
                    // Incloure aquí exemples si es troben a les imatges o es defineixen manualment
                    { titol: "Adquisició d'Autobusos Urbans (Vida útil: 12 anys)", detall: "Criteri: Menor CCV. Components: Preu adquisició, consum combustible, manteniment preventiu, peces desgast, emissions CO2/NOx. Valoració: Suma de costos i puntuació inversament proporcional." },
                    { titol: "Subministrament i Instal·lació de Lluminàries LED (Vida útil: 15 anys)", detall: "Criteri mixt: 70% Preu Adquisició, 30% Cost Consum Energètic. Components CCV (parcial): Potència lluminària, hores funcionament. Valoració: Preu per regla de tres inversa, Consum energètic amb puntuació inversament proporcional al cost a 15 anys." }
                ] : [
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
                        exemplesConcretsOCR: this.imagesData.criteris_automatic_subjectius?.filter(c => c.tipus === 'automatic') || [],
                        subCriterisDetallats: {
                            preu: { titol: "Criteri Preu", fonamentLegal: ["Art. 145.2.c LCSP", "Art. 146.2.a LCSP"], modalitatsPresentacio: ["Preu Global Alçat", "Preus Unitaris"], formesValoracio: ["Preu Més Baix", "Fórmules Proporcionalitat"], baixesAnormals: "Art. 149 LCSP" },
                            costCicloVidaRef: { titol: "Cost del Cicle de Vida (CCV)", veureSeccio: "costCicloVida" },
                            terminiExecucio: { titol: "Termini d'Execució o Entrega", descripcio: "Valora la reducció del temps. S'han d'especificar límits i fórmula.", exemples: this.imagesData.criteris_automatic_subjectius?.find(c => c.nom.toLowerCase().includes("asistencia tecnica")) ? [this.imagesData.criteris_automatic_subjectius.find(c => c.nom.toLowerCase().includes("asistencia tecnica"))] : [] },
                            garantiaAddicional: { titol: "Període de Garantia Addicional", descripcio: "Valora l'extensió del període de garantia. Especificar abast i unitat.", exemples: this.imagesData.criteris_automatic_subjectius?.find(c => c.nom.toLowerCase().includes("garantía")) ? [this.imagesData.criteris_automatic_subjectius.find(c => c.nom.toLowerCase().includes("garantía"))] : [] },
                            caracteristiquesTecniquesQuant: { titol: "Característiques Tècniques Quantificables", descripcio: "Rendiment, eficiència, durabilitat, emissions (quantificables), certificacions de producte.", exemples: this.imagesData.criteris_automatic_subjectius?.filter(c => c.nom.toLowerCase().includes("eficiencia energética")) || [] },
                            altresPrestacionsQuant: { titol: "Altres Prestacions Addicionals Quantificables", descripcio: "Hores formació, documentació extra, llicències addicionals, etc." }
                        }
                    },
                    subjectius: {
                        titol: "Criteris la Quantificació dels Quals Depèn d'un Judici de Valor (Subjectius/Qualitatius)",
                        descripcio: "La seva valoració requereix una apreciació tècnica o qualitativa per un comitè d'experts. S'avaluen abans que els criteris automàtics.",
                        principisEssencials: ["Definició clara i detallada als plecs", "Motivació suficient i raonada de la valoració", "Discrecionalitat tècnica vs. Arbitrarietat", "Competència i imparcialitat de l'òrgan de valoració"],
                        exemplesConcretsOCR: this.imagesData.criteris_automatic_subjectius?.filter(c => c.tipus === 'subjectiu') || [],
                        subCriterisTextGeneral: [
                            { nom: "Qualitat Tècnica de la Proposta / Memòria Tècnica", descripcio: "Coherència global, comprensió necessitats, adequació solucions, detall i rigor documentació. Veure exemples OCR per a desglossament específic.", subExemples: this.imagesData.memoria_tecnica_servei?.memoria_tecnica?.subcriteris || [] },
                            { nom: "Metodologia o Pla de Treball", descripcio: "Adequació metodologia, claredat pla de treball, identificació fases/tasques, assignació recursos, control i seguiment, gestió riscos." },
                            { nom: "Organització, Qualificació i Experiència del Personal Adscrit", descripcio: "Estructura organitzativa, qualificació acadèmica/formació, experiència específica personal clau, dedicació horària, pla estabilitat/substitució. Diferent de solvència. Veure text 'L'experiència com a criteri d'adjudicació'.", infoAddicionalSource: "experiencia_com_a_criteri" },
                            { nom: "Característiques Mediambientals (Qualitatives)", descripcio: "Qualitat Pla Gestió Ambiental específic, propostes minimització residus innovadores, plans protecció biodiversitat. Vinculació estricta a l'objecte." },
                            { nom: "Característiques Socials (Qualitatives)", descripcio: "Qualitat Pla Inserció Laboral, Pla Igualtat Gènere específic contracte, millora condicions laborals personal adscrit. Vinculació estricta a l'execució contracte.", exemplesText: this.getSocialBenefitExamples() },
                            { nom: "Innovació de la Solució", descripcio: "Originalitat, valor afegit, viabilitat tècnica, maduresa innovació (TRL).", exemplesText: this.getInnovationExamples() },
                            { nom: "Servei Postvenda i Assistència Tècnica (Qualitatius)", descripcio: "Qualitat Pla Suport i Manteniment, organització SAT, proactivitat, qualitat documentació suport, plans formació ús/manteniment.", subExemples: this.imagesData.memoria_tecnica_servei?.servei?.subcriteris || [] },
                            { nom: "Millores sobre els Requisits Mínims (Qualitatives)", descripcio: "Prestacions addicionals valorables qualitativament. No requisits encoberts, no modificar objecte, gratuïtes. Definir àmbits i paràmetres valoració." },
                            { nom: "Característiques Estètiques o Funcionals (Qualitatives)", descripcio: "Aparença visual, disseny, ergonomia, usabilitat. Comitè experts amb perfil adequat. Pliecs han de guiar subjectivitat." },
                            { nom: "Accessibilitat Universal i Disseny per a Tothom (Qualitatives)", descripcio: "Propostes que van més enllà dels mínims d'accessibilitat, millorant ús per a persones amb diverses capacitats." },
                            { nom: "Condicions d'Entrega o Execució (Qualitatives)", descripcio: "Qualitat Pla Entrega/Execució, mesures integritat, protocols coordinació, minimització molèsties, seguretat i salut superiors a mínims." }
                        ],
                        textosClau: {
                            criteris_qualitatius_general: `Els criteris qualitatius poden ser: • La qualitat, inclòs el valor tècnic, les característiques estètiques i funcionals, l'accessibilitat, el disseny, etc. • Les característiques socials... • Les característiques mediambientals... • L'organització, la qualificació i l'experiència del personal adscrit... • El servei postvenda, l'assistència tècnica i les condicions d'entrega... • Les millores... Els criteris qualitatius sempre s'han d'acompanyar de criteris relacionats amb els costos.`, // Extret de text proporcionat
                            experiencia_com_a_criteri: `Tant la doctrina... com les resolucions... havien establert una diferència clara entre les característiques del licitador (solvència) i les de l'oferta (criteri d'adjudicació). Es rebutjava l'experiència com a criteri. Això evoluciona amb la STJUE C-601-13 (26/03/2015): l'experiència dels equips concrets proposats, al contrari que l'experiència general de l'empresa, està lligada a la qualitat professional i pot ser característica intrínseca de l'oferta. La Directiva 2014/24/UE (Cons. 94 i Art. 67.2.b) ho incorpora: organització, qualificació i experiència del personal encarregat si la qualitat del personal afecta significativament l'execució. L'Art. 145.2.2 LCSP ho transposa. Requisits: 1. Experiència per sobre del nivell mínim de solvència (TCCSP 48/2018). 2. Complir requisits Art. 145.5 LCSP (vinculació objecte, objectivitat, etc.). 3. Justificació en expedient que qualitat del personal afecta millor execució (Art. 116.4 LCSP, TCCSP 88/2019).` // Resum extret de text
                        }
                    }
                },
                exemplesPracticsQualitat: {
                    titol: "Exemples Pràctics de Criteris de Qualitat (Enfocament en PYMEs i Startups)",
                    introduccio: "Avaluar la qualitat no implica necessàriament usar criteris subjectes a judici de valor. També hi ha automàtics. És clau transformar els plecs per facilitar l'accés a PYMEs i startups, prioritzant la relació qualitat-preu sobre només preu.",
                    aspectesValorar: [
                        "Innovació tecnològica en les propostes.",
                        "Impacte ambiental positiu o contribucions a la sostenibilitat.",
                        "Beneficis socials, com la contratación de persones de col·lectius vulnerables."
                    ],
                    exemplesDetallats: [
                        {
                            ambit: "Beneficis socials (contractació col·lectius vulnerables)",
                            exempleContracte: "Servei de neteja d'edificis públics",
                            criteriDesc: "Es concediran X punts a ofertes que acreditin la contractació de persones de col·lectius vulnerables:",
                            desglossament: [
                                "X punts per contractar almenys 40% del personal entre persones aturades de llarga durada, majors de 45 anys o víctimes de violència de gènere.",
                                "Y punts addicionals si l'empresa es compromet a oferir formació i certificació professional en neteja.",
                                "Z punts addicionals si s'estableixen programes de promoció interna per a aquests treballadors."
                            ]
                        },
                        {
                            ambit: "Innovació tecnològica",
                            exempleContracte: "Gestió de residus urbans",
                            criteriDesc: "Es valorarà amb X punts la incorporació de tecnologies innovadores en la gestió i recollida de residus:",
                            desglossament: [
                                "Ús de sensors IoT en contenidors per optimitzar rutes i reduir CO2.",
                                "Implementació de plataformes digitals de traçabilitat.",
                                "Ús de vehicles elèctrics o de baixes emissions."
                            ]
                        },
                        {
                            ambit: "Impacte ambiental positiu / Sostenibilitat",
                            exempleContracte: "Subministrament de mobiliari urbà",
                            criteriDesc: "S'atorgaran X punts a propostes que incorporen materials sostenibles i procesos de fabricació amb menor impacte ambiental:",
                            desglossament: [
                                "Ús de fusta certificada.",
                                "Incorporació de materials reciclats/reciclables (mínim 50%).",
                                "Disseny modular que facilita manteniment i allarga vida útil."
                            ]
                        },
                        {
                            ambit: "Contracte de subministrament d'aliments per a menjadors escolars",
                            subseccions: [
                                {
                                    titolSub: "Sostenibilitat i qualitat del producte (X punts)",
                                    desglossament: [
                                        "Ús de productos de proximidad y temporada (fins a A punts).",
                                        "Reducció d'envasos plástics y ús de materiales biodegradables (fins a B punts).",
                                        "Compromís amb la reducció del malbaratament alimentari (fins a C punts)."
                                    ]
                                },
                                {
                                    titolSub: "Impacte social i generació d'ocupació local (Y punts)",
                                    desglossament: [
                                        "Contractació de persones en risc d'exclusió social (fins a D punts).",
                                        "Participació de productors locals i cooperatives agràries (fins a E punts)."
                                    ]
                                },
                                {
                                    titolSub: "Innovació i eficiència en la logística de distribució (Z punts)",
                                    desglossament: [
                                        "Reducció de l'impacte ambiental en l'entrega (vehicles elèctrics, logística optimitzada) (fins a F punts).",
                                        "Sistemes de traçabilitat i control de qualitat (eines digitals) (fins a G punts).",
                                        "Flexibilitat i capacitat de resposta davant necessitats excepcionals (fins a H punts)."
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            solvencia: {
                titol: "Requisits de Solvència (Arts. 86 i ss. LCSP)",
                introduccio: "Condicions mínimes d'aptitud per participar i executar el contracte. Es regulen al PCAP. El caràcter tècnic és innegable.",
                tipusSolvencia: this.imagesData.solvencia_detall || [], // Utilitza dades de la imatge 3
                economica: {
                    titol: "Solvència Econòmica i Financera (Art. 87 LCSP)",
                    descripcio: "Garanteix la fortalesa financera. El mitjà típic és el volum de negoci referit al millor dels últims tres anys.",
                    consideracionsVolumNegoci: [
                        "Que una empresa tingui un determinat volum de negoci no determina que la seva economia estigui sanejada (pot ser menor que deutes a curt termini).",
                        "La solvència ha de ser proporcionada: mai més de 1,5 vegades el valor estimat del contracte (VEC). Compte amb contractes plurianuals: prendre valor mitjà anual com a referència."
                    ],
                    exempleCalculVolumNegoci: "Si el contracte té un VEC de 100.000€/any i dura 3 anys (VEC total 300.000€), no s'exigeix 1,5 x 300.000€, sinó 1,5 x 100.000€ (sobre el valor mitjà anual).",
                    altresMitjansEconomica: [
                        { nom: "Assegurança d'Indemnització per Riscos Professionals (Art. 87.1.b)", detall: "Justificant d'existència i vigència. Comú en serveis professionals. Import cobertura proporcional." },
                        { nom: "Patrimoni Net o Ràtio de Solvència Financera (Art. 87.1.c)", detall: "Acreditar nivell mínim de Patrimoni Net o ràtio entre Actius i Passius." }
                    ]
                },
                tecnica: {
                    titol: "Solvència Tècnica o Professional",
                    descripcio: "Acredita capacitat tècnica i coneixements. Els gestors tècnics tenen un paper clau en definir requisits mínims d'accés, ben definits i proporcionals.",
                    mitjansPerTipusContracte: [
                        "Obres (Art. 88 LCSP): Relació obres executades, tècnics, maquinària, classificació (si escau).",
                        "Subministraments (Art. 89 LCSP): Relació principals subministraments, mostres, descripció instal·lacions tècniques, sistemes gestió cadena subministrament, certificats qualitat.",
                        "Serveis (Art. 90 LCSP): Relació principals serveis, tècnics/unitats tècniques, titulacions/experiència personal, mesures gestió mediambiental, mitjans humans/materials, capacitat producció."
                    ],
                    experienciaEmpresa: {
                        titol: "Experiència de l'Empresa",
                        detall: "Si se sol·licita, ha de ser concreta i relacionada amb l'objecte (no tipus d'entitat, territori, etc.). Per definir 'similar': Obres (grup/subgrup predominant), Serveis/Subministraments (3 primers dígits CPV, amb precaució per generalitat). No exigir massa treballs previs o massa específics."
                    },
                    empresesNovaCreacio: {
                        titol: "Empreses de Nova Creació (< 5 anys)",
                        detall: "Per contractes d'obres VEC < 500.000€ i no SARA (serveis/subministraments VEC < llindars SARA), s'ha de permetre un mitjà alternatiu d'acreditació. Error freqüent no incloure'l concretament."
                    },
                    personalAdscritSolvencia: {
                        titol: "Qualificació i Experiència del Personal (Com a Solvència)",
                        detall: "Es pot exigir la qualificació i experiència mínima del personal a adscriure. Diferent de l'experiència de l'empresa. Pot ser: solvència, prescripció del PPT (mitjans humans mínims), criteri d'adjudicació, o condició especial d'execució."
                    },
                    certificatsQualitatSolvencia: {
                        titol: "Certificats de Qualitat (ISO, UNE) com a Solvència",
                        descripcio: "Es poden exigir si guarden relació directa amb l'objecte i són proporcionals. Compte: poden excloure PYMEs. Recomanable conèixer si són necessaris i si el mercat els té.",
                        regulacioLCSP: "Art. 93 LCSP (per SARA): referència a sistemes basats en normes europees, reconèixer equivalents UE i altres proves. Art. 94 LCSP (Gestió Mediambiental SARA): referència a EMAS o altres reconeguts, reconèixer equivalents i altres proves.",
                        exposicioMotiusLCSP: "LCSP (Exposició de Motius): 'En l'àmbit mediambiental, s'exigeixen certificats de gestió medioambiental a les empreses licitadores, com a condició de solvència tècnica...'",
                        reglaGeneralVsExcepcio: "Com a regla general, els certificats de qualitat són requisit de solvència. Excepcionalment, criteri d'adjudicació si es refereixen a característiques pròpies del producte/servei, no de l'empresa en general (TACRC).",
                        articleFJVazquezMatilla: {
                            titol: "Certificados de calidad en la contratación pública: solvencia técnica como regla general y criterio de adjudicación por excepción",
                            autor: "Fco. Javier Vázquez Matilla",
                            resum: "Analitza circumstàncies i modalitats d'ús dels certificats com a solvència o criteri, examinant marc normatiu i jurisprudència. Explora efectes sobre concurrència (barreres PYMEs) i proposa recomanacions.",
                            puntsClauArticle: [
                                "STJUE Lianakis (C-532/06): Exclou com a criteris d'adjudicació aquells vinculats a l'aptitud dels licitadors, no a identificar l'oferta econòmicament més avantatjosa.",
                                "TACRC 906/2014: Certificats són modus d'acreditar solvència tècnica, no criteris de valoració d'ofertes.",
                                "TACRC 786/2019: Certificats es refereixen a processos productius genèrics de l'empresa, no a característiques de la prestació en si mateixa.",
                                "TACRC 321/2018: Per exigir-los com a solvència: vinculació clara amb objecte, proporcionalitat, admissió d'alternatives. Excepcional com a criteri d'adjudicació.",
                                "TACRC 635/2024 (canvi de postura matisat): Permet ISO 9001/14001 com a criteri si hi ha vinculació clara amb objecte i permeten mesurar rendiment de l'oferta (millor relació qualitat-preu). Requereix motivació en expedient (Art. 116.4 LCSP)."
                            ]
                        }
                    },
                    mostresProducte: {
                        titol: "Mostres del Producte",
                        detall: "En subministraments (i menys en serveis), es poden sol·licitar mostres. Lliurament abans de fi de termini d'ofertes. Es poden valorar criteris amb càrrec a la mostra."
                    },
                    mitjansMaterialsMinims: {
                        titol: "Mitjans Materials Mínims",
                        detall: "Instal·lacions, maquinària, equips. Sol·licitar quan siguin rellevants i amb mesura."
                    }
                },
                fomentPYMES: {
                    titol: "Foment de la Participació de PYMEs i Empreses Emergents",
                    importanciaPYMES: "PYMEs a Espanya: 97% empreses, 63,8% ocupació. Microempreses (<10 empleats): 94% d'aquestes.",
                    lcspArt1: "Obliga a facilitar accés a PYMEs i empreses d'economia social. Malgrat això, LCSP només cita 'PYME' 7 cops, de forma poc útil.",
                    lleiFomentEmpresesEmergents: "Llei 28/2022 (Art. 14.3): Valorar en plecs requisits de solvència i criteris d'adjudicació que facilitin accés a empreses emergents, especialment en zones rurals, promovent productes locals, ecològics, energies renovables.",
                    barreresPYMES: "Estratègia Nacional Contratación Pública 2023-2026: Reconeix barreres (accés informació, procediments). Repte: promoure participació PYME. Causes: falta formació, problemes pagaments, limitació requisits d'accés.",
                    factorsDecisionEmpreses: [
                        "Identificació necessitat i 'pain points' de l'entitat pública.",
                        "Suficiència del preu i termini.",
                        "Criteris d'admissió (CPV, solvència econòmica/tècnica, possibles imposicions geogràfiques).",
                        "Criteris d'adjudicació (claredat, objectivitat, focus de l'entitat pública)."
                    ],
                    impacteCertificatsQualitatEnPYMES: "L'exigència o valoració de certificats de qualitat complica participació PYMEs (costos elevats, processos arduos). Sovint perceben manca de motivació clara o sospites de favoritisme."
                }
            },
            conclusionsBonesPractiques: {
                 titol: "Bones Pràctiques Generals en la Definició de Criteris i Solvència",
                 punts: [
                    "Planificació i Estudi Previ: Analitzar adequadament les necessitats i el mercat abans de definir requisits.",
                    "Redacció Clara i Precisa dels Plecs: Evitar ambigüitats que generin incertesa o impugnacions.",
                    "Foment de la Concurrència: Dissenyar requisits de solvència i criteris d'adjudicació que no restringeixin innecessàriament la participació, especialment de PYMEs i empreses de nova creació.",
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

    // Funcions auxiliars per extreure informació específica dels textos llargs
    getSocialBenefitExamples() {
        // Extreure de this.legalContent.criterisAdjudicacio.exemplesPracticsQualitat.exemplesDetallats
        const socialExample = this.legalContent.criterisAdjudicacio.exemplesPracticsQualitat.exemplesDetallats.find(ex => ex.ambit.includes("Beneficis socials"));
        if (socialExample) {
            return `${socialExample.exempleContracte}: ${socialExample.criteriDesc} ${socialExample.desglossament.join('; ')}`;
        }
        return "Exemples no trobats.";
    }

    getInnovationExamples() {
        const innovationExample = this.legalContent.criterisAdjudicacio.exemplesPracticsQualitat.exemplesDetallats.find(ex => ex.ambit.includes("Innovació tecnològica"));
        if (innovationExample) {
            return `${innovationExample.exempleContracte}: ${innovationExample.criteriDesc} ${innovationExample.desglossament.join('; ')}`;
        }
        return "Exemples no trobats.";
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
        if (type === 'subjectius') {
            // Per a subjectius, buscar dins de subCriterisTextGeneral
            return criteriaType?.subCriterisTextGeneral?.find(sc => sc.nom.toLowerCase().includes(subCriteriKey.toLowerCase())) || null;
        }
        return criteriaType?.subCriterisDetallats?.[subCriteriKey] || null;
    }

    getSolvencyInfo(type = null) {
        if (!this.legalContent.solvencia) return null;
        if (!type) {
            return this.legalContent.solvencia;
        }
        return this.legalContent.solvencia[type] || null;
    }
    
    getSolvencyDetailsForImage() {
        return this.imagesData.solvencia_detall || [];
    }

    getCriteriaExamplesFromImage() {
        return this.imagesData.criteris_automatic_subjectius || [];
    }

    getTechnicalMemoryCriteriaFromImage() {
        return this.imagesData.memoria_tecnica_servei || {};
    }
    
    getPracticalQualityCriteria() {
        return this.legalContent.criterisAdjudicacio?.exemplesPracticsQualitat || null;
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
                } else if (obj[key]?.titol?.toLowerCase().includes(searchTerm) || obj[key]?.nom?.toLowerCase().includes(searchTerm)){
                     results.push({ type, section: path.join('.'), item: obj[key], relevance: 5 });
                } else if (obj[key]?.descripcio?.toLowerCase().includes(searchTerm) || obj[key]?.detall?.toLowerCase().includes(searchTerm)) {
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
        
        // Millorar l'abast de la cerca
        for (const mainSectionKey in this.legalContent) {
            searchInObject(this.legalContent[mainSectionKey], [mainSectionKey], mainSectionKey);
        }
        
        results.forEach(res => {
            if (res.item?.titol?.toLowerCase().includes(searchTerm) || res.item?.nom?.toLowerCase().includes(searchTerm)) {
                res.relevance += 5;
            }
        });
        return results.sort((a, b) => b.relevance - a.relevance).slice(0, 20);
    }

    generateSuggestions(context = '') {
        const suggestions = [];
        const lowerContext = context.toLowerCase();

        if (lowerContext.includes('criteri') || lowerContext.includes('adjudicació')) {
            suggestions.push(
                "Quins són els principis dels criteris d'adjudicació segons l'Art. 145 LCSP?",
                "Com es valora el Cost del Cicle de Vida (CCV)?",
                "Quins subcriteris pot tenir la Qualitat Tècnica d'una proposta?",
                "Explica'm la diferència entre criteris automàtics i subjectius.",
                "Com es valora l'experiència del personal com a criteri?"
            );
        }
        if (lowerContext.includes('solvència') || lowerContext.includes('aptitud')) {
            suggestions.push(
                "Quins són els mitjans de solvència econòmica més comuns?",
                "Com s'acredita l'experiència de l'empresa com a solvència tècnica?",
                "Què diu la LCSP sobre les empreses de nova creació i la solvència?",
                "Poden ser els certificats de qualitat un requisit de solvència?",
                "Detalla la solvència per a contractes d'obres."
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
        if (lowerContext.includes('mediambiental') || lowerMessage.includes('social') || lowerMessage.includes('sostenibilitat')) {
            suggestions.push(
                "Exemples de criteris mediambientals qualitatius.",
                "Com es pot valorar la inserció laboral com a criteri social?",
                "Quina vinculació han de tenir els criteris socials/mediambientals amb l'objecte del contracte?",
                "Dona'm exemples de criteris per fomentar el emprendiment local."
            );
        }
        if (lowerContext.includes('certificat') && lowerContext.includes('qualitat')) {
            suggestions.push(
                "Quan pot ser un certificat de qualitat un criteri d'adjudicació?",
                "Què diu la jurisprudència sobre ISO com a criteri de solvència?",
                "Com afecten els certificats de qualitat a les PYMEs?"
            );
        }
        if (suggestions.length < 5) { // Afegeix suggeriments generals si no hi ha prou específics
            const generalSuggestions = [
                "Què diu l'article 145 de la LCSP?",
                "Explica el Cost del Cicle de Vida (CCV).",
                "Quins tipus de criteris subjectius existeixen?",
                "Com s'acredita la solvència tècnica per a serveis?",
                "Quines són les bones pràctiques per definir criteris?",
                "Quins són els principals procediments de contractació?"
            ];
            for (const sg of generalSuggestions) {
                if (suggestions.length < 5 && !suggestions.includes(sg)) {
                    suggestions.push(sg);
                }
            }
        }
        return [...new Set(suggestions)].slice(0, 5); // Unique suggestions, max 5
    }

    getContextualInfo(userMessage) { 
        const lowerMessage = userMessage.toLowerCase();
        let contextData = {};
        // Aquesta funció es podria expandir per retornar informació més específica basada en paraules clau
        // Per exemple, si l'usuari pregunta per "criteris per a obres", podríem carregar informació específica
        // de this.legalContent.criterisAdjudicacio.tipus.automatics.subCriterisDetallats o similar.
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

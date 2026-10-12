import type { DefenseAnswers, RubricScores } from "../types";

export const defenseQuestions: { id: keyof DefenseAnswers; prompt: string }[] = [
  {
    id: "followUp1",
    prompt:
      "Si un producto vende mucho, pero otro deja mejor margen y menos devoluciones, ¿cómo decidiste qué problema atender primero?",
  },
  {
    id: "followUp2",
    prompt: "¿Qué dato, si estuviera mal capturado, te haría cambiar la recomendación?",
  },
  {
    id: "followUp3",
    prompt: "¿Qué parte de tu recomendación es un hecho observable y qué parte es una suposición?",
  },
];

export const rubricCriteria: { key: keyof RubricScores; label: string; help: string }[] = [
  {
    key: "analytical",
    label: "Razonamiento analítico",
    help: "Usa los datos con lógica y distingue cifras de opiniones.",
  },
  {
    key: "recommendations",
    label: "Calidad de las recomendaciones",
    help: "La acción propuesta es concreta, realista y está ligada al problema.",
  },
  {
    key: "explanation",
    label: "Explicación de las decisiones",
    help: "La traza permite entender por qué eligió ese camino.",
  },
  {
    key: "communication",
    label: "Comunicación",
    help: "Se entiende con claridad, orden y lenguaje profesional.",
  },
  {
    key: "limitations",
    label: "Conciencia de las limitaciones",
    help: "Reconoce lo que estos datos no alcanzan a probar.",
  },
];

export const rubricLevels = [
  { value: 1, label: "1 · Insuficiente" },
  { value: 2, label: "2 · En desarrollo" },
  { value: 3, label: "3 · Suficiente" },
  { value: 4, label: "4 · Sólido" },
  { value: 5, label: "5 · Destacado" },
];

export interface Pathway {
  id: string;
  role: string;
  why: string;
  demonstrated: string[];
  needed: string[];
  nextAction: string;
}

export const pathways: Pathway[] = [
  {
    id: "admin",
    role: "Analista administrativo junior",
    why: "El encargo pide leer una tabla de ventas, comparar resultados y explicar una acción. Ese gesto se parece al apoyo administrativo de un equipo comercial.",
    demonstrated: ["Lectura de tablas", "Comparación de resultados", "Redacción de una recomendación"],
    needed: ["Tablas dinámicas con más de una fuente", "Familiaridad con un ERP", "Reportes ejecutivos de una página"],
    nextAction: "Practicar un segundo ejercicio, también ficticio, que concilie ventas contra un inventario simple.",
  },
  {
    id: "ops",
    role: "Asistente de operaciones",
    why: "Si la recomendación atiende devoluciones, margen o una región débil, el razonamiento se acerca al seguimiento operativo. No sustituye experiencia de piso.",
    demonstrated: ["Detección de un punto débil", "Uso de una tasa simple", "Declaración de límites"],
    needed: ["Seguimiento de incidencias", "Nociones de inventario", "Coordinación con un proveedor"],
    nextAction: "Estudiar cómo se documenta una incidencia y redactar un checklist de revisión de devoluciones.",
  },
  {
    id: "commercial",
    role: "Analista comercial junior",
    why: "Comparar productos y regiones es una base comercial. No demuestra prospección, cierre ni manejo de clientes.",
    demonstrated: ["Comparación entre productos", "Lectura de ingreso y margen", "Comunicación de una prioridad"],
    needed: ["Lectura de un embudo comercial", "Uso básico de un CRM", "Distinción entre meta y resultado"],
    nextAction: "Armar, con datos inventados, un reporte de tres columnas: oportunidad, etapa y siguiente paso.",
  },
];

export const illustrativeProgram = [
  { label: "Proyectos creados", value: 24 },
  { label: "Proyectos completados", value: 17 },
  { label: "Revisiones terminadas", value: 15 },
  { label: "Consideraciones de entrevista", value: 9 },
  { label: "Entrevistas confirmadas", value: 3 },
  { label: "Contrataciones confirmadas", value: 1 },
];

export const safeguardItems = [
  {
    title: "Sin trabajo real no pagado",
    body: "El encargo de esta demostración es ficticio. No pide trabajo productivo para una empresa real.",
  },
  {
    title: "Compensación visible antes de empezar",
    body: "El monto de MXN $1,500 se muestra antes del análisis y está marcado como ilustrativo. No hay pago.",
  },
  {
    title: "Alcance y plazo explícitos",
    body: "El proyecto dura 5 días solo como referencia y se limita a cuatro respuestas sobre un dataset interno.",
  },
  {
    title: "Sin contratación garantizada",
    body: "Ni la constancia ni una consideración de entrevista prometen un puesto, una cita o un salario.",
  },
  {
    title: "Sin certificación automática",
    body: "Completar respuestas, traza o defensa simulada no verifica el trabajo. Hace falta una acción humana.",
  },
  {
    title: "Aprobación humana obligatoria",
    body: "La persona en el rol supervisor completa una rúbrica, escribe retroalimentación y elige el resultado.",
  },
  {
    title: "Uso de IA declarado, no castigado",
    body: "Declarar asistencia de IA forma parte de la evidencia. Ocultarla debilita la confianza; decirla no descalifica.",
  },
  {
    title: "La evidencia te pertenece",
    body: "Puedes ocultar la constancia del perfil de demostración y solicitar una revisión de la retroalimentación.",
  },
  {
    title: "Sin resultados fabricados",
    body: "No hay empleadores, pagos, entrevistas ni colocaciones reales. Las cifras de ejemplo están etiquetadas.",
  },
];

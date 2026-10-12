export const PROJECT = {
  company: "Norte Consultores",
  companyNote: "Empresa ficticia",
  title: "Análisis de ventas y recomendaciones",
  duration: "5 días",
  durationNote: "Plazo ilustrativo. Esta demo no corre un reloj real.",
  compensation: 1500,
  compensationNote: "Monto ilustrativo. No se realiza ningún pago.",
  scope:
    "Revisar 16 filas de ventas ficticias, comparar cuatro productos en cuatro regiones y entregar cuatro respuestas con evidencia. No incluye implementación, contacto con clientes ni trabajo adicional.",
  skills: ["Excel", "Análisis de datos", "Juicio de negocio", "Comunicación"],
  supervisorName: "Laura Espinosa",
  supervisorNote: "Rol simulado. Lo opera quien usa esta demostración.",
  participantNote: "Nombre ficticio de la demostración. Puedes cambiarlo.",
} as const;

export const emptyAnswers = {
  bestProduct: "",
  areaToImprove: "",
  recommendation: "",
  evidence: "",
};

export const emptyTrace = {
  why: "",
  dataInfluenced: "",
  usedAI: "" as const,
  aiDetails: "",
  differently: "",
};

export const emptyDefense = {
  followUp1: "",
  followUp2: "",
  followUp3: "",
};

export const emptyScores = {
  analytical: null,
  recommendations: null,
  explanation: null,
  communication: null,
  limitations: null,
};

export const emptyReviewDraft = {
  scores: emptyScores,
  feedback: "",
  decision: "" as const,
  considerInterview: null,
};

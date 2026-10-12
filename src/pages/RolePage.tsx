import { Building2, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECT } from "../data/project";
import { useDemo } from "../context/DemoContext";
import { useDocumentTitle } from "../lib/title";
import type { Role } from "../types";
import { Alert, PageIntro, TextInput } from "../components/ui";

export function RolePage() {
  useDocumentTitle("Elegir rol");
  const { state, setParticipantName, setRole } = useDemo();
  const navigate = useNavigate();

  function enter(role: Role) {
    const name = state.participantName.trim();
    setParticipantName(name.length >= 2 ? name : "Valeria Núñez");
    setRole(role);
    navigate(role === "participant" ? "/participante" : "/supervisor");
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
      <PageIntro
        eyebrow="Modo demostración"
        title="Entra sin crear una cuenta."
        lede="Elige el lado de la demostración. Puedes cambiar de rol cuando quieras: el trabajo guardado es el mismo en este navegador."
      />
      <Alert tone="info" title="Datos sintéticos">
        El participante de ejemplo se llama Valeria Núñez y la supervisora simulada es {PROJECT.supervisorName}. Ninguna de las dos es una persona real. Tú operas ambos roles.
      </Alert>
      <TextInput
        id="participant-name"
        label="Nombre del perfil participante"
        hint={PROJECT.participantNote}
        value={state.participantName}
        onChange={setParticipantName}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <RoleCard
          icon={<UserRound className="h-6 w-6" aria-hidden="true" />}
          title="Joven / Participante"
          body="Realizas el análisis, explicas tus decisiones y, si hay aprobación humana, ves la constancia."
          action="Entrar como participante"
          onClick={() => enter("participant")}
          active={state.role === "participant"}
        />
        <RoleCard
          icon={<Building2 className="h-6 w-6" aria-hidden="true" />}
          title="Empresa / Supervisor"
          body="Lees el trabajo enviado, aplicas la rúbrica y decides. Este rol es simulado y lo operas tú."
          action="Entrar como supervisor"
          onClick={() => enter("supervisor")}
          active={state.role === "supervisor"}
        />
      </div>
    </div>
  );
}

function RoleCard({
  icon,
  title,
  body,
  action,
  onClick,
  active,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  action: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <article className={`rounded-3xl bg-white p-6 shadow-card ring-1 ${active ? "ring-electric-500" : "ring-navy-900/5"}`}>
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-white">{icon}</span>
      <h2 className="mt-4 font-serif text-2xl text-navy-950">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
      {active && <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-electric-700">Rol activo</p>}
      <button
        type="button"
        onClick={onClick}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-electric-600 px-4 text-sm font-semibold text-white hover:bg-electric-700 sm:w-auto"
      >
        {action}
      </button>
    </article>
  );
}

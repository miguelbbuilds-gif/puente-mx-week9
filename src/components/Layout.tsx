import { Menu, RotateCcw, X } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDemo } from "../context/DemoContext";
import { Logo } from "./Logo";

const explore = [
  { to: "/como-funciona", label: "Cómo funciona" },
  { to: "/salvaguardas", label: "Salvaguardas" },
  { to: "/responsabilidad", label: "Responsabilidad" },
];

const participantLinks = [
  { to: "/participante", label: "Mi panel" },
  { to: "/proyecto", label: "Proyecto" },
  { to: "/trazabilidad", label: "Traza" },
  { to: "/defensa", label: "Defensa" },
  { to: "/constancia", label: "Constancia" },
  { to: "/siguientes-pasos", label: "Siguiente peldaño" },
];

const supervisorLinks = [
  { to: "/supervisor", label: "Panel supervisor" },
  { to: "/supervisor/revision", label: "Revisión" },
  { to: "/responsabilidad", label: "Responsabilidad" },
];

export function Layout() {
  const { state, setRole, resetDemo } = useDemo();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const sectionLinks = state.role === "supervisor" ? supervisorLinks : state.role === "participant" ? participantLinks : [];
  const roleLabel =
    state.role === "supervisor"
      ? "Rol: Empresa / Supervisor simulado"
      : state.role === "participant"
        ? "Rol: Joven / Participante"
        : "Sin rol elegido";

  function switchRole() {
    if (state.role === "supervisor") {
      setRole("participant");
      navigate("/participante");
      return;
    }
    setRole("supervisor");
    navigate("/supervisor");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
      >
        Saltar al contenido
      </a>
      <div className="no-print sticky top-0 z-40">
        <div className="bg-navy-900 text-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 text-xs sm:px-6 sm:text-sm">
            <p>Modo demostración · Datos ficticios · Sin pago ni contratación real</p>
            <p className="font-semibold">{roleLabel}</p>
          </div>
        </div>
        <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <NavLink to="/" className="rounded-lg">
              <Logo />
            </NavLink>
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Secciones">
              {explore.map((item) => (
                <TopLink key={item.to} to={item.to} label={item.label} />
              ))}
            </nav>
            <div className="hidden items-center gap-2 lg:flex">
              {state.role ? (
                <button
                  type="button"
                  onClick={switchRole}
                  className="min-h-11 rounded-xl px-3 text-sm font-semibold text-navy-900 hover:bg-mist"
                >
                  {state.role === "supervisor" ? "Cambiar a participante" : "Cambiar a supervisor"}
                </button>
              ) : (
                <NavLink to="/rol" className="min-h-11 rounded-xl bg-electric-600 px-4 py-2.5 text-sm font-semibold text-white">
                  Comenzar
                </NavLink>
              )}
            </div>
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-navy-900 hover:bg-mist lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
          {open && (
            <nav id="menu-movil" className="space-y-1 border-t border-slate-200 px-4 py-3 lg:hidden" aria-label="Menú móvil">
              {[...explore, ...sectionLinks]
                .filter((item, index, list) => list.findIndex((other) => other.to === item.to) === index)
                .map((item) => (
                <NavLink key={item.to} to={item.to} className="block rounded-xl px-3 py-3 text-sm font-semibold text-navy-900 hover:bg-mist">
                  {item.label}
                </NavLink>
              ))}
              {state.role ? (
                <button type="button" onClick={switchRole} className="block w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-electric-700">
                  {state.role === "supervisor" ? "Cambiar a participante" : "Cambiar a supervisor"}
                </button>
              ) : (
                <NavLink to="/rol" className="block rounded-xl bg-electric-600 px-3 py-3 text-sm font-semibold text-white">
                  Comenzar mi primera experiencia
                </NavLink>
              )}
            </nav>
          )}
          {sectionLinks.length > 0 && (
            <div className="border-t border-slate-100 bg-mist/80">
              <nav className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-2 sm:px-6" aria-label="Recorrido de la demo">
                {sectionLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      `rounded-full px-3 py-1.5 text-sm font-semibold ${
                        isActive ? "bg-navy-900 text-white" : "text-navy-800 hover:bg-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}
        </header>
      </div>
      <main id="contenido" className="flex-1">
        <Suspense fallback={<p className="px-4 py-10 text-sm text-slate-600 sm:px-6">Cargando…</p>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="no-print border-t border-slate-200 bg-navy-950 text-slate-200">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              Tu trabajo debe contar, incluso antes de tu primer empleo formal. Esta es una demostración universitaria, no un servicio de empleo.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Producto</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><FooterLink to="/como-funciona" label="Cómo funciona" /></li>
              <li><FooterLink to="/rol" label="Elegir rol" /></li>
              <li><FooterLink to="/proyecto" label="Microexperiencia" /></li>
              <li><FooterLink to="/siguientes-pasos" label="Siguientes peldaños" /></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Confianza</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><FooterLink to="/salvaguardas" label="Salvaguardas" /></li>
              <li><FooterLink to="/responsabilidad" label="Responsabilidad del empleador" /></li>
              <li><FooterLink to="/#confianza" label="Qué no prometemos" /></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-xs leading-relaxed text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>Semana 9 · AI 2041 · Capítulo 8, “The Job Savior”. Norte Consultores, los pagos y las personas de esta demo son ficticios.</p>
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl px-2 font-semibold text-white hover:text-blue-100"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Restablecer demostración
            </button>
          </div>
        </div>
      </footer>
      <dialog ref={dialogRef} aria-labelledby="reset-title" className="w-full max-w-md rounded-3xl">
        <form method="dialog" className="rounded-3xl bg-white p-6 text-ink shadow-card">
          <h2 id="reset-title" className="font-serif text-2xl text-navy-950">¿Restablecer la demostración?</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Se borran de este navegador el proyecto, la traza, la defensa, la revisión y la constancia. No se puede deshacer.
          </p>
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <button type="submit" className="min-h-11 rounded-xl px-4 text-sm font-semibold text-navy-900 hover:bg-mist">
              Cancelar
            </button>
            <button
              type="button"
              className="min-h-11 rounded-xl bg-navy-900 px-4 text-sm font-semibold text-white"
              onClick={() => {
                resetDemo();
                dialogRef.current?.close();
                navigate("/");
              }}
            >
              Borrar avance
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

function TopLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-xl px-3 py-2 text-sm font-semibold ${isActive ? "bg-mist text-navy-950" : "text-slate-600 hover:bg-mist hover:text-navy-950"}`
      }
    >
      {label}
    </NavLink>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink to={to} className="text-slate-200 hover:text-white">
      {label}
    </NavLink>
  );
}

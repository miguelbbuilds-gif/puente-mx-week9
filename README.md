# PUENTE MX — Work That Counts

PUENTE MX is a demonstration web application for Week 9 of an AI 2041 university project, based on Chapter 8, “The Job Savior.”

A person without formal experience completes a short, realistic work project, explains the decisions behind it, and receives a portable evidence record only after a human supervisor reviews it. The record can be shared. It does not guarantee a job.

Tagline: **Work That Counts.** Principle: your work should count, even before your first formal job.

## Problem

Young Mexicans and displaced workers often have useful skills and no formal, trusted evidence that employers recognize. A thin CV does not show judgment. An automatically generated AI certificate does not prove that the person did the work.

The vacuum this product attacks is **first-proof**: a credible first piece of evidence. The mechanism is a **paid microexperience** — in this demo, the pay is illustrative and no money moves.

## Team perspectives

- **User — Miguel Bravo.** Young people need real, paid microexperiences that create portable evidence and help them toward a first formal job.
- **Technologist — Nicolás Flores.** AI can draft portfolios and finish unsupervised tests. Proof therefore needs the work itself, a decision trace, and human verification.
- **Adversary — Regina.** A credential is useless if it does not point toward real occupational demand or a credible next step. The app shows illustrative next rungs and refuses to invent vacancies.
- **Adversary — Cristina Meouchi.** Programs should not claim success from unverified placement numbers. Employer demand and measurable outcomes matter. Confirmed interviews and hires stay at zero in the live demo, and the sample dashboard is labeled fictional.

## Technology stack

- React 18, Vite, TypeScript
- Tailwind CSS
- React Router
- Lucide React
- Recharts, on the sales project and the accountability example
- LocalStorage for demo state (`puente-mx-demo-v1`)

No Supabase, Firebase, API keys, external authentication, or paid services.

## Setup

```bash
npm install
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`.

Production build:

```bash
npm run build
npm run preview
```

The app must work after `npm install` and `npm run dev`. State lives in the browser. Clearing site data or using **Restablecer demostración** returns the original demo.

## Demo walkthrough

1. Open the landing page.
2. Choose **Comenzar mi primera experiencia**, then **Joven / Participante**.
3. Read the participant dashboard and open the Norte Consultores project.
4. Accept the illustrative scope, compensation, and deadline.
5. Read the fictional sales table, answer the four questions, save, and submit.
6. Complete the decision trace, including whether AI was used.
7. Answer the three simulated defense questions. This does not certify anyone.
8. Switch to **Empresa / Supervisor**.
9. Open the review and confirm the saved answers are the ones just submitted.
10. Score all five rubric criteria, write feedback, choose approve or request changes, and record an interview consideration. The app will not approve with an incomplete rubric.
11. Switch back to the participant and open the experience record.
12. Print or save as PDF from the browser dialog, copy the summary, or open the local verification detail.
13. Explore illustrative next career steps.
14. Open **Responsabilidad** to see session counts separated from a clearly fictional program dashboard.

The banner **Modo demostración** stays visible. Norte Consultores, Valeria Núñez, Laura Espinosa, the MXN $1,500 figure, and the sample program metrics are fictional.

## Architecture

```
src/
  main.tsx                 Router and demo provider
  App.tsx                  Routes
  context/DemoContext.tsx  State, actions, LocalStorage sync
  lib/status.ts            Gates, rubric, derived status
  lib/storage.ts           Load and save, with defensive parsing
  data/                    Fictional sales set, rubric, pathways
  components/              Layout, record, charts, shared UI
  pages/                   One screen per step of the journey
```

Shared state is one `DemoState` object. Participant answers, the decision trace, the simulated defense, and the supervisor review are fields of that object, so the supervisor reads the actual submission rather than a separate sample.

Status is derived, not trusted as a free-form flag:

- Approval requires a submitted review dated at or after the project, trace, and defense; all five scores; feedback of at least 40 characters; an explicit approve decision; and an explicit interview yes/no.
- Requesting changes reopens the package. Resubmitting bumps all three timestamps together, which makes the previous decision stale.
- Completing the defense never sets the status to approved.

Routes use the browser history API. `vercel.json` rewrites unknown paths to `index.html` so a refresh on a deep link still loads the app. Static files are served before that rewrite on Vercel.

## Limitations

- One browser, one demo. There is no server, no account, and no shared database. A verification ID can only be checked in the browser that created it.
- The supervisor is the same person operating a simulated role.
- Compensation, the company, the supervisor, the participant name, and program statistics are illustrative.
- There is no identity check, payment, cryptographic signature, or third-party validator.
- Next-step occupations are teaching examples, not labor-market data.
- Print-to-PDF depends on the browser print dialog.
- Confirmed interviews and hires cannot be entered. They stay at zero.

## Deployment

This repository is ready to import into Vercel. It has not been deployed from this workspace.

1. Push the project to a Git repository.
2. In Vercel, import the repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Do not add environment variables. None are required.
7. Deploy. `vercel.json` keeps React Router paths working after refresh.

Local check before deploying:

```bash
npm run build
npm run preview
```

## Future improvements

- Separate real accounts for participants and supervisors, with the same human-approval gate.
- More than one microexperience, still with declared pay, scope, and a person in the loop.
- A verification flow that does not depend on a single browser, without pretending a hash is a legal credential.
- Employer-confirmed outcomes stored apart from self-reported placements.
- Stronger accessibility testing with screen readers and a formal audit.

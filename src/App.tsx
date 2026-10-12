import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { DefensePage } from "./pages/DefensePage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ParticipantDashboard } from "./pages/ParticipantDashboard";
import { PathwaysPage } from "./pages/PathwaysPage";
import { RecordPage } from "./pages/RecordPage";
import { ReviewPage } from "./pages/ReviewPage";
import { RolePage } from "./pages/RolePage";
import { SafeguardsPage } from "./pages/SafeguardsPage";
import { SupervisorDashboard } from "./pages/SupervisorDashboard";
import { TracePage } from "./pages/TracePage";
import { VerifyPage } from "./pages/VerifyPage";

const ProjectPage = lazy(() => import("./pages/ProjectPage").then((module) => ({ default: module.ProjectPage })));
const AccountabilityPage = lazy(() =>
  import("./pages/AccountabilityPage").then((module) => ({ default: module.AccountabilityPage })),
);

export default function App() {
  return (
    <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/como-funciona" element={<HowItWorksPage />} />
          <Route path="/salvaguardas" element={<SafeguardsPage />} />
          <Route path="/rol" element={<RolePage />} />
          <Route path="/participante" element={<ParticipantDashboard />} />
          <Route path="/proyecto" element={<ProjectPage />} />
          <Route path="/trazabilidad" element={<TracePage />} />
          <Route path="/defensa" element={<DefensePage />} />
          <Route path="/constancia" element={<RecordPage />} />
          <Route path="/verificar/:id" element={<VerifyPage />} />
          <Route path="/siguientes-pasos" element={<PathwaysPage />} />
          <Route path="/supervisor" element={<SupervisorDashboard />} />
          <Route path="/supervisor/revision" element={<ReviewPage />} />
          <Route path="/responsabilidad" element={<AccountabilityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
  );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DemoProvider } from "./context/DemoContext";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("No se encontró el contenedor de la aplicación.");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <DemoProvider>
        <App />
      </DemoProvider>
    </BrowserRouter>
  </StrictMode>,
);

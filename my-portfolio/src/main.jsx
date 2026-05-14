import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LiveCodingStatsProvider } from "./context/LiveCodingStatsContext.jsx";
import { SiteFxProvider } from "./context/SiteFxContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SiteFxProvider>
      <LiveCodingStatsProvider>
        <App />
      </LiveCodingStatsProvider>
    </SiteFxProvider>
  </StrictMode>,
);

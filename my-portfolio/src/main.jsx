import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import App from "./App.jsx";
import { LiveCodingStatsProvider } from "./context/LiveCodingStatsContext.jsx";
import { SiteFxProvider } from "./context/SiteFxContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SiteFxProvider>
      <LiveCodingStatsProvider>
        <App />
        <Analytics />
      </LiveCodingStatsProvider>
    </SiteFxProvider>
  </StrictMode>,
);

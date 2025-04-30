import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import { PopupProvider } from "./context/PopupContext";
import Popup from "./components/popup/Popup";
import Dashboard from "./components/dashboard/Dashboard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PopupProvider>
      <Dashboard>
        <App />
      </Dashboard>
      <Popup />
    </PopupProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import { PopupProvider } from "./context/PopupContext";
import Popup from "./components/popup/Popup";
import Dashboard from "./components/dashboard/Dashboard";
import UserInterface from "./components/plant-creation/PlantRoom";
import { BrowserRouter, Navigate, Routes, Route } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PopupProvider>
        <UserInterface />
        <Dashboard>
          <Routes>
            <Route path="/about" element={<App />} />
            <Route path="/" element={<Navigate to="/about" replace />} />
          </Routes>
          <App />
        </Dashboard>
        <Popup />
      </PopupProvider>
    </BrowserRouter>
  </StrictMode>
);

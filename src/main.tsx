import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import { PopupProvider } from "./context/PopupContext";
import Popup from "./components/popup/Popup";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PopupProvider>
      <App />
      <Popup />
    </PopupProvider>
  </StrictMode>
);

import { createContext, useState, useContext, ReactNode } from "react";
interface PopupContextType {
  show: boolean;
  message: string;
  showPopup: (message: string) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const showPopup = (msg: string) => {
    setMessage(msg);
    setShow(true);
  };

  const closePopup = () => {
    setShow(false);
    setMessage("");
  };

  return (
    <PopupContext.Provider value={{ show, message, showPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};

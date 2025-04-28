import { usePopup } from "../../context/PopupContext";
import "./Popup.scss";

const Popup = () => {
  const { show, message, closePopup } = usePopup();

  const handleClose = () => {
    closePopup();
  };

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p className="popup-message">{message}</p>
        <button onClick={handleClose} className="popup-close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;

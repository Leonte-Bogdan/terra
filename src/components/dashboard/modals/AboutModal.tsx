import { Modal } from "antd";
import "./AboutModal.scss";

const AboutModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      title="Welcome to Your Garden"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
      className="about-modal"
    >
      <div className="modal-content">
        <p className="welcome-text">
          Welcome to your personal garden room! Here you can nurture and care
          for your plants using various gardening tools.
        </p>

        <h4 className="instructions-title">How to get started:</h4>
        <ul className="instructions-list">
          <li> Click on plants to interact with them</li>
          <li>💧 Use the watering can to keep plants hydrated</li>
          <li>✂️ Trim plants with scissors when needed</li>
          <li>🌱 Add fertilizer to help plants grow</li>
          <li>📊 Check soil pH with the pH meter</li>
        </ul>

        <div className="tip-section">
          <p>
            💡 Tip: Each plant has different needs. Pay attention to their
            health and respond accordingly!
          </p>
        </div>

        <button className="start-button" onClick={onClose}>
          Start Gardening 🌿
        </button>
      </div>
    </Modal>
  );
};

export default AboutModal;

import "./App.scss";
import { usePopup } from "./context/PopupContext";

function App() {
  const { showPopup } = usePopup();

  const testPopup = () => {
    showPopup("Your lilac needs flowering!");
  };

  return (
    <div className="app">
      <button onClick={testPopup} className="popup-button">
        Test Popup
      </button>
    </div>
  );
}

export default App;

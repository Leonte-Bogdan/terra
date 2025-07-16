import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./WateringBar.scss";

const WateringBar = forwardRef(
  ({ plantId, initialWaterLevel = 75, isVisible = false, onClose }, ref) => {
    const [waterLevel, setWaterLevel] = useState(initialWaterLevel);
    const [lastWatered, setLastWatered] = useState(new Date());

    useEffect(() => {
      if (!isVisible) return;

      const interval = setInterval(() => {
        setWaterLevel((prev) => {
          const newLevel = prev - 0.5;
          return Math.max(0, newLevel);
        });
      }, 2000);

      return () => clearInterval(interval);
    }, [isVisible]);

    const getWaterStatus = () => {
      if (waterLevel <= 20)
        return {
          status: "critical",
          message: "Needs water urgently!",
          color: "#ef4444",
        };
      if (waterLevel <= 40)
        return {
          status: "low",
          message: "Needs watering soon",
          color: "#f59e0b",
        };
      if (waterLevel <= 60)
        return {
          status: "moderate",
          message: "Monitor closely",
          color: "#eab308",
        };
      return { status: "good", message: "Well hydrated", color: "#10b981" };
    };

    const waterPlant = () => {
      setWaterLevel(100);
      setLastWatered(new Date());
    };

    // Expose waterPlant function to parent component
    useImperativeHandle(ref, () => ({
      waterPlant,
    }));

    const status = getWaterStatus();

    if (!isVisible) return null;

    return (
      <div className="watering-bar-container">
        <div className="watering-bar-header">
          <div className="water-icon" style={{ color: status.color }}>
            💧
          </div>
          <span className="water-level-text">{Math.round(waterLevel)}%</span>
          {waterLevel <= 20 && <span className="alert-icon">⚠️</span>}
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="watering-bar">
          <div
            className="water-fill"
            style={{
              width: `${waterLevel}%`,
              backgroundColor: status.color,
            }}
          />
        </div>

        <div className="water-status">
          <span className="status-message" style={{ color: status.color }}>
            {status.message}
          </span>
          <span className="last-watered">
            Last watered: {lastWatered.toLocaleTimeString()}
          </span>
        </div>

        <button
          className="water-button"
          onClick={waterPlant}
          disabled={waterLevel > 90}
        >
          💧 Water Plant
        </button>
      </div>
    );
  }
);

export default WateringBar;

import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { usePlant } from "../../hooks/usePlant";
import "./WateringBar.scss";

const WateringBar = forwardRef(
  ({ plantId, isVisible = false, onClose }, ref) => {
    const {
      plantData,
      loading,
      error,
      waterPlant: waterPlantAPI,
    } = usePlant(plantId);

    const [localWaterLevel, setLocalWaterLevel] = useState(75);

    useEffect(() => {
      if (plantData) {
        setLocalWaterLevel(plantData.waterLevel);
      }
    }, [plantData]);

    useEffect(() => {
      if (!isVisible) return;

      const interval = setInterval(() => {
        setLocalWaterLevel((prev) => {
          const newLevel = prev - 0.5;
          return Math.max(0, newLevel);
        });
      }, 2000);

      return () => clearInterval(interval);
    }, [isVisible]);

    const getWaterStatus = () => {
      const waterLevel = localWaterLevel;
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

    const waterPlant = async () => {
      try {
        await waterPlantAPI();
        setLocalWaterLevel(100);
      } catch (error) {
        console.error("Failed to water plant:", error);
      }
    };

    useImperativeHandle(ref, () => ({
      waterPlant,
    }));

    const status = getWaterStatus();

    if (!isVisible) return null;

    if (loading) {
      return (
        <div className="watering-bar-container">
          <div className="loading">Loading plant data...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="watering-bar-container">
          <div className="error">Error: {error}</div>
        </div>
      );
    }

    return (
      <div className="watering-bar-container">
        <div className="watering-bar-header">
          <div className="water-icon" style={{ color: status.color }}>
            💧
          </div>
          <span className="water-level-text">
            {Math.round(localWaterLevel)}%
          </span>
          {localWaterLevel <= 20 && <span className="alert-icon">⚠️</span>}
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="watering-bar">
          <div
            className="water-fill"
            style={{
              width: `${localWaterLevel}%`,
              backgroundColor: status.color,
            }}
          />
        </div>

        <div className="water-status">
          <span className="status-message" style={{ color: status.color }}>
            {status.message}
          </span>
          <span className="last-watered">
            Last watered:{" "}
            {plantData?.lastWatered
              ? new Date(plantData.lastWatered).toLocaleTimeString()
              : "Unknown"}
          </span>
        </div>

        <button
          className="water-button"
          onClick={waterPlant}
          disabled={localWaterLevel > 90}
        >
          💧 Water Plant
        </button>
      </div>
    );
  }
);

export default WateringBar;

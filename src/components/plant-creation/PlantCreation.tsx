import { useState, useEffect } from "react";
import "./PlantCreation.scss";
import { Sun, Cloud, Droplets } from "lucide-react";
import { usePlantLeaves } from "./usePlantLeaves";

interface PlantProps {
  name?: string;
  type?: "monstera" | "snake" | "fiddle" | "zz" | "pothos" | "custom";
  size?: "small" | "medium" | "large";
  potColor?: string;
  initialHealth?: number;
  leafColor?: string;
  stemColor?: string;
  customLeafConfig?: LeafConfig[];
}

export interface LeafConfig {
  width: number;
  height: number;
  top: number;
  left: number;
  rotation: number;
  borderRadius?: string;
  clipPath?: string;
  skew?: string;
}

const PlantComponent: React.FC<PlantProps> = ({
  name = "Plant",
  type = "monstera",
  size = "medium",
  potColor = "#d97941",
  initialHealth = 95,
  leafColor = "#2e8b57",
  stemColor = "#556b2f",
  customLeafConfig = [],
}) => {
  const [isWatering, setIsWatering] = useState(false);
  const [lightMode, setLightMode] = useState<"bright" | "dim">("bright");
  const [health, setHealth] = useState(initialHealth);
  const [showDetails, setShowDetails] = useState(false);

  const { leaves, generateLeaves } = usePlantLeaves(type, leafColor);

  const plantTypes = {
    monstera: { waterNeeds: "Medium", lightNeeds: "Bright indirect" },
    snake: { waterNeeds: "Low", lightNeeds: "Any light" },
    fiddle: { waterNeeds: "Medium", lightNeeds: "Bright indirect" },
    zz: { waterNeeds: "Low", lightNeeds: "Low to bright" },
    pothos: { waterNeeds: "Low", lightNeeds: "Low to bright" },
    custom: { waterNeeds: "Custom", lightNeeds: "Custom" },
  };

  const sizeMappings = {
    small: { height: 80, stemHeight: 40, scale: 0.7 },
    medium: { height: 120, stemHeight: 60, scale: 1 },
    large: { height: 180, stemHeight: 90, scale: 1.3 },
  };

  useEffect(() => {
    if (type === "custom" && customLeafConfig.length > 0) {
    } else {
      generateLeaves(size);
    }
  }, [type, size, generateLeaves]);

  useEffect(() => {
    if (isWatering) {
      const timer = setTimeout(() => {
        setIsWatering(false);
        setHealth((prev) => Math.min(100, prev + 5));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isWatering]);

  const handleWatering = () => {
    setIsWatering(true);
  };

  const toggleLight = () => {
    setLightMode(lightMode === "bright" ? "dim" : "bright");
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="user-interface">
      <div className="environment-controls">
        <button
          className="control-btn light-btn"
          onClick={toggleLight}
          aria-label="Toggle light"
        >
          {lightMode === "bright" ? <Sun size={24} /> : <Cloud size={24} />}
        </button>
        <button
          className={`control-btn water-btn ${isWatering ? "watering" : ""}`}
          onClick={handleWatering}
          disabled={isWatering}
          aria-label="Water plant"
        >
          <Droplets size={24} />
        </button>
      </div>
      <div className={`plant-environment ${lightMode}`}>
        <div className="plant-display">
          <div
            className={`plant-container ${showDetails ? "selected" : ""}`}
            onClick={toggleDetails}
          >
            <div className="plant-pot">
              <div className="plant">
                <div className="plant-stem"></div>

                <div className="plant-leaves">
                  {type === "custom" && customLeafConfig.length > 0
                    ? customLeafConfig.map((leaf, index) => (
                        <div
                          key={`custom-leaf-${index}`}
                          className="leaf"
                        ></div>
                      ))
                    : leaves.map((leaf, index) => (
                        <div key={`leaf-${index}`} className="leaf"></div>
                      ))}
                </div>

                {isWatering && (
                  <div className="water-droplets">
                    <div className="droplet droplet-1"></div>
                    <div className="droplet droplet-2"></div>
                    <div className="droplet droplet-3"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="plant-label">{name}</div>
          </div>

          {showDetails && (
            <div className="plant-details">
              <h3>{name}</h3>
              <div className="detail-row">
                <span className="detail-label">Health:</span>
                <div className="health-bar">
                  <div className="health-fill"></div>
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-label">Water Needs:</span>
                <span>{plantTypes[type].waterNeeds}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Light Needs:</span>
                <span>{plantTypes[type].lightNeeds}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantComponent;

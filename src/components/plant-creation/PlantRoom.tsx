import { useEffect, useState, useRef } from "react";
import "./PlantRoom.scss";
import WateringBar from "../watering-bar/WateringBar";

const PlantRoom = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [showWateringBar, setShowWateringBar] = useState(false);
  const wateringBarRef = useRef(null);

  useEffect(() => {
    document.body.classList.remove(
      "watering-cursor",
      "scissor-cursor",
      "fertilizing-cursor",
      "ph-cursor",
      "dirt-cursor"
    );

    if (selectedTool) {
      document.body.classList.add(`${selectedTool}-cursor`);
    }

    return () => {
      document.body.classList.remove(
        "watering-cursor",
        "scissor-cursor",
        "fertilizing-cursor",
        "ph-cursor",
        "dirt-cursor"
      );
    };
  }, [selectedTool]);

  const handleToolClick = (tool) => {
    setSelectedTool(selectedTool === tool ? null : tool);
  };

  const handlePotClick = () => {
    if (selectedTool === "watering-cursor") {
      if (wateringBarRef.current) {
        wateringBarRef.current();
      }
      setSelectedTool(null);
    }
  };

  const handlePotHover = (isHovering) => {
    if (selectedTool === "watering") {
      setShowWateringBar(isHovering);
    }
  };

  const handleCloseWateringBar = () => {
    setShowWateringBar(false);
  };

  const icons = {
    WateringCanIcon: "/watering-can.svg",
    ScissorsIcon: "/scissors.svg",
    PhMeterIcon: "/ph-meter.svg",
    FertilizerIcon: "/fertilizer.svg",
    DirtIcon: "./dirt-bag.svg",
    BasketIcon: "./basket.svg",
  };

  return (
    <div className="user-interface">
      <div className="wall-background"></div>
      <div className="top-shelves-container">
        <div
          className="watering-can-shelf"
          onClick={() => handleToolClick("watering")}
        >
          <img src={icons.WateringCanIcon} alt="watering can" />
        </div>
        <div
          className="fertilizer-shelf"
          onClick={() => handleToolClick("fertilizing")}
        >
          <img src={icons.FertilizerIcon} alt="fertilizer" />
        </div>
      </div>
      <div className="bottom-shelves-container">
        <div
          className="scissors-shelf"
          onClick={() => handleToolClick("scissor")}
        >
          <img src={icons.ScissorsIcon} alt="scissors" />
        </div>
        <div className="ph-meter-shelf" onClick={() => handleToolClick("ph")}>
          <img src={icons.PhMeterIcon} alt="ph meter" />
        </div>
      </div>
      <div className="window">
        <div className="window-sill"></div>
      </div>
      <div className="closet-container">
        <div className="closet"></div>
      </div>
      <div className="bench">
        <div
          className="basket-container"
          onClick={() => handleToolClick("dirt")}
        >
          <div className="basket">
            <img src={icons.BasketIcon} alt="dirt basket" />
          </div>
          <div className="dirt">
            <img src={icons.DirtIcon} alt="dirt" />
          </div>
        </div>
        <div
          className="pot-container"
          onClick={handlePotClick}
          onMouseEnter={() => handlePotHover(true)}
        >
          <div className="flower-pot" />
          <WateringBar
            plantId="plant-1"
            initialWaterLevel={75}
            isVisible={showWateringBar}
            onClose={handleCloseWateringBar}
          />
        </div>
      </div>
    </div>
  );
};

export default PlantRoom;

import "./PlantRoom.scss";

const PlantRoom = () => {
  return (
    <div className="user-interface">
      <div className="watering-can-shelf"></div>
      <div className="window">
        <div className="window-sill"></div>
      </div>
      <div className="bench">
        <div className="pot-container">
          <div className="flower-pot" />
        </div>
      </div>
    </div>
  );
};

export default PlantRoom;

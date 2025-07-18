import { Modal } from "antd";
import { useState, useEffect } from "react";
import "./GardenModal.scss";

interface GardenModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onPlantSelect: (plantId: string | number) => void;
}

interface Plant {
  _id: number;
  name: string;
  description: string;
  image: string;
  category?: string;
}

const GardenModal = ({ isOpen, onClose, onPlantSelect }: GardenModalProps) => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchPlants();
    }
  }, [isOpen]);

  const fetchPlants = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching plants from: http://localhost:5000/api/flowers");

      const response = await fetch("http://localhost:5000/api/flowers");

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      console.log("Data length:", data.length);

      setPlants(data);
    } catch (err) {
      console.error("Error fetching plants:", err);
      setError("Failed to load plants");
    } finally {
      setLoading(false);
    }
  };
  const handlePlantSelect = (plant: Plant) => {
    onPlantSelect(plant._id);
    console.log(plant._id);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      width="40rem"
      title="Available Plants"
      footer={null}
      className="garden-modal"
    >
      {loading && (
        <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>
      )}
      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>
      )}
      {!loading && !error && (
        <div className="plant-grid">
          {plants.map((plant) => (
            <div key={`plant-${plant._id}`} className="plant-card">
              <img src={plant.image} alt={plant.name} />
              <h3>{plant.name}</h3>
              <p>{plant.description}</p>
              <button
                className="nature-btn garden small"
                onClick={() => handlePlantSelect(plant)}
              >
                <span>Select</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default GardenModal;

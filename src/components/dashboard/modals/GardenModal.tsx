import { Modal } from "antd";
import { useState, useEffect } from "react";
import "./GardenModal.scss";

interface GardenModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

interface Plant {
  id: string | number;
  name: string;
  description: string;
  image: string;
  category?: string;
}

const GardenModal = ({ isOpen, onClose }: GardenModalProps) => {
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
      const mockPlants: Plant[] = [
        {
          id: 1,
          name: "Rose",
          description: "Beautiful red roses",
          image: "/rose1.jpg",
          category: "flowers",
        },
        {
          id: 2,
          name: "Tulip",
          description: "Nice tulip, isn't it?",
          image: "/tulip1.jpg",
          category: "flowers",
        },
        {
          id: 3,
          name: "Dandelion",
          description: "Grazing in the sun.",
          image: "/dandelion1.jpg",
          category: "flowers",
        },
        {
          id: 4,
          name: "Lotus",
          description: "Beautifully observant atop of water.",
          image: "/lotus1.jpg",
          category: "flowers",
        },
        {
          id: 5,
          name: "Snowdrop",
          description: "Patiently awaiting the summer.",
          image: "/snowdrop1.jpg",
          category: "flowers",
        },
      ];

      await new Promise((resolve) => setTimeout(resolve, 500));
      setPlants(mockPlants);
    } catch (err) {
      setError("Failed to load plants");
    } finally {
      setLoading(false);
    }
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
            <div key={plant.id} className="plant-card">
              <img src={plant.image} alt={plant.name} />
              <h3>{plant.name}</h3>
              <p>{plant.description}</p>
              <button>
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

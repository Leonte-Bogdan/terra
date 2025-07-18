import { useState, useEffect, useCallback } from "react";

export const usePlant = (plantId, type = "plants") => {
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlant = useCallback(async () => {
    if (!plantId) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/${type}/${plantId}`);
      if (!response.ok) throw new Error(`Failed to fetch ${type.slice(0, -1)}`);
      const data = await response.json();
      setPlantData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPlantData(null);
    } finally {
      setLoading(false);
    }
  }, [plantId, type]);

  useEffect(() => {
    fetchPlant();
  }, [fetchPlant]);

  const waterPlant = async () => {
    try {
      const response = await fetch(`/api/plants/${plantId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`Failed to water ${type.slice(0, -1)}`);
      const updatedPlant = await response.json();
      setPlantData(updatedPlant);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateWaterLevel = async (newLevel) => {
    try {
      const response = await fetch(`/api/${type}/${plantId}/water-level`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ waterLevel: newLevel }),
      });
      if (!response.ok) throw new Error(`Failed to update water level`);
      const updatedPlant = await response.json();
      setPlantData(updatedPlant);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    plantData,
    loading,
    error,
    waterPlant,
    updateWaterLevel,
    refetch: fetchPlant,
  };
};

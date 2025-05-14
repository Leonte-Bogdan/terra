import { useState, useCallback } from "react";
import { LeafConfig } from "./PlantCreation";

export const usePlantLeaves = (
  plantType: string,
  leafColor: string = "#2e8b57"
) => {
  const [leaves, setLeaves] = useState<LeafConfig[]>([]);

  const generateMonstera = (sizeScale: number) => {
    const baseLeaves: LeafConfig[] = [
      {
        width: 45 * sizeScale,
        height: 55 * sizeScale,
        top: 10 * sizeScale,
        left: 15 * sizeScale,
        rotation: -20,
        borderRadius: "60% 35% 25% 70% / 60% 30% 70% 40%",
        clipPath:
          "polygon(0% 0%, 100% 0%, 100% 75%, 75% 60%, 50% 100%, 25% 60%, 0% 75%)",
      },
      {
        width: 40 * sizeScale,
        height: 50 * sizeScale,
        top: 5 * sizeScale,
        left: 45 * sizeScale,
        rotation: 20,
        borderRadius: "35% 60% 70% 25% / 30% 60% 40% 70%",
        clipPath:
          "polygon(0% 0%, 100% 0%, 100% 75%, 75% 60%, 50% 100%, 25% 60%, 0% 75%)",
      },
      {
        width: 35 * sizeScale,
        height: 45 * sizeScale,
        top: 30 * sizeScale,
        left: 25 * sizeScale,
        rotation: -10,
        borderRadius: "60% 40% 30% 70% / 50% 40% 60% 50%",
        clipPath:
          "polygon(0% 0%, 100% 0%, 100% 75%, 85% 60%, 70% 90%, 50% 70%, 30% 90%, 15% 60%, 0% 75%)",
      },
    ];
    return baseLeaves;
  };

  const generateSnakePlant = (sizeScale: number) => {
    const leaves: LeafConfig[] = [];
    // Generate multiple vertical leaves
    const leafCount = Math.floor(5 + Math.random() * 4); // 5-8 leaves

    for (let i = 0; i < leafCount; i++) {
      const width = (8 + Math.random() * 4) * sizeScale;
      const height = (45 + Math.random() * 30) * sizeScale;
      const left = 35 + (Math.random() * 30 - 15) * sizeScale;
      const rotation = Math.random() * 20 - 10; // -10 to 10 degrees

      leaves.push({
        width,
        height,
        top: 0,
        left,
        rotation,
        borderRadius: "40% 40% 2% 2% / 5% 5% 7% 7%",
      });
    }
    return leaves;
  };

  const generateFiddleLeaf = (sizeScale: number) => {
    const leaves: LeafConfig[] = [];
    const leafCount = Math.floor(4 + Math.random() * 3); // 4-6 leaves

    for (let i = 0; i < leafCount; i++) {
      const side = i % 2 === 0 ? -1 : 1; // alternate sides
      const verticalSpacing = 20 * sizeScale;

      leaves.push({
        width: 40 * sizeScale,
        height: 50 * sizeScale,
        top: 10 + i * verticalSpacing,
        left: 40 + side * 25 * sizeScale,
        rotation: side * (10 + Math.random() * 10),
        borderRadius: "45% 45% 45% 45% / 40% 40% 60% 60%",
      });
    }
    return leaves;
  };

  const generateZZ = (sizeScale: number) => {
    const stems: LeafConfig[] = [];
    const stemCount = Math.floor(3 + Math.random() * 3); // 3-5 stems

    for (let i = 0; i < stemCount; i++) {
      const stemHeight = (50 + Math.random() * 30) * sizeScale;
      const stemLeft = 30 + Math.random() * 40 * sizeScale;
      const stemRotation = Math.random() * 30 - 15; // -15 to 15 degrees

      // Add the stem
      stems.push({
        width: 3 * sizeScale,
        height: stemHeight,
        top: 5 * sizeScale,
        left: stemLeft,
        rotation: stemRotation,
      });

      // Add leaves on each stem
      const leafPairs = Math.floor(3 + Math.random() * 3); // 3-5 leaf pairs per stem

      for (let j = 0; j < leafPairs; j++) {
        const leafOffset = (stemHeight * (j + 1)) / (leafPairs + 1);

        // Left leaf
        stems.push({
          width: 15 * sizeScale,
          height: 20 * sizeScale,
          top: 5 + leafOffset * 0.8,
          left: stemLeft - 12 * sizeScale,
          rotation: stemRotation - 80,
          borderRadius: "40% 60% 50% 50% / 40% 50% 50% 60%",
        });

        // Right leaf
        stems.push({
          width: 15 * sizeScale,
          height: 20 * sizeScale,
          top: 5 + leafOffset * 0.8,
          left: stemLeft + 10 * sizeScale,
          rotation: stemRotation + 80,
          borderRadius: "60% 40% 50% 50% / 50% 40% 60% 50%",
        });
      }
    }

    return stems;
  };

  const generatePothos = (sizeScale: number) => {
    const leaves: LeafConfig[] = [];
    const leafCount = Math.floor(6 + Math.random() * 4); // 6-9 leaves

    for (let i = 0; i < leafCount; i++) {
      const isHanging = i > 2; // First few leaves are on top, others hang
      const width = (20 + Math.random() * 10) * sizeScale;
      const height = (25 + Math.random() * 10) * sizeScale;

      let top, left, rotation;

      if (isHanging) {
        // Hanging leaves
        top = 20 + i * 15 * sizeScale;
        left = 40 + Math.sin(i) * 50 * sizeScale;
        rotation = 100 + Math.random() * 60;
      } else {
        // Top leaves
        top = 5 * sizeScale;
        left = 20 + i * 20 * sizeScale;
        rotation = Math.random() * 40 - 20;
      }

      leaves.push({
        width,
        height,
        top,
        left,
        rotation,
        borderRadius: "60% 40% 50% 50% / 30% 30% 70% 70%", // Heart-shaped leaves
      });
    }

    return leaves;
  };

  const generateLeaves = useCallback(
    (size: string = "medium") => {
      let sizeScale = 1;

      switch (size) {
        case "small":
          sizeScale = 0.7;
          break;
        case "medium":
          sizeScale = 1;
          break;
        case "large":
          sizeScale = 1.3;
          break;
        default:
          sizeScale = 1;
      }

      let generatedLeaves: LeafConfig[] = [];

      switch (plantType) {
        case "monstera":
          generatedLeaves = generateMonstera(sizeScale);
          break;
        case "snake":
          generatedLeaves = generateSnakePlant(sizeScale);
          break;
        case "fiddle":
          generatedLeaves = generateFiddleLeaf(sizeScale);
          break;
        case "zz":
          generatedLeaves = generateZZ(sizeScale);
          break;
        case "pothos":
          generatedLeaves = generatePothos(sizeScale);
          break;
        default:
          generatedLeaves = generateMonstera(sizeScale); // Default to monstera
      }

      setLeaves(generatedLeaves);
    },
    [plantType]
  );

  return { leaves, generateLeaves };
};


import { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
  orbitSpeedMultiplier: number;
  rotationSpeedMultiplier: number;
  isSimulationPaused: boolean;
  setOrbitSpeedMultiplier: (speed: number) => void;
  setRotationSpeedMultiplier: (speed: number) => void;
  setIsSimulationPaused: (paused: boolean) => void;
  toggleSimulationPause: () => void;
  resetOrbits: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [orbitSpeedMultiplier, setOrbitSpeedMultiplier] = useState(1);
  const [rotationSpeedMultiplier, setRotationSpeedMultiplier] = useState(1);
  const [isSimulationPaused, setIsSimulationPaused] = useState(false);

  const toggleSimulationPause = () => {
    setIsSimulationPaused((prev) => !prev);
  };

  const resetOrbits = () => {
    setOrbitSpeedMultiplier(1);
    setRotationSpeedMultiplier(1);
    setIsSimulationPaused(false);
  };

  return (
    <SettingsContext.Provider
      value={{
        orbitSpeedMultiplier,
        rotationSpeedMultiplier,
        isSimulationPaused,
        setOrbitSpeedMultiplier,
        setRotationSpeedMultiplier,
        setIsSimulationPaused,
        toggleSimulationPause,
        resetOrbits,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

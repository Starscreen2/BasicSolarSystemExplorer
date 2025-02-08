import { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
  orbitSpeedMultiplier: number;
  rotationSpeedMultiplier: number;
  sliderOrbitSpeed: number;
  sliderRotationSpeed: number;
  isSimulationPaused: boolean;
  updateOrbitSpeed: (speed: number) => void;
  updateRotationSpeed: (speed: number) => void;
  toggleSimulationPause: () => void;
  resetOrbits: () => void;
}

const SettingsContext = createContext<SettingsContextType>({
  orbitSpeedMultiplier: 1,
  rotationSpeedMultiplier: 1,
  sliderOrbitSpeed: 1,
  sliderRotationSpeed: 1,
  isSimulationPaused: false,
  updateOrbitSpeed: () => {},
  updateRotationSpeed: () => {},
  toggleSimulationPause: () => {},
  resetOrbits: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [orbitSpeedMultiplier, setOrbitSpeedMultiplier] = useState(1);
  const [rotationSpeedMultiplier, setRotationSpeedMultiplier] = useState(1);
  const [isSimulationPaused, setIsSimulationPaused] = useState(false);

  const updateOrbitSpeed = (speed: number) => {
    if (!isSimulationPaused) {
      setOrbitSpeedMultiplier(speed);
    }
  };

  const updateRotationSpeed = (speed: number) => {
    if (!isSimulationPaused) {
      setRotationSpeedMultiplier(speed);
    }
  };

  const toggleSimulationPause = () => {
    setIsSimulationPaused(!isSimulationPaused);
  };

  const resetOrbits = () => {
    setOrbitSpeedMultiplier(1);
    setRotationSpeedMultiplier(1);
  };

  return (
    <SettingsContext.Provider
      value={{
        orbitSpeedMultiplier,
        rotationSpeedMultiplier,
        sliderOrbitSpeed: orbitSpeedMultiplier,
        sliderRotationSpeed: rotationSpeedMultiplier,
        isSimulationPaused,
        updateOrbitSpeed,
        updateRotationSpeed,
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
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
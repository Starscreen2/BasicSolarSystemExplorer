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
  applyChanges: () => void;
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
  const [pendingOrbitSpeed, setPendingOrbitSpeed] = useState(1);
  const [pendingRotationSpeed, setPendingRotationSpeed] = useState(1);
  const [isSimulationPaused, setIsSimulationPaused] = useState(false);

  const updateOrbitSpeed = (speed: number) => {
    setPendingOrbitSpeed(speed);
  };

  const updateRotationSpeed = (speed: number) => {
    setPendingRotationSpeed(speed);
  };

  const applyChanges = () => {
    if (!isSimulationPaused) {
      setOrbitSpeedMultiplier(pendingOrbitSpeed);
      setRotationSpeedMultiplier(pendingRotationSpeed);
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
        sliderOrbitSpeed: pendingOrbitSpeed,
        sliderRotationSpeed: pendingRotationSpeed,
        isSimulationPaused,
        updateOrbitSpeed,
        updateRotationSpeed,
        applyChanges,
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
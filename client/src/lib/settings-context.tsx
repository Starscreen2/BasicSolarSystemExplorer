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

const SettingsContext = createContext<SettingsContextType | null>(null);

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
    setOrbitSpeedMultiplier(pendingOrbitSpeed);
    setRotationSpeedMultiplier(pendingRotationSpeed);
  };

  const toggleSimulationPause = () => {
    setIsSimulationPaused(!isSimulationPaused);
    if (isSimulationPaused) {
      // When resuming, apply the pending speeds
      setOrbitSpeedMultiplier(pendingOrbitSpeed);
      setRotationSpeedMultiplier(pendingRotationSpeed);
    } else {
      // When pausing, set speeds to 0 but keep pending values
      setOrbitSpeedMultiplier(0);
      setRotationSpeedMultiplier(0);
    }
  };

  const resetOrbits = () => {
    setPendingOrbitSpeed(1);
    setPendingRotationSpeed(1);
    setOrbitSpeedMultiplier(1);
    setRotationSpeedMultiplier(1);
    setIsSimulationPaused(false);
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
        toggleSimulationPause,
        resetOrbits,
        applyChanges,
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
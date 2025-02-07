import { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
  orbitSpeedMultiplier: number;
  rotationSpeedMultiplier: number;
  isSimulationPaused: boolean;
  setOrbitSpeedMultiplier: (speed: number) => void;
  setRotationSpeedMultiplier: (speed: number) => void;
  setIsSimulationPaused: (paused: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [orbitSpeedMultiplier, setOrbitSpeedMultiplier] = useState(1);
  const [rotationSpeedMultiplier, setRotationSpeedMultiplier] = useState(1);
  const [isSimulationPaused, setIsSimulationPaused] = useState(false);

  return (
    <SettingsContext.Provider
      value={{
        orbitSpeedMultiplier,
        rotationSpeedMultiplier,
        isSimulationPaused,
        setOrbitSpeedMultiplier,
        setRotationSpeedMultiplier,
        setIsSimulationPaused,
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

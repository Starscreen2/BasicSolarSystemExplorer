
import { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
  rotationSpeedMultiplier: number;
  setRotationSpeedMultiplier: (speed: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [rotationSpeedMultiplier, setRotationSpeedMultiplier] = useState(1);

  return (
    <SettingsContext.Provider
      value={{
        rotationSpeedMultiplier,
        setRotationSpeedMultiplier,
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

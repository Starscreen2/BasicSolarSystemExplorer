import { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
  orbitSpeedMultiplier: number;
  rotationSpeedMultiplier: number;
  sliderOrbitSpeed: number;
  sliderRotationSpeed: number;
  isSimulationPaused: boolean;
  isSimulationPaused: boolean;
  // Update functions that update both the slider state and, if not paused, the live speeds.
  updateOrbitSpeed: (speed: number) => void;
  updateRotationSpeed: (speed: number) => void;
  // Toggle pause/resume: on pause the live speeds become 0; on resume, they are restored from the slider.
  toggleSimulationPause: () => void;
  // Reset both slider and live speeds to their default (1)
  resetOrbits: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  // These are the values the slider displays.
  const [sliderOrbitSpeed, setSliderOrbitSpeed] = useState(1);
  const [sliderRotationSpeed, setSliderRotationSpeed] = useState(1);
  // These are the live speeds used in the simulation.
  const [orbitSpeed, setOrbitSpeed] = useState(1);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [isSimulationPaused, setIsSimulationPaused] = useState(false);

  // When the slider value changes, update the slider state;
  // if not paused, update the simulation speed as well.
  const updateOrbitSpeed = (speed: number) => {
    setSliderOrbitSpeed(speed);
    if (!isSimulationPaused) {
      setOrbitSpeed(speed);
    }
  };

  const updateRotationSpeed = (speed: number) => {
    setSliderRotationSpeed(speed);
    if (!isSimulationPaused) {
      setRotationSpeed(speed);
    }
  };

  // When pausing, live speeds are set to 0 (but the slider values remain intact).
  // On resume, the live speeds are restored from the slider values.
  const toggleSimulationPause = () => {
    if (!isSimulationPaused) {
      setOrbitSpeed(0);
      setRotationSpeed(0);
      setIsSimulationPaused(true);
    } else {
      setOrbitSpeed(sliderOrbitSpeed);
      setRotationSpeed(sliderRotationSpeed);
      setIsSimulationPaused(false);
    }
  };

  // Reset both slider values and live speeds to 1.
  const resetOrbits = () => {
    setSliderOrbitSpeed(1);
    setSliderRotationSpeed(1);
    if (!isSimulationPaused) {
      setOrbitSpeed(1);
      setRotationSpeed(1);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        sliderOrbitSpeed,
        sliderRotationSpeed,
        orbitSpeed,
        rotationSpeed,
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

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
  resetCamera: () => void;
  applyChanges: () => void;
  cameraRef: React.MutableRefObject<any> | null;
  setCameraRef: (ref: React.MutableRefObject<any>) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [orbitSpeedMultiplier, setOrbitSpeedMultiplier] = useState(1);
  const [rotationSpeedMultiplier, setRotationSpeedMultiplier] = useState(1);
  const [pendingOrbitSpeed, setPendingOrbitSpeed] = useState(1);
  const [pendingRotationSpeed, setPendingRotationSpeed] = useState(1);
  const [isSimulationPaused, setIsSimulationPaused] = useState(false);
  const [cameraRef, setCameraRefState] = useState<React.MutableRefObject<any> | null>(null);

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
      setOrbitSpeedMultiplier(pendingOrbitSpeed);
      setRotationSpeedMultiplier(pendingRotationSpeed);
    } else {
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

  const resetCamera = () => {
    console.log("Reset camera called in settings context");
    console.log("Camera ref:", cameraRef);
    console.log("Camera ref current:", cameraRef?.current);
    console.log("Reset method exists:", cameraRef?.current?.reset !== undefined);

    if (cameraRef?.current?.reset) {
      console.log("Executing camera reset");
      cameraRef.current.reset();
    } else {
      console.warn("Camera reset not available - missing ref or reset method");
    }
  };

  const setCameraRef = (ref: React.MutableRefObject<any>) => {
    console.log("Setting camera ref:", ref);
    console.log("Reset method available:", ref?.current?.reset !== undefined);
    setCameraRefState(ref);
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
        resetCamera,
        applyChanges,
        cameraRef,
        setCameraRef,
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
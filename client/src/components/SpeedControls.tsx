import { Button } from "@/components/ui/button";
import { useSettings } from "@/lib/settings-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2, FastForward, Rewind } from "lucide-react";
import { useState } from "react";

// Speed presets
const SPEED_PRESETS = [0, 0.5, 1, 2, 5, 10, 25, 50, 100];

export default function SpeedControls() {
  const {
    orbitSpeedMultiplier,
    rotationSpeedMultiplier,
    setOrbitSpeedMultiplier,
    setRotationSpeedMultiplier,
  } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  const resetSpeeds = () => {
    setOrbitSpeedMultiplier(1);
    setRotationSpeedMultiplier(1);
  };

  const getNextSpeed = (current: number) => {
    const currentIndex = SPEED_PRESETS.findIndex(speed => speed >= current);
    if (currentIndex === -1 || currentIndex === SPEED_PRESETS.length - 1) {
      return SPEED_PRESETS[0];
    }
    return SPEED_PRESETS[currentIndex + 1];
  };

  const getPrevSpeed = (current: number) => {
    const currentIndex = SPEED_PRESETS.findIndex(speed => speed >= current);
    if (currentIndex <= 0) {
      return SPEED_PRESETS[SPEED_PRESETS.length - 1];
    }
    return SPEED_PRESETS[currentIndex - 1];
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 bg-black/60 hover:bg-black/80"
        onClick={() => setIsOpen(true)}
      >
        <Settings2 className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 bg-black/80 border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Animation Controls</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <Settings2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">Orbital Speed</label>
              <span className="text-xs text-muted-foreground">
                {orbitSpeedMultiplier}x
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setOrbitSpeedMultiplier(getPrevSpeed(orbitSpeedMultiplier))}
                className="flex-1"
              >
                <Rewind className="h-4 w-4 mr-2" />
                Slower
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setOrbitSpeedMultiplier(getNextSpeed(orbitSpeedMultiplier))}
                className="flex-1"
              >
                Faster
                <FastForward className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">Rotation Speed</label>
              <span className="text-xs text-muted-foreground">
                {rotationSpeedMultiplier}x
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setRotationSpeedMultiplier(getPrevSpeed(rotationSpeedMultiplier))}
                className="flex-1"
              >
                <Rewind className="h-4 w-4 mr-2" />
                Slower
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setRotationSpeedMultiplier(getNextSpeed(rotationSpeedMultiplier))}
                className="flex-1"
              >
                Faster
                <FastForward className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          <Button variant="secondary" size="sm" onClick={resetSpeeds} className="w-full">
            Reset to Default
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
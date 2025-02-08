import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useSettings } from "@/components/SolarSystem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2, Pause, Play, RotateCcw } from "lucide-react";
import { useState } from "react";

export default function SpeedControls() {
  const {
    orbitSpeedMultiplier,
    rotationSpeedMultiplier,
    isSimulationPaused,
    setIsSimulationPaused,
    setOrbitSpeedMultiplier,
    setRotationSpeedMultiplier,
    resetOrbits,
  } = useSettings();

  const [isOpen, setIsOpen] = useState(false);

  const handleOrbitSpeedChange = (values: number[]) => {
    if (values && values.length > 0) {
      setOrbitSpeedMultiplier(values[0]);
    }
  };

  const handleRotationSpeedChange = (values: number[]) => {
    if (values && values.length > 0) {
      setRotationSpeedMultiplier(values[0]);
    }
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
                {orbitSpeedMultiplier.toFixed(1)}x
              </span>
            </div>
            <Slider
              defaultValue={[orbitSpeedMultiplier]}
              value={[orbitSpeedMultiplier]}
              onValueChange={handleOrbitSpeedChange}
              min={0}
              max={10}
              step={0.1}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">Rotation Speed</label>
              <span className="text-xs text-muted-foreground">
                {rotationSpeedMultiplier.toFixed(1)}x
              </span>
            </div>
            <Slider
              defaultValue={[rotationSpeedMultiplier]}
              value={[rotationSpeedMultiplier]}
              onValueChange={handleRotationSpeedChange}
              min={0}
              max={10}
              step={0.1}
              className="cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => setIsSimulationPaused(!isSimulationPaused)}
              className="w-full flex items-center gap-2"
            >
              {isSimulationPaused ? (
                <>
                  <Play className="h-4 w-4" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              )}
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={resetOrbits}
              className="w-full flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { useQuery } from "@tanstack/react-query";
import { Planet } from "@shared/schema";
import SolarSystem from "@/components/SolarSystem";
import PlanetCard from "@/components/PlanetCard";
import { Card } from "@/components/ui/card";
import { WithErrorBoundary } from "@/components/WithErrorBoundary";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  const { data: planets, isLoading } = useQuery<Planet[]>({
    queryKey: ["/api/planets"],
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        Explore Our Solar System
      </h1>

      <Card className="p-4 mb-8 bg-black/50">
        <div className="h-[600px]">
          <WithErrorBoundary
            fallback={
              <Alert className="h-full flex items-center justify-center">
                <AlertDescription>
                  Unable to load the 3D solar system visualization.
                  Please try refreshing the page.
                </AlertDescription>
              </Alert>
            }
          >
            <SolarSystem planets={planets || []} />
          </WithErrorBoundary>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planets?.map((planet) => (
          <WithErrorBoundary key={planet.id}>
            <PlanetCard planet={planet} />
          </WithErrorBoundary>
        ))}
      </div>
    </div>
  );
}
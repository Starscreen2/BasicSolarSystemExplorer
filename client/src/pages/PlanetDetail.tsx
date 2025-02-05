import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Planet } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PlanetDetail() {
  const [, params] = useRoute("/planet/:id");
  const planetId = params?.id;

  const { data: planet, isLoading } = useQuery<Planet>({
    queryKey: [`/api/planets/${planetId}`],
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!planet) {
    return <div>Planet not found</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        {planet.name}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-black/50">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-lg">{planet.description}</p>
          </CardContent>
        </Card>

        <Card className="bg-black/50">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Quick Facts</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Diameter</p>
                <p className="text-lg font-medium">{planet.diameter.toLocaleString()} km</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Distance from Sun</p>
                <p className="text-lg font-medium">{planet.distance.toLocaleString()} km</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Average Temperature</p>
                <p className="text-lg font-medium">{planet.temperature}°C</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-black/50">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Interesting Facts</h2>
            <ul className="list-disc list-inside space-y-2">
              {planet.facts.map((fact, index) => (
                <li key={index} className="text-lg">{fact}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Link } from "wouter";
import { Planet } from "@shared/schema";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PlanetCardProps {
  planet: Planet;
}

export default function PlanetCard({ planet }: PlanetCardProps) {
  return (
    <Card className="overflow-hidden bg-black/50 hover:bg-black/60 transition-colors">
      <CardHeader>
        <h2 className="text-2xl font-bold">{planet.name}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{planet.description}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/planet/${planet.id}`}>
          <Button variant="secondary" className="w-full group">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import PlanetDetail from "@/pages/PlanetDetail";
import Quiz from "@/pages/Quiz";
import NotFound from "@/pages/not-found";
import { SettingsProvider } from "@/lib/settings-context";
import SpeedControls from "@/components/SpeedControls";
import ErrorBoundary from "@/components/ErrorBoundary";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/planet/:id" component={PlanetDetail} />
      <Route path="/quiz" component={Quiz} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <SettingsProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="container mx-auto px-4">
              <Router />
            </main>
            <SpeedControls />
          </div>
          <Toaster />
        </SettingsProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
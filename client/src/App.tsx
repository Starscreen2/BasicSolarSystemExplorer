// App.tsx
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import PlanetDetail from "@/pages/PlanetDetail";
import Quiz from "@/pages/Quiz";
import SolarSystemBuilder from "@/pages/SolarSystemBuilder";
import NotFound from "@/pages/not-found";
import { SettingsProvider } from "@/lib/settings-context"; // Our new context provider
import SpeedControls from "@/components/SpeedControls";
import ErrorBoundary from "@/components/ErrorBoundary";
import { WithErrorBoundary } from "@/components/WithErrorBoundary";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/planet/:id">
        {(params) => (
          <WithErrorBoundary>
            <PlanetDetail />
          </WithErrorBoundary>
        )}
      </Route>
      <Route path="/quiz">
        {() => (
          <WithErrorBoundary>
            <Quiz />
          </WithErrorBoundary>
        )}
      </Route>
      <Route path="/builder">
        {() => (
          <WithErrorBoundary>
            <SolarSystemBuilder />
          </WithErrorBoundary>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <div className="min-h-screen bg-background text-foreground">
            <WithErrorBoundary>
              <Navigation />
            </WithErrorBoundary>
            <main className="container mx-auto px-4">
              <Router />
            </main>
            <WithErrorBoundary>
              <SpeedControls />
            </WithErrorBoundary>
          </div>
          <Toaster />
        </SettingsProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKeys?: any[];
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.state.hasError && this.props.resetKeys) {
      if (this.props.resetKeys.some((key, i) => key !== prevProps.resetKeys?.[i])) {
        this.reset();
      }
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="w-full max-w-md mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-destructive">Something went wrong</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error Details</AlertTitle>
              <AlertDescription className="mt-2 font-mono text-sm">
                {this.state.error?.message || 'An unexpected error occurred'}
              </AlertDescription>
            </Alert>
            <p className="text-muted-foreground text-sm">
              Try refreshing the page or contact support if the problem persists.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                this.reset();
                window.location.reload();
              }}
            >
              <ReloadIcon className="mr-2 h-4 w-4" />
              Reload Page
            </Button>
            <Button
              variant="default"
              onClick={this.reset}
            >
              Try Again
            </Button>
          </CardFooter>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
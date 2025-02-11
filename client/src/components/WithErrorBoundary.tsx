import React from "react";
import ErrorBoundary from "./ErrorBoundary";

interface WithErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export function WithErrorBoundary({ 
  children, 
  fallback, 
  onError 
}: WithErrorBoundaryProps) {
  return (
    <ErrorBoundary fallback={fallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
}

// Custom hook for error boundary
export function useErrorBoundary() {
  const wrapWithErrorBoundary = React.useCallback(
    (component: React.ReactNode, options?: { 
      fallback?: React.ReactNode;
      onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    }) => {
      return (
        <ErrorBoundary 
          fallback={options?.fallback} 
          onError={options?.onError}
        >
          {component}
        </ErrorBoundary>
      );
    },
    []
  );

  return { wrapWithErrorBoundary };
}

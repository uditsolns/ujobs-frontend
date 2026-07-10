'use client';

/**
 * Error Boundary Component
 * Catches React errors and displays fallback UI
 */

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-elevated p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-display font-bold text-neutral-900 mb-3">
              Something went wrong
            </h1>
            
            <p className="text-neutral-600 mb-2">
              We encountered an unexpected error. Don't worry, your data is safe.
            </p>
            
            {this.state.error && (
              <details className="mt-4 mb-6 text-left">
                <summary className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-700">
                  Technical details
                </summary>
                <pre className="mt-2 p-3 bg-neutral-50 rounded-lg text-xs text-neutral-700 overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={this.handleReset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Image Error Fallback
 */
export const ImageErrorFallback: React.FC<{ message?: string }> = ({ 
  message = 'Failed to load image' 
}) => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-neutral-100 text-neutral-400">
    <AlertTriangle className="h-8 w-8 mb-2" />
    <span className="text-xs font-medium">{message}</span>
  </div>
);

/**
 * Data Loading Error
 */
export const DataErrorFallback: React.FC<{ 
  message?: string;
  onRetry?: () => void;
}> = ({ 
  message = 'Failed to load data',
  onRetry
}) => (
  <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
      <AlertTriangle className="h-6 w-6 text-red-600" />
    </div>
    <h3 className="text-lg font-bold text-neutral-900 mb-2">Oops!</h3>
    <p className="text-neutral-600 mb-4">{message}</p>
    {onRetry && (
      <Button onClick={onRetry} size="sm" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Retry
      </Button>
    )}
  </div>
);

export default ErrorBoundary;

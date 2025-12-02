import React, { Component, type ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("App Crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#000', color: 'red', height: '100vh', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️ SYSTEM FAILURE ⚠️</h1>
          <p style={{ color: '#fff', marginBottom: '1rem' }}>The Aayan Bobs simulation encountered a critical error.</p>
          <pre style={{ backgroundColor: '#111', padding: '15px', overflow: 'auto', maxWidth: '80%', border: '1px solid #333', textAlign: 'left' }}>
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ marginTop: '20px', padding: '15px 30px', backgroundColor: '#22c55e', color: 'black', border: 'none', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            Reboot System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
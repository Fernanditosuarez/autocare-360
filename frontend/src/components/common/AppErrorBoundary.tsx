import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class AppErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error no capturado en la jerarquía de React:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#fff', borderRadius: '8px', margin: '2rem' }}>
                    <h2 style={{ color: '#dc2626' }}>Ocurrió un error inesperado en la interfaz</h2>
                    <p style={{ color: '#64748b' }}>{this.state.error?.message || 'Error no controlado'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                    >
                        Recargar Aplicación
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
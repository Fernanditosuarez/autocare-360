import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    loading?: boolean;
    children: ReactNode;
}

export function Button({ variant = 'primary', loading = false, disabled, children, ...props }: ButtonProps) {
    const getStyles = () => {
        switch (variant) {
            case 'secondary':
                return { backgroundColor: '#fff', color: '#334155', border: '1px solid #cbd5e1' };
            case 'danger':
                return { backgroundColor: '#dc2626', color: '#fff', border: 'none' };
            case 'ghost':
                return { backgroundColor: 'transparent', color: '#475569', border: '1px solid #e2e8f0' };
            default:
                return { backgroundColor: '#2563eb', color: '#fff', border: 'none' };
        }
    };

    return (
        <button
            disabled={disabled || loading}
            style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: disabled || loading ? 'not-allowed' : 'pointer',
                opacity: disabled || loading ? 0.6 : 1,
                ...getStyles(),
            }}
            {...props}
        >
            {loading ? 'Procesando...' : children}
        </button>
    );
}
interface EmptyStateProps {
    title: string;
    description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
    return (
        <div style={{ textAlign: 'center', padding: '3rem 1.5rem', backgroundColor: '#fff', borderRadius: '8px', border: '1px dashed #cbd5e1', margin: '1rem 0' }}>
            <h3 style={{ margin: '0 0 0.5rem', color: '#334155', fontSize: '1.1rem' }}>{title}</h3>
            {description && <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>{description}</p>}
        </div>
    );
}
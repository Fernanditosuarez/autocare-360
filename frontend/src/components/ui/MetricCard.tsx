interface MetricCardProps {
    label: string;
    value: number;
    helper?: string;
    color?: string;
}

export function MetricCard({ label, value, helper, color = '#2563eb' }: MetricCardProps) {
    return (
        <div
            style={{
                backgroundColor: '#fff',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                borderLeft: `4px solid ${color}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
        >
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>{label}</span>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', margin: '0.25rem 0' }}>{value}</div>
            {helper && <small style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{helper}</small>}
        </div>
    );
}
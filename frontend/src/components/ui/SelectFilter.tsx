interface Option {
    value: string;
    label: string;
}

interface SelectFilterProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
}

export function SelectFilter({ label, value, onChange, options }: SelectFilterProps) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {label && <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>{label}:</span>}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ padding: '0.45rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '0.875rem' }}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
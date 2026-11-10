import type { Cliente } from '../types/Cliente';

interface ClienteTableProps {
    clientes: Cliente[];
    onEdit: (id: number) => void;
    onDelete: (cliente: Cliente) => void;
    deletingId?: number | null;
}

export default function ClienteTable({ clientes, onEdit, onDelete, deletingId }: ClienteTableProps) {
    if (clientes.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#64748b' }}>
                No hay clientes registrados en el sistema.
            </div>
        );
    }

    return (
        <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '0.75rem 1rem', color: '#475569' }}>ID</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#475569' }}>Nombre Completo</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#475569' }}>Doc. Identidad</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#475569' }}>Teléfono</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#475569' }}>Correo Electrónico</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#475569' }}>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {clientes.map((c) => (
                    <tr key={c.clienteId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#64748b' }}>#{c.clienteId}</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: '#0f172a' }}>{c.nombreCompleto}</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>{c.documentoIdentidad}</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>{c.telefono || '—'}</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>{c.correoElectronico || '—'}</td>
                        <td style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem' }}>
                            <button
                                type="button"
                                onClick={() => onEdit(c.clienteId)}
                                style={{ padding: '0.25rem 0.6rem', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                            >
                                ✏️ Editar
                            </button>
                            <button
                                type="button"
                                onClick={() => onDelete(c)}
                                disabled={deletingId === c.clienteId}
                                style={{ padding: '0.25rem 0.6rem', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                            >
                                {deletingId === c.clienteId ? 'Eliminando...' : '🗑️ Eliminar'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
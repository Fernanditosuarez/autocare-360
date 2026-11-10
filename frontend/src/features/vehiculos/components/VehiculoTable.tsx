import type { Cliente } from '../../clientes/types/Cliente';
import type { TipoVehiculo, Vehiculo } from '../types/Vehiculo';

interface VehiculoTableProps {
    vehiculos: Vehiculo[];
    clientes: Cliente[];
    onEdit: (id: number) => void;
    onDelete: (vehiculo: Vehiculo) => void;
    deletingId?: number | null;
}

export default function VehiculoTable({
                                          vehiculos,
                                          clientes,
                                          onEdit,
                                          onDelete,
                                          deletingId,
                                      }: VehiculoTableProps) {
    const getBadgeStyle = (tipo: TipoVehiculo) => {
        switch (tipo) {
            case 'AUTO':
                return { backgroundColor: '#dbeafe', color: '#1e40af' };
            case 'SUV':
                return { backgroundColor: '#fef3c7', color: '#92400e' };
            case 'CAMIONETA':
                return { backgroundColor: '#e0e7ff', color: '#3730a3' };
            case 'MOTO':
                return { backgroundColor: '#dcfce7', color: '#166534' };
            default:
                return { backgroundColor: '#f1f5f9', color: '#475569' };
        }
    };

    const clienteMap = new Map(clientes.map((c) => [c.clienteId, c]));

    if (vehiculos.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#64748b' }}>
                No hay vehículos registrados para mostrar.
            </div>
        );
    }

    return (
        <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '0.75rem 1rem', color: '#475569' }}>Placa</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#475569' }}>Tipo</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#475569' }}>Marca / Modelo</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#475569' }}>Color</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#475569' }}>Cliente Propietario (1:N)</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#475569' }}>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {vehiculos.map((v) => {
                    const propietario = clienteMap.get(v.clienteId);
                    const nombrePropietario = propietario
                        ? `${propietario.nombreCompleto} (#${propietario.clienteId})`
                        : v.nombreCliente
                            ? `${v.nombreCliente} (#${v.clienteId})`
                            : `Cliente #${v.clienteId}`;

                    return (
                        <tr key={v.vehiculoId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '0.75rem 1rem', fontWeight: 'bold', color: '#0f172a' }}>{v.placa}</td>
                            <td style={{ padding: '0.75rem 1rem' }}>
                  <span
                      style={{
                          padding: '0.25rem 0.6rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          ...getBadgeStyle(v.tipo),
                      }}
                  >
                    {v.tipo}
                  </span>
                            </td>
                            <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>
                                {v.marca || '—'} {v.modelo || ''}
                            </td>
                            <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>{v.color || '—'}</td>
                            <td style={{ padding: '0.75rem 1rem', color: '#2563eb', fontWeight: 500 }}>
                                {nombrePropietario}
                            </td>
                            <td style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem' }}>
                                <button
                                    type="button"
                                    onClick={() => onEdit(v.vehiculoId)}
                                    style={{ padding: '0.25rem 0.6rem', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                    ✏️ Editar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onDelete(v)}
                                    disabled={deletingId === v.vehiculoId}
                                    style={{ padding: '0.25rem 0.6rem', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                    {deletingId === v.vehiculoId ? 'Eliminando...' : '🗑️ Eliminar'}
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
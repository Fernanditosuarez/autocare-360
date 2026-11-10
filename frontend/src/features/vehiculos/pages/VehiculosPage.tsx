import { useState } from 'react';
import { useClientes } from '../../clientes/hooks/useClientes';
import VehiculoForm from '../components/VehiculoForm';
import VehiculoTable from '../components/VehiculoTable';
import { useVehiculos } from '../hooks/useVehiculos';
import { vehiculoService } from '../services/vehiculoService';
import type { Vehiculo } from '../types/Vehiculo';

export default function VehiculosPage() {
    const { data: vehiculos, setData: setVehiculos, loading: loadingVehiculos, error: errorVehiculos, setError: setErrorVehiculos } = useVehiculos();
    const { data: clientes, loading: loadingClientes, error: errorClientes } = useClientes();

    const [editingVehiculo, setEditingVehiculo] = useState<Vehiculo | null>(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [clienteFiltro, setClienteFiltro] = useState<string>('');

    const loading = loadingVehiculos || loadingClientes;
    const error = errorVehiculos || errorClientes;

    const handleEdit = async (id: number) => {
        try {
            setLoadingDetail(true);
            setErrorVehiculos('');
            const vehiculo = await vehiculoService.obtenerPorId(id);
            setEditingVehiculo(vehiculo);
            setMostrarForm(true);
        } catch (err) {
            setErrorVehiculos(err instanceof Error ? err.message : 'No se pudo cargar el detalle del vehículo');
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleSaved = (saved: Vehiculo, mode: 'create' | 'edit') => {
        setVehiculos((prev) =>
            mode === 'create'
                ? [...prev, saved]
                : prev.map((item) => (item.vehiculoId === saved.vehiculoId ? saved : item))
        );
        setEditingVehiculo(null);
        setMostrarForm(false);
    };

    const handleDelete = async (vehiculo: Vehiculo) => {
        const confirmado = window.confirm(`¿Está seguro de eliminar el vehículo con placa "${vehiculo.placa}"?`);
        if (!confirmado) return;

        try {
            setDeletingId(vehiculo.vehiculoId);
            setErrorVehiculos('');
            await vehiculoService.eliminar(vehiculo.vehiculoId);
            setVehiculos((prev) => prev.filter((v) => v.vehiculoId !== vehiculo.vehiculoId));
            if (editingVehiculo?.vehiculoId === vehiculo.vehiculoId) {
                setEditingVehiculo(null);
                setMostrarForm(false);
            }
        } catch (err) {
            setErrorVehiculos(err instanceof Error ? err.message : 'No se pudo eliminar el vehículo');
        } finally {
            setDeletingId(null);
        }
    };

    // Estado derivado: se calcula directamente en render sin duplicar datos en un useState
    const vehiculosFiltrados = clienteFiltro
        ? vehiculos.filter((v) => v.clienteId === Number(clienteFiltro))
        : vehiculos;

    return (
        <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ margin: 0, color: '#0f172a' }}>Gestión de Vehículos (Refactorizado con Custom Hooks)</h2>
                    <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                        Listado controlado mediante `useVehiculos` ({vehiculos.length} registrados)
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingVehiculo(null);
                        setMostrarForm((prev) => !prev);
                    }}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
                    {mostrarForm ? '✕ Cerrar Formulario' : '+ Nuevo Vehículo'}
                </button>
            </div>

            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Filtrar por Cliente:</label>
                <select
                    value={clienteFiltro}
                    onChange={(e) => setClienteFiltro(e.target.value)}
                    style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
                >
                    <option value="">-- Todos los Clientes --</option>
                    {clientes.map((c) => (
                        <option key={c.clienteId} value={c.clienteId}>
                            {c.nombreCompleto} (#{c.clienteId})
                        </option>
                    ))}
                </select>
            </div>

            {loadingDetail && <div style={{ padding: '0.75rem', backgroundColor: '#e0f2fe', color: '#0369a1', borderRadius: '6px', marginBottom: '1rem' }}>Cargando detalle del vehículo...</div>}
            {error && <div style={{ padding: '1rem', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '6px', marginBottom: '1rem' }}>{error}</div>}

            {mostrarForm && (
                <VehiculoForm
                    clientes={clientes}
                    vehiculoToEdit={editingVehiculo}
                    onSaved={handleSaved}
                    onCancelEdit={() => {
                        setEditingVehiculo(null);
                        setMostrarForm(false);
                    }}
                />
            )}

            {loading ? (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>Cargando datos...</div>
            ) : (
                <VehiculoTable
                    vehiculos={vehiculosFiltrados}
                    clientes={clientes}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    deletingId={deletingId}
                />
            )}
        </section>
    );
}
import { useEffect, useState } from 'react';
import { clienteService } from '../../clientes/services/clienteService';
import type { Cliente } from '../../clientes/types/Cliente';
import VehiculoForm from '../components/VehiculoForm';
import VehiculoTable from '../components/VehiculoTable';
import { vehiculoService } from '../services/vehiculoService';
import type { Vehiculo } from '../types/Vehiculo';

export default function VehiculosPage() {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [editingVehiculo, setEditingVehiculo] = useState<Vehiculo | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [mostrarForm, setMostrarForm] = useState(false);
    const [clienteFiltro, setClienteFiltro] = useState<string>('');

    const cargarDatos = async (signal?: AbortSignal) => {
        try {
            setLoading(true);
            setError('');
            const [listaVehiculos, listaClientes] = await Promise.all([
                vehiculoService.listar(signal),
                clienteService.listar(signal),
            ]);
            setVehiculos(listaVehiculos);
            setClientes(listaClientes);
        } catch (err) {
            if (err instanceof DOMException && err.name === 'AbortError') return;
            setError(err instanceof Error ? err.message : 'Error al conectar con la API');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        cargarDatos(controller.signal);
        return () => controller.abort();
    }, []);

    const handleEdit = async (id: number) => {
        try {
            setLoadingDetail(true);
            setError('');
            const vehiculo = await vehiculoService.obtenerPorId(id);
            setEditingVehiculo(vehiculo);
            setMostrarForm(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo cargar el detalle del vehículo');
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
            setError('');
            await vehiculoService.eliminar(vehiculo.vehiculoId);
            setVehiculos((prev) => prev.filter((v) => v.vehiculoId !== vehiculo.vehiculoId));
            if (editingVehiculo?.vehiculoId === vehiculo.vehiculoId) {
                setEditingVehiculo(null);
                setMostrarForm(false);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo eliminar el vehículo');
        } finally {
            setDeletingId(null);
        }
    };

    const vehiculosFiltrados = clienteFiltro
        ? vehiculos.filter((v) => v.clienteId === Number(clienteFiltro))
        : vehiculos;

    return (
        <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ margin: 0, color: '#0f172a' }}>Gestión de Vehículos (CRUD + Relación 1:N)</h2>
                    <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                        Control de unidades conectadas a Spring Boot / PostgreSQL ({vehiculos.length} registradas)
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
                <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>Cargando vehículos desde Spring Boot...</div>
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
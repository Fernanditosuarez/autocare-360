import { useEffect, useState } from 'react';
import { useClientes } from '../../clientes/hooks/useClientes';
import { Button } from '../../../components/ui/Button';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Pagination } from '../../../components/ui/Pagination';
import { SearchInput } from '../../../components/ui/SearchInput';
import { SelectFilter } from '../../../components/ui/SelectFilter';

import VehiculoForm from '../components/VehiculoForm';
import VehiculoTable from '../components/VehiculoTable';
import { useVehiculos } from '../hooks/useVehiculos';
import { vehiculoService } from '../services/vehiculoService';
import type { Vehiculo } from '../types/Vehiculo';

const PAGE_SIZE = 5;

export default function VehiculosPage() {
    const { data: vehiculos, setData: setVehiculos, loading: loadingVehiculos, error: errorVehiculos, setError: setErrorVehiculos } = useVehiculos();
    const { data: clientes, loading: loadingClientes, error: errorClientes } = useClientes();

    const [search, setSearch] = useState('');
    const [clienteFiltro, setClienteFiltro] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('');
    const [page, setPage] = useState(1);
    const [editingVehiculo, setEditingVehiculo] = useState<Vehiculo | null>(null);
    const [pendingDelete, setPendingDelete] = useState<Vehiculo | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [mostrarForm, setMostrarForm] = useState(false);

    const loading = loadingVehiculos || loadingClientes;
    const error = errorVehiculos || errorClientes;

    useEffect(() => {
        setPage(1);
    }, [search, clienteFiltro, tipoFiltro]);

    const clienteMap = new Map(clientes.map((c) => [c.clienteId, c]));

    // Filtrado compuesto
    const vehiculosFiltrados = vehiculos.filter((v) => {
        const term = search.trim().toLowerCase();
        const propietario = clienteMap.get(v.clienteId);
        const nombrePropietario = propietario ? propietario.nombreCompleto.toLowerCase() : '';

        const matchesText =
            !term ||
            v.placa.toLowerCase().includes(term) ||
            (v.marca && v.marca.toLowerCase().includes(term)) ||
            (v.modelo && v.modelo.toLowerCase().includes(term)) ||
            nombrePropietario.includes(term);

        const matchesCliente = !clienteFiltro || v.clienteId === Number(clienteFiltro);
        const matchesTipo = !tipoFiltro || v.tipo === tipoFiltro;

        return matchesText && matchesCliente && matchesTipo;
    });

    const totalPages = Math.max(1, Math.ceil(vehiculosFiltrados.length / PAGE_SIZE));
    const visibleVehiculos = vehiculosFiltrados.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleEdit = async (id: number) => {
        try {
            setErrorVehiculos('');
            const vehiculo = await vehiculoService.obtenerPorId(id);
            setEditingVehiculo(vehiculo);
            setMostrarForm(true);
        } catch (err) {
            setErrorVehiculos(err instanceof Error ? err.message : 'Error al cargar el detalle del vehículo');
        }
    };

    const handleConfirmDelete = async () => {
        if (!pendingDelete) return;
        try {
            setDeleting(true);
            setErrorVehiculos('');
            await vehiculoService.eliminar(pendingDelete.vehiculoId);
            setVehiculos((prev) => prev.filter((v) => v.vehiculoId !== pendingDelete.vehiculoId));
            if (editingVehiculo?.vehiculoId === pendingDelete.vehiculoId) {
                setEditingVehiculo(null);
                setMostrarForm(false);
            }
        } catch (err) {
            setErrorVehiculos(err instanceof Error ? err.message : 'No se pudo eliminar el vehículo');
        } finally {
            setDeleting(false);
            setPendingDelete(null);
        }
    };

    const handleSaved = (saved: Vehiculo, mode: 'create' | 'edit') => {
        setVehiculos((prev) =>
            mode === 'create' ? [...prev, saved] : prev.map((item) => (item.vehiculoId === saved.vehiculoId ? saved : item))
        );
        setEditingVehiculo(null);
        setMostrarForm(false);
    };

    return (
        <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ margin: 0, color: '#0f172a' }}>Gestión de Vehículos (UI Compartida & Filtros)</h2>
                    <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                        Listado compuesto con filtros por cliente y tipo ({vehiculosFiltrados.length} encontrados)
                    </p>
                </div>
                <Button
                    onClick={() => {
                        setEditingVehiculo(null);
                        setMostrarForm((prev) => !prev);
                    }}
                >
                    {mostrarForm ? '✕ Cerrar Formulario' : '+ Nuevo Vehículo'}
                </Button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <SearchInput value={search} onChange={setSearch} placeholder="Buscar por placa, marca, propietario..." />

                <SelectFilter
                    label="Cliente"
                    value={clienteFiltro}
                    onChange={setClienteFiltro}
                    options={[
                        { value: '', label: '-- Todos los Clientes --' },
                        ...clientes.map((c) => ({ value: String(c.clienteId), label: c.nombreCompleto })),
                    ]}
                />

                <SelectFilter
                    label="Tipo"
                    value={tipoFiltro}
                    onChange={setTipoFiltro}
                    options={[
                        { value: '', label: '-- Todos los Tipos --' },
                        { value: 'AUTO', label: 'AUTO' },
                        { value: 'MOTO', label: 'MOTO' },
                        { value: 'CAMIONETA', label: 'CAMIONETA' },
                        { value: 'SUV', label: 'SUV' },
                    ]}
                />
            </div>

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
                <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>Cargando vehículos...</div>
            ) : visibleVehiculos.length === 0 ? (
                <EmptyState title="No se encontraron vehículos" description="Ajusta los filtros seleccionados para ver más resultados." />
            ) : (
                <>
                    <VehiculoTable vehiculos={visibleVehiculos} clientes={clientes} onEdit={handleEdit} onDelete={(v) => setPendingDelete(v)} />
                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </>
            )}

            <ConfirmDialog
                open={pendingDelete != null}
                title="Confirmar Eliminación"
                message={`¿Está seguro de eliminar el vehículo con placa "${pendingDelete?.placa}"?`}
                loading={deleting}
                onConfirm={handleConfirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </section>
    );
}
import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Pagination } from '../../../components/ui/Pagination';
import { SearchInput } from '../../../components/ui/SearchInput';

import ClienteForm from '../components/ClienteForm';
import ClienteTable from '../components/ClienteTable';
import { useClientes } from '../hooks/useClientes';
import { clienteService } from '../services/clienteService';
import type { Cliente } from '../types/Cliente';

const PAGE_SIZE = 5;

export default function ClientesPage() {
    const { data: clientes, setData: setClientes, loading, error, setError } = useClientes();

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
    const [pendingDelete, setPendingDelete] = useState<Cliente | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [mostrarForm, setMostrarForm] = useState(false);

    // Reiniciar página cuando cambia la búsqueda
    useEffect(() => {
        setPage(1);
    }, [search]);

    // Filtrado compuesto
    const clientesFiltrados = clientes.filter((c) => {
        const term = search.trim().toLowerCase();
        if (!term) return true;
        return (
            c.nombreCompleto.toLowerCase().includes(term) ||
            c.documentoIdentidad.toLowerCase().includes(term) ||
            (c.correoElectronico && c.correoElectronico.toLowerCase().includes(term)) ||
            (c.telefono && c.telefono.includes(term))
        );
    });

    // Paginación derivada
    const totalPages = Math.max(1, Math.ceil(clientesFiltrados.length / PAGE_SIZE));
    const visibleClientes = clientesFiltrados.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleEdit = async (id: number) => {
        try {
            setError('');
            const cliente = await clienteService.obtenerPorId(id);
            setEditingCliente(cliente);
            setMostrarForm(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar el detalle del cliente');
        }
    };

    const handleConfirmDelete = async () => {
        if (!pendingDelete) return;
        try {
            setDeleting(true);
            setError('');
            await clienteService.eliminar(pendingDelete.clienteId);
            setClientes((prev) => prev.filter((item) => item.clienteId !== pendingDelete.clienteId));
            if (editingCliente?.clienteId === pendingDelete.clienteId) {
                setEditingCliente(null);
                setMostrarForm(false);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo eliminar el cliente');
        } finally {
            setDeleting(false);
            setPendingDelete(null);
        }
    };

    const handleSaved = (saved: Cliente, mode: 'create' | 'edit') => {
        setClientes((prev) =>
            mode === 'create' ? [...prev, saved] : prev.map((item) => (item.clienteId === saved.clienteId ? saved : item))
        );
        setEditingCliente(null);
        setMostrarForm(false);
    };

    return (
        <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ margin: 0, color: '#0f172a' }}>Gestión de Clientes (UI Compartida & Filtros)</h2>
                    <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                        Listado con búsqueda en tiempo real y paginación ({clientesFiltrados.length} encontrados)
                    </p>
                </div>
                <Button
                    onClick={() => {
                        setEditingCliente(null);
                        setMostrarForm((prev) => !prev);
                    }}
                >
                    {mostrarForm ? '✕ Cerrar Formulario' : '+ Nuevo Cliente'}
                </Button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <SearchInput value={search} onChange={setSearch} placeholder="Buscar por nombre, DNI, correo..." />
            </div>

            {error && <div style={{ padding: '1rem', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '6px', marginBottom: '1rem' }}>{error}</div>}

            {mostrarForm && (
                <ClienteForm
                    clienteToEdit={editingCliente}
                    onSaved={handleSaved}
                    onCancelEdit={() => {
                        setEditingCliente(null);
                        setMostrarForm(false);
                    }}
                />
            )}

            {loading ? (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>Cargando clientes...</div>
            ) : visibleClientes.length === 0 ? (
                <EmptyState title="No se encontraron clientes" description="Intenta ajustar el término de búsqueda o limpia el filtro." />
            ) : (
                <>
                    <ClienteTable clientes={visibleClientes} onEdit={handleEdit} onDelete={(c) => setPendingDelete(c)} />
                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </>
            )}

            <ConfirmDialog
                open={pendingDelete != null}
                title="Confirmar Eliminación"
                message={`¿Está seguro de eliminar al cliente "${pendingDelete?.nombreCompleto}"?`}
                loading={deleting}
                onConfirm={handleConfirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </section>
    );
}
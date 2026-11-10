import { useState } from 'react';
import ClienteForm from '../components/ClienteForm';
import ClienteTable from '../components/ClienteTable';
import { useClientes } from '../hooks/useClientes';
import { clienteService } from '../services/clienteService';
import type { Cliente } from '../types/Cliente';

export default function ClientesPage() {
    const { data: clientes, setData: setClientes, loading, error, setError } = useClientes();
    const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [mostrarForm, setMostrarForm] = useState(false);

    const handleEdit = async (id: number) => {
        try {
            setLoadingDetail(true);
            setError('');
            const cliente = await clienteService.obtenerPorId(id);
            setEditingCliente(cliente);
            setMostrarForm(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo cargar la información del cliente');
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleSaved = (saved: Cliente, mode: 'create' | 'edit') => {
        setClientes((prev) =>
            mode === 'create'
                ? [...prev, saved]
                : prev.map((item) => (item.clienteId === saved.clienteId ? saved : item))
        );
        setEditingCliente(null);
        setMostrarForm(false);
    };

    const handleDelete = async (cliente: Cliente) => {
        const confirmado = window.confirm(`¿Está seguro de eliminar al cliente "${cliente.nombreCompleto}"?`);
        if (!confirmado) return;

        try {
            setDeletingId(cliente.clienteId);
            setError('');
            await clienteService.eliminar(cliente.clienteId);
            setClientes((prev) => prev.filter((item) => item.clienteId !== cliente.clienteId));
            if (editingCliente?.clienteId === cliente.clienteId) {
                setEditingCliente(null);
                setMostrarForm(false);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo eliminar el cliente (puede tener vehículos asociados)');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ margin: 0, color: '#0f172a' }}>Gestión de Clientes (Refactorizado con Custom Hooks)</h2>
                    <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                        Listado controlado mediante `useClientes` ({clientes.length} registrados)
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingCliente(null);
                        setMostrarForm((prev) => !prev);
                    }}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
                    {mostrarForm ? '✕ Cerrar Formulario' : '+ Nuevo Cliente'}
                </button>
            </div>

            {loadingDetail && <div style={{ padding: '0.75rem', backgroundColor: '#e0f2fe', color: '#0369a1', borderRadius: '6px', marginBottom: '1rem' }}>Cargando detalle para edición...</div>}
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
            ) : (
                <ClienteTable clientes={clientes} onEdit={handleEdit} onDelete={handleDelete} deletingId={deletingId} />
            )}
        </section>
    );
}
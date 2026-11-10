import { useEffect, useState } from 'react';
import ClienteForm from '../components/ClienteForm';
import ClienteTable from '../components/ClienteTable';
import { clienteService } from '../services/clienteService';
import type { Cliente } from '../types/Cliente';

export default function ClientesPage() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [mostrarForm, setMostrarForm] = useState(false);

    const cargarClientes = async (signal?: AbortSignal) => {
        try {
            setLoading(true);
            setError('');
            const data = await clienteService.listar(signal);
            setClientes(data);
        } catch (err) {
            if (err instanceof DOMException && err.name === 'AbortError') return;
            setError(err instanceof Error ? err.message : 'Error al conectar con la API');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        cargarClientes(controller.signal);
        return () => controller.abort();
    }, []);

    return (
        <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ margin: 0, color: '#0f172a' }}>Gestión de Clientes</h2>
                    <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                        Listado obtenido directamente del backend Spring Boot / PostgreSQL ({clientes.length})
                    </p>
                </div>
                <button
                    onClick={() => setMostrarForm((prev) => !prev)}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
                    {mostrarForm ? '✕ Cerrar Formulario' : '+ Nuevo Cliente'}
                </button>
            </div>

            {mostrarForm && (
                <ClienteForm
                    onSuccess={() => {
                        setMostrarForm(false);
                        cargarClientes();
                    }}
                />
            )}

            {loading && <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>Cargando clientes desde Spring Boot...</div>}
            {error && <div style={{ padding: '1rem', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '6px', marginBottom: '1rem' }}>{error}</div>}
            {!loading && !error && <ClienteTable clientes={clientes} />}
        </section>
    );
}
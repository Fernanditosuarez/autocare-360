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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [mostrarForm, setMostrarForm] = useState(false);

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

    return (
        <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ margin: 0, color: '#0f172a' }}>Gestión de Vehículos</h2>
                    <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                        Listado obtenido directamente del backend Spring Boot / PostgreSQL ({vehiculos.length})
                    </p>
                </div>
                <button
                    onClick={() => setMostrarForm((prev) => !prev)}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
                    {mostrarForm ? '✕ Cerrar Formulario' : '+ Nuevo Vehículo'}
                </button>
            </div>

            {mostrarForm && (
                <VehiculoForm
                    clientes={clientes}
                    onSuccess={() => {
                        setMostrarForm(false);
                        cargarDatos();
                    }}
                />
            )}

            {loading && <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>Cargando vehículos desde Spring Boot...</div>}
            {error && <div style={{ padding: '1rem', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '6px', marginBottom: '1rem' }}>{error}</div>}
            {!loading && !error && <VehiculoTable vehiculos={vehiculos} />}
        </section>
    );
}
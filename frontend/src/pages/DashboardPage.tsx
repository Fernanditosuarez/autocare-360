import { useClientes } from '../features/clientes/hooks/useClientes';
import { useVehiculos } from '../features/vehiculos/hooks/useVehiculos';
import { MetricCard } from '../components/ui/MetricCard';

export default function DashboardPage() {
    const { data: clientes, loading: loadingClientes, error: errorClientes } = useClientes();
    const { data: vehiculos, loading: loadingVehiculos, error: errorVehiculos } = useVehiculos();

    const loading = loadingClientes || loadingVehiculos;
    const error = errorClientes || errorVehiculos;

    // Cálculo de estado derivado (sin duplicar estado en useState)
    const totalClientes = clientes.length;
    const totalVehiculos = vehiculos.length;
    const vehiculosAuto = vehiculos.filter((v) => v.tipo === 'AUTO').length;
    const vehiculosMoto = vehiculos.filter((v) => v.tipo === 'MOTO').length;
    const vehiculosSuvCamioneta = vehiculos.filter((v) => v.tipo === 'SUV' || v.tipo === 'CAMIONETA').length;

    return (
        <section>
            <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, color: '#0f172a' }}>Panel Principal — AutoCare 360</h2>
                <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                    Resumen operativo en tiempo real derivado de PostgreSQL y Spring Boot
                </p>
            </div>

            {error && <div style={{ padding: '1rem', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '6px', marginBottom: '1rem' }}>{error}</div>}

            {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Cargando métricas del sistema...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <MetricCard label="Clientes Registrados" value={totalClientes} helper="Propietarios en base de datos" color="#2563eb" />
                    <MetricCard label="Total Vehículos" value={totalVehiculos} helper="Unidades ingresadas" color="#059669" />
                    <MetricCard label="Automóviles" value={vehiculosAuto} helper="Categoría AUTO" color="#3b82f6" />
                    <MetricCard label="Motocicletas" value={vehiculosMoto} helper="Categoría MOTO" color="#10b981" />
                    <MetricCard label="SUVs / Camionetas" value={vehiculosSuvCamioneta} helper="Vehículos pesados / medianos" color="#d97706" />
                </div>
            )}
        </section>
    );
}
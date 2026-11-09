import type { Vehiculo } from '../types/Vehiculo';

interface VehiculoCardProps {
    vehiculo: Vehiculo;
}

export default function VehiculoCard({ vehiculo }: VehiculoCardProps) {
    return (
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', background: '#fff' }}>
            <h3>Placa: {vehiculo.placa}</h3>
            <p><strong>Tipo:</strong> {vehiculo.tipo}</p>
            <p><strong>Modelo:</strong> {vehiculo.marca} {vehiculo.modelo}</p>
        </div>
    );
}
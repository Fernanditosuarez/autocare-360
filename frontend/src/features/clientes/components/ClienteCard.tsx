import type { Cliente } from '../types/Cliente';

interface ClienteCardProps {
    cliente: Cliente;
}

export default function ClienteCard({ cliente }: ClienteCardProps) {
    return (
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', background: '#fff' }}>
            <h3>{cliente.nombreCompleto}</h3>
            <p><strong>Documento:</strong> {cliente.documentoIdentidad}</p>
            {cliente.telefono && <p><strong>Teléfono:</strong> {cliente.telefono}</p>}
        </div>
    );
}
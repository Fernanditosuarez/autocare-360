import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Cliente } from '../../clientes/types/Cliente';
import type { VehiculoFormData } from '../types/VehiculoFormData';
import { validarVehiculo, type VehiculoFormErrors } from '../utils/vehiculoValidation';

const initialVehiculoState: VehiculoFormData = {
    placa: '',
    tipo: '',
    marca: '',
    modelo: '',
    color: '',
    clienteId: '',
};

interface VehiculoFormProps {
    clientes: Cliente[];
    onSuccess?: (nuevoVehiculoPayload: Record<string, unknown>) => void;
}

export default function VehiculoForm({ clientes, onSuccess }: VehiculoFormProps) {
    const [formData, setFormData] = useState<VehiculoFormData>(initialVehiculoState);
    const [errors, setErrors] = useState<VehiculoFormErrors>({});
    const [mensajeExito, setMensajeExito] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMensajeExito('');

        const validationErrors = validarVehiculo(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        // Convertir datos al payload esperado por el backend
        const payload = {
            placa: formData.placa.trim().toUpperCase(),
            tipo: formData.tipo,
            marca: formData.marca.trim() || undefined,
            modelo: formData.modelo.trim() || undefined,
            color: formData.color.trim() || undefined,
            clienteId: Number(formData.clienteId),
        };

        console.log('Vehículo listo para la API (Guía 05):', payload);
        setMensajeExito('¡Vehículo validado correctamente! Payload preparado con clienteId.');
        if (onSuccess) onSuccess(payload);
        setFormData(initialVehiculoState);
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
            <h3 style={{ marginTop: 0, color: '#0f172a' }}>Registrar Nuevo Vehículo</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Placa *</label>
                    <input
                        name="placa"
                        value={formData.placa}
                        onChange={handleChange}
                        placeholder="Ej: 3040XYZ"
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '0.25rem' }}
                    />
                    {errors.placa && <small style={{ color: '#ef4444' }}>{errors.placa}</small>}
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Tipo de Vehículo *</label>
                    <select
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '0.25rem', backgroundColor: '#fff' }}
                    >
                        <option value="">-- Seleccionar --</option>
                        <option value="AUTO">AUTO</option>
                        <option value="MOTO">MOTO</option>
                        <option value="CAMIONETA">CAMIONETA</option>
                        <option value="SUV">SUV</option>
                    </select>
                    {errors.tipo && <small style={{ color: '#ef4444' }}>{errors.tipo}</small>}
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Cliente Propietario (1:N) *</label>
                    <select
                        name="clienteId"
                        value={formData.clienteId}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '0.25rem', backgroundColor: '#fff' }}
                    >
                        <option value="">-- Seleccionar Cliente --</option>
                        {clientes.map((c) => (
                            <option key={c.clienteId} value={c.clienteId}>
                                {c.nombreCompleto} (#{c.clienteId})
                            </option>
                        ))}
                    </select>
                    {errors.clienteId && <small style={{ color: '#ef4444' }}>{errors.clienteId}</small>}
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Marca</label>
                    <input
                        name="marca"
                        value={formData.marca}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '0.25rem' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Modelo</label>
                    <input
                        name="modelo"
                        value={formData.modelo}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '0.25rem' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Color</label>
                    <input
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '0.25rem' }}
                    />
                </div>
            </div>

            {mensajeExito && <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '6px' }}>{mensajeExito}</div>}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                    type="button"
                    onClick={() => { setFormData(initialVehiculoState); setErrors({}); setMensajeExito(''); }}
                    style={{ padding: '0.5rem 1rem', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', cursor: 'pointer' }}
                >
                    Limpiar
                </button>
                <button
                    type="submit"
                    style={{ padding: '0.5rem 1rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
                    Guardar Vehículo
                </button>
            </div>
        </form>
    );
}
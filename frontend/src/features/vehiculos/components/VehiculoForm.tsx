import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import type { Cliente } from '../../clientes/types/Cliente';
import { vehiculoService, type VehiculoPayload } from '../services/vehiculoService';
import type { Vehiculo } from '../types/Vehiculo';
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
    vehiculoToEdit?: Vehiculo | null;
    onSaved: (savedVehiculo: Vehiculo, mode: 'create' | 'edit') => void;
    onCancelEdit?: () => void;
}

export default function VehiculoForm({
                                         clientes,
                                         vehiculoToEdit,
                                         onSaved,
                                         onCancelEdit,
                                     }: VehiculoFormProps) {
    const [formData, setFormData] = useState<VehiculoFormData>(initialVehiculoState);
    const [errors, setErrors] = useState<VehiculoFormErrors>({});
    const [saving, setSaving] = useState(false);
    const [apiError, setApiError] = useState('');

    const isEditing = vehiculoToEdit != null;

    useEffect(() => {
        if (vehiculoToEdit) {
            setFormData({
                placa: vehiculoToEdit.placa || '',
                tipo: vehiculoToEdit.tipo || '',
                marca: vehiculoToEdit.marca || '',
                modelo: vehiculoToEdit.modelo || '',
                color: vehiculoToEdit.color || '',
                clienteId: String(vehiculoToEdit.clienteId || ''),
            });
        } else {
            setFormData(initialVehiculoState);
        }
        setErrors({});
        setApiError('');
    }, [vehiculoToEdit]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setApiError('');

        const validationErrors = validarVehiculo(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        const payload: VehiculoPayload = {
            placa: formData.placa.trim().toUpperCase(),
            tipo: formData.tipo,
            marca: formData.marca.trim() || undefined,
            modelo: formData.modelo.trim() || undefined,
            color: formData.color.trim() || undefined,
            clienteId: Number(formData.clienteId),
        };

        try {
            setSaving(true);
            let vehiculoResultado: Vehiculo;

            if (isEditing && vehiculoToEdit) {
                vehiculoResultado = await vehiculoService.actualizar(vehiculoToEdit.vehiculoId, payload);
                onSaved(vehiculoResultado, 'edit');
            } else {
                vehiculoResultado = await vehiculoService.crear(payload);
                onSaved(vehiculoResultado, 'create');
            }

            setFormData(initialVehiculoState);
            setErrors({});
        } catch (err) {
            setApiError(err instanceof Error ? err.message : 'Error al guardar el vehículo');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
            <h3 style={{ marginTop: 0, color: '#0f172a' }}>
                {isEditing ? `Editar Vehículo (Placa: ${vehiculoToEdit.placa})` : 'Registrar Nuevo Vehículo'}
            </h3>

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

            {apiError && <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '6px' }}>{apiError}</div>}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                {isEditing && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        style={{ padding: '0.5rem 1rem', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', cursor: 'pointer' }}
                    >
                        Cancelar Edición
                    </button>
                )}
                <button
                    type="submit"
                    disabled={saving}
                    style={{ padding: '0.5rem 1rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
                    {saving ? 'Guardando...' : isEditing ? 'Actualizar Vehículo' : 'Guardar Vehículo'}
                </button>
            </div>
        </form>
    );
}
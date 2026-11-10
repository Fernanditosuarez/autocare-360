import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { clienteService } from '../services/clienteService';
import type { Cliente } from '../types/Cliente';
import type { ClienteFormData } from '../types/ClienteFormData';
import { validarCliente, type ClienteFormErrors } from '../utils/clienteValidation';

const initialFormState: ClienteFormData = {
    nombreCompleto: '',
    documentoIdentidad: '',
    correoElectronico: '',
    telefono: '',
    direccion: '',
};

interface ClienteFormProps {
    clienteToEdit?: Cliente | null;
    onSaved: (savedCliente: Cliente, mode: 'create' | 'edit') => void;
    onCancelEdit?: () => void;
}

export default function ClienteForm({ clienteToEdit, onSaved, onCancelEdit }: ClienteFormProps) {
    const [formData, setFormData] = useState<ClienteFormData>(initialFormState);
    const [errors, setErrors] = useState<ClienteFormErrors>({});
    const [saving, setSaving] = useState(false);
    const [apiError, setApiError] = useState('');

    const isEditing = clienteToEdit != null;

    useEffect(() => {
        if (clienteToEdit) {
            setFormData({
                nombreCompleto: clienteToEdit.nombreCompleto || '',
                documentoIdentidad: clienteToEdit.documentoIdentidad || '',
                correoElectronico: clienteToEdit.correoElectronico || '',
                telefono: clienteToEdit.telefono || '',
                direccion: clienteToEdit.direccion || '',
            });
        } else {
            setFormData(initialFormState);
        }
        setErrors({});
        setApiError('');
    }, [clienteToEdit]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setApiError('');

        const validationErrors = validarCliente(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        const payload: ClienteFormData = {
            ...formData,
            nombreCompleto: formData.nombreCompleto.trim(),
            documentoIdentidad: formData.documentoIdentidad.trim(),
            correoElectronico: formData.correoElectronico.trim().toLowerCase(),
        };

        try {
            setSaving(true);
            let clienteResultado: Cliente;

            if (isEditing && clienteToEdit) {
                clienteResultado = await clienteService.actualizar(clienteToEdit.clienteId, payload);
                onSaved(clienteResultado, 'edit');
            } else {
                clienteResultado = await clienteService.crear(payload);
                onSaved(clienteResultado, 'create');
            }

            setFormData(initialFormState);
            setErrors({});
        } catch (err) {
            setApiError(err instanceof Error ? err.message : 'Error al guardar cambios');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
            <h3 style={{ marginTop: 0, color: '#0f172a' }}>
                {isEditing ? `Editar Cliente #${clienteToEdit.clienteId}` : 'Registrar Nuevo Cliente'}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Nombre Completo *</label>
                    <input
                        name="nombreCompleto"
                        value={formData.nombreCompleto}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '0.25rem' }}
                    />
                    {errors.nombreCompleto && <small style={{ color: '#ef4444' }}>{errors.nombreCompleto}</small>}
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Doc. Identidad *</label>
                    <input
                        name="documentoIdentidad"
                        value={formData.documentoIdentidad}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '0.25rem' }}
                    />
                    {errors.documentoIdentidad && <small style={{ color: '#ef4444' }}>{errors.documentoIdentidad}</small>}
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Teléfono</label>
                    <input
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '0.25rem' }}
                    />
                    {errors.telefono && <small style={{ color: '#ef4444' }}>{errors.telefono}</small>}
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Correo Electrónico</label>
                    <input
                        type="email"
                        name="correoElectronico"
                        value={formData.correoElectronico}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '0.25rem' }}
                    />
                    {errors.correoElectronico && <small style={{ color: '#ef4444' }}>{errors.correoElectronico}</small>}
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Dirección</label>
                    <input
                        name="direccion"
                        value={formData.direccion}
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
                    {saving ? 'Guardando...' : isEditing ? 'Actualizar Cliente' : 'Guardar Cliente'}
                </button>
            </div>
        </form>
    );
}
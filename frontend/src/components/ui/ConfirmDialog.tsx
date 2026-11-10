import { Button } from './Button';
import { Modal } from './Modal';

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDialog({ open, title = 'Confirmar Acción', message, loading = false, onConfirm, onCancel }: ConfirmDialogProps) {
    return (
        <Modal open={open} title={title} onClose={onCancel}>
            <p style={{ margin: '0 0 1.5rem', color: '#334155', fontSize: '0.95rem' }}>{message}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <Button variant="secondary" onClick={onCancel} disabled={loading}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm} loading={loading}>
                    Eliminar
                </Button>
            </div>
        </Modal>
    );
}
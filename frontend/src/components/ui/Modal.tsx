import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
    open: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    if (!open) return null;

    return (
        <dialog
            ref={dialogRef}
            onCancel={onClose}
            style={{
                padding: 0,
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                maxWidth: '550px',
                width: '90%',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.125rem' }}>{title}</h3>
                <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#64748b' }}>
                    ✕
                </button>
            </div>
            <div style={{ padding: '1.5rem' }}>{children}</div>
        </dialog>
    );
}
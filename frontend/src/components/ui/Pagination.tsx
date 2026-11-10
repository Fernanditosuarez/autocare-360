import { Button } from './Button';

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', padding: '0.5rem 0' }}>
      <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
        Página <strong>{page}</strong> de <strong>{totalPages}</strong>
      </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="ghost" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
                    ← Anterior
                </Button>
                <Button variant="ghost" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
                    Siguiente →
                </Button>
            </div>
        </nav>
    );
}
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <section style={{ textAlign: 'center', padding: '3rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#ef4444' }}>404 — Página no encontrada</h2>
            <p style={{ color: '#64748b' }}>La ruta que intentas visitar no existe en AutoCare 360.</p>
            <Link
                to="/"
                style={{
                    display: 'inline-block',
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#2563eb',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '6px'
                }}
            >
                Volver al Inicio
            </Link>
        </section>
    );
}
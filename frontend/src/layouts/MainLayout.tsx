import { NavLink, Outlet } from 'react-router-dom';

export default function MainLayout() {
    const linkStyle = ({ isActive }: { isActive: boolean }) => ({
        display: 'block',
        padding: '0.75rem 1rem',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: 500,
        color: isActive ? '#2563eb' : '#64748b',
        backgroundColor: isActive ? '#eff6ff' : 'transparent',
        marginBottom: '0.25rem',
    });

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            {/* Sidebar Lateral */}
            <aside style={{ width: '250px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '1.5rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '2rem' }}>
                    AutoCare 360
                </h1>
                <nav>
                    <NavLink to="/" end style={linkStyle}>
                        📊 Dashboard
                    </NavLink>
                    <NavLink to="/clientes" style={linkStyle}>
                        👥 Clientes
                    </NavLink>
                    <NavLink to="/vehiculos" style={linkStyle}>
                        🚗 Vehículos
                    </NavLink>
                    <NavLink to="/configuracion" style={linkStyle}>
                        ⚙️ Configuración
                    </NavLink>
                </nav>
            </aside>

            {/* Área Dinámica de Contenido */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <header style={{ height: '60px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Panel Administrativo</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>Taller Mecánico</span>
                </header>

                <main style={{ padding: '2rem', flex: 1 }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
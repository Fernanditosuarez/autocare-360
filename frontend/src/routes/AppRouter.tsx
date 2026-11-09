import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import ClientesPage from '../features/clientes/pages/ClientesPage';
import VehiculosPage from '../features/vehiculos/pages/VehiculosPage';
import ConfiguracionPage from '../pages/ConfiguracionPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta principal contenedora que usa MainLayout */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="clientes" element={<ClientesPage />} />
                    <Route path="vehiculos" element={<VehiculosPage />} />
                    <Route path="configuracion" element={<ConfiguracionPage />} />
                </Route>

                {/* Captura de rutas no encontradas (404) */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
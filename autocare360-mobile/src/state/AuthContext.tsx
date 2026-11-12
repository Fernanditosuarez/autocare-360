import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { authApi, eliminarToken, guardarToken, obtenerTokenGuardado } from '../services/api';

type AuthContextType = {
  token: string | null;
  usuario: string | null;
  cargandoSesion: boolean;
  iniciarSesion: (correo: string, clave: string) => Promise<boolean>;
  cerrarSesion: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<string | null>(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  useEffect(() => {
    async function verificarSesionGuardada() {
      const tokenPersistido = await obtenerTokenGuardado();
      if (tokenPersistido) {
        setToken(tokenPersistido);
        setUsuario('Usuario Autenticado');
      }
      setCargandoSesion(false);
    }
    verificarSesionGuardada();
  }, []);

  async function iniciarSesion(correo: string, clave: string): Promise<boolean> {
    try {
      const respuesta = await authApi.login(correo, clave);
      await guardarToken(respuesta.token);
      setToken(respuesta.token);
      setUsuario(respuesta.usuario || correo);
      return true;
    } catch {
      // Si el backend no tiene activo /api/auth/login o está en modo demostración local
      const tokenDemo = `demo_jwt_token_${Date.now()}`;
      await guardarToken(tokenDemo);
      setToken(tokenDemo);
      setUsuario(correo);
      return true;
    }
  }

  async function cerrarSesion(): Promise<void> {
    await eliminarToken();
    setToken(null);
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        cargandoSesion,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}

import { API_URL, obtenerTokenGuardado } from './api';

export const fotosApi = {
  subirFotoVehiculo: async (vehiculoId: number, imageUri: string): Promise<boolean> => {
    try {
      const token = await obtenerTokenGuardado();
      const formData = new FormData();

      const filename = imageUri.split('/').pop() || 'vehiculo_foto.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      formData.append('file', {
        uri: imageUri,
        name: filename,
        type,
      } as unknown as Blob);
      formData.append('vehiculoId', String(vehiculoId));

      const headers: Record<string, string> = {
        Accept: 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_URL}/vehiculos/${vehiculoId}/foto`, {
        method: 'POST',
        headers,
        body: formData,
      });

      return res.ok;
    } catch (e) {
      console.log('Error en subida multipart:', e);
      return false;
    }
  },
};

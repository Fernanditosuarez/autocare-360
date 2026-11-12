import * as SQLite from 'expo-sqlite';
import type { Cliente } from '../models/parking';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function getDB() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync('autocare360_cache.db');
  }
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS clientes_cache (
      id INTEGER PRIMARY KEY NOT NULL,
      nombre TEXT NOT NULL,
      correo TEXT NOT NULL,
      activo INTEGER NOT NULL
    );
  `);
  return db;
}

export const sqliteService = {
  inicializar: async () => {
    try {
      await getDB();
      return true;
    } catch (e) {
      console.log('Error al inicializar SQLite:', e);
      return false;
    }
  },

  guardarClientes: async (clientes: Cliente[]) => {
    try {
      const db = await getDB();
      await db.execAsync('DELETE FROM clientes_cache;');
      for (const c of clientes) {
        await db.runAsync(
          'INSERT INTO clientes_cache (id, nombre, correo, activo) VALUES (?, ?, ?, ?);',
          [c.id, c.nombre, c.correo, c.activo ? 1 : 0]
        );
      }
      return true;
    } catch (e) {
      console.log('Error al guardar en SQLite:', e);
      return false;
    }
  },

  obtenerClientes: async (): Promise<Cliente[]> => {
    try {
      const db = await getDB();
      const filas = await db.getAllAsync<{ id: number; nombre: string; correo: string; activo: number }>(
        'SELECT * FROM clientes_cache ORDER BY nombre ASC;'
      );
      return filas.map((f) => ({
        id: f.id,
        nombre: f.nombre,
        correo: f.correo,
        activo: f.activo === 1,
      }));
    } catch (e) {
      console.log('Error al leer de SQLite:', e);
      return [];
    }
  },

  limpiarCache: async () => {
    try {
      const db = await getDB();
      await db.execAsync('DELETE FROM clientes_cache;');
      return true;
    } catch (e) {
      console.log('Error al limpiar SQLite:', e);
      return false;
    }
  },
};

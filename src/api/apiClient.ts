const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    if (!API_URL) {
        throw new Error('Falta configurar VITE_API_URL en .env.development');
    }

    const headers = new Headers(options.headers);
    if (options.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const detail = await response.text();
        throw new ApiError(
            response.status,
            detail || response.statusText || 'Error HTTP en la petición'
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}
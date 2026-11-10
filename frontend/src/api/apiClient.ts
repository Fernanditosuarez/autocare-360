const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error HTTP ${response.status}`);
    }

    if (response.status === 240 || response.headers.get('content-length') === '0') {
        return {} as T;
    }

    return response.json();
}
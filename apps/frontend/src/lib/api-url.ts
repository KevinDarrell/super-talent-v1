export function getApiBaseUrl(): string {
    if (typeof window === 'undefined') {
        return process.env.BACKEND_URL || 'http://backend:3001';
    }

    return `${window.location.origin}/api/backend`;
}

export const API_BASE_URL = typeof window !== 'undefined'
    ? getApiBaseUrl()
    : (process.env.BACKEND_URL || 'http://backend:3001');
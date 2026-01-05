/**
 * Dynamic API URL utility
 * Auto-detects the backend API URL based on the browser's current location
 * This eliminates the need to hardcode IP addresses in environment variables
 */

/**
 * Get the API base URL dynamically
 * - In browser: Uses current hostname with backend port (3001)
 * - In server/build: Uses environment variable or localhost
 */
export function getApiBaseUrl(): string {
    // Server-side or build time: use environment variable
    if (typeof window === 'undefined') {
        return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    }

    // Client-side: auto-detect from current location
    const { protocol, hostname } = window.location;

    // If explicitly set via env var, use it (for production with custom domains)
    if (process.env.NEXT_PUBLIC_API_URL &&
        !process.env.NEXT_PUBLIC_API_URL.includes('localhost')) {
        return process.env.NEXT_PUBLIC_API_URL;
    }

    // Auto-detect: use same hostname with backend port
    return `${protocol}//${hostname}:3001`;
}

// Export a constant for backward compatibility
export const API_BASE_URL = typeof window !== 'undefined'
    ? getApiBaseUrl()
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001');

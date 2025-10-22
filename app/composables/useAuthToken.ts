import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    exp?: number;
    iat?: number;
    sub?: string;
}

interface AuthTokenComposable {
    getToken: () => string | null;
    setToken: (token: string, maxAge?: number) => void;
    isAuthenticated: () => boolean;
    clearToken: () => void;
    decodeToken: (token: string | null) => JwtPayload | null;
}

export const useAuthToken = (): AuthTokenComposable => {
    const getToken = (): string | null => {
        return useCookie('auth_token').value ?? null;
    };

    const setToken = (token: string, maxAge: number = 60 * 60 * 24 * 7): void => {
        const tokenCookie = useCookie('auth_token', { maxAge });
        tokenCookie.value = token;
    };

    const clearToken = (): void => {
        const tokenCookie = useCookie('auth_token');
        tokenCookie.value = null;
    };

    const decodeToken = (token: string | null): JwtPayload | null => {
        if (!token) return null;
        try {
            return jwtDecode<JwtPayload>(token);
        } catch {
            return null;
        }
    };

    const isTokenValid = (token: string | null): boolean => {
        const decoded = decodeToken(token);
        if (!decoded?.exp) return false;
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    };

    const isAuthenticated = (): boolean => {
        const token = getToken();
        const valid = isTokenValid(token);
        if (!valid) {
            clearToken();
        }
        return valid;
    };

    return {
        getToken,
        setToken,
        clearToken,
        isAuthenticated,
        decodeToken,
    };
};

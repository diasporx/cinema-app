import type { IAuthRepo } from '@core/domain/auth/IAuthRepo'
import type { AuthResponse, AuthCredentials, HttpError } from '@core/domain/auth/types'
import { AuthError, ValidationError, ConflictError, ServerError, UnauthorizedError } from '@core/domain/auth/AuthErrors'

export class AuthRepoHttp implements IAuthRepo {
    private handleError(error: unknown): never {
        const httpError = error as HttpError

        const statusCode = httpError?.statusCode || httpError?.status
        const data = httpError?.data || httpError?.response?._data
        const message = data?.message || httpError?.message || 'Неизвестная ошибка'

        switch (statusCode) {
            case 400:
                throw new ValidationError(message, data)
            case 401:
                throw new UnauthorizedError(message, data)
            case 409:
                throw new ConflictError(message, data)
            case 500:
                throw new ServerError(message, data)
            default:
                throw new AuthError(message, statusCode, data)
        }
    }

    async login(credentials: AuthCredentials): Promise<AuthResponse> {
        try {
            return await $fetch<AuthResponse>('/api/login', {
                method: 'POST',
                body: credentials,
            })
        } catch (error) {
            this.handleError(error)
        }
    }

    async register(credentials: AuthCredentials): Promise<AuthResponse> {
        try {
            return await $fetch<AuthResponse>('/api/register', {
                method: 'POST',
                body: credentials,
            })
        } catch (error) {
            this.handleError(error)
        }
    }

    async logout(): Promise<void> {
        try {
            await $fetch('/api/logout', { method: 'POST' })
        } catch (error) {
            this.handleError(error)
        }
    }
}

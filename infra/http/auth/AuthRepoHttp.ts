import { HttpErrorHandler } from '@core/domain/shared/HttpErrorHandler'
import type { IAuthRepo } from '@core/domain/auth/IAuthRepo'
import type { AuthResponse, AuthCredentials } from '@core/domain/auth/types'

export class AuthRepoHttp implements IAuthRepo {
    constructor(private apiBase: string) {}

    async login(credentials: AuthCredentials): Promise<AuthResponse> {
        try {
            return await $fetch<AuthResponse>('/api/login', {
                method: 'POST',
                body: credentials,
            })
        } catch (error) {
            HttpErrorHandler.handle(error)
        }
    }

    async register(credentials: AuthCredentials): Promise<AuthResponse> {
        try {
            return await $fetch<AuthResponse>('/api/register', {
                method: 'POST',
                body: credentials,
            })
        } catch (error) {
            HttpErrorHandler.handle(error)
        }
    }

    async logout(): Promise<void> {
        try {
            await $fetch('/api/logout', { method: 'POST' })
        } catch (error) {
            HttpErrorHandler.handle(error)
        }
    }
}

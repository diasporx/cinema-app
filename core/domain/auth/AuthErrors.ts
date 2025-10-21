import type { ErrorResponse } from './types'

export class AuthError extends Error {
    constructor(message: string, public statusCode?: number, public data?: ErrorResponse) {
        super(message)
        this.name = 'AuthError'
    }
}

export class ValidationError extends AuthError {
    constructor(message: string, data?: ErrorResponse) {
        super(message, 400, data)
        this.name = 'ValidationError'
    }
}

export class ConflictError extends AuthError {
    constructor(message: string, data?: ErrorResponse) {
        super(message, 409, data)
        this.name = 'ConflictError'
    }
}

export class ServerError extends AuthError {
    constructor(message: string, data?: ErrorResponse) {
        super(message, 500, data)
        this.name = 'ServerError'
    }
}

export class UnauthorizedError extends AuthError {
    constructor(message: string, data?: ErrorResponse) {
        super(message, 401, data)
        this.name = 'UnauthorizedError'
    }
}

export class NetworkError extends AuthError {
    constructor(message: string) {
        super(message, 0)
        this.name = 'NetworkError'
    }
}

export function isAuthError(error: unknown): error is AuthError {
    return error instanceof AuthError
}

export function isValidationError(error: unknown): error is ValidationError {
    return error instanceof ValidationError
}

export function isConflictError(error: unknown): error is ConflictError {
    return error instanceof ConflictError
}

export function isServerError(error: unknown): error is ServerError {
    return error instanceof ServerError
}

export function isUnauthorizedError(error: unknown): error is UnauthorizedError {
    return error instanceof UnauthorizedError
}

export function isNetworkError(error: unknown): error is NetworkError {
    return error instanceof NetworkError
}

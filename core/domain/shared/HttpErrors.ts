import type { ErrorResponse } from '../auth/types'

export class BaseHttpError extends Error {
    constructor(message: string, public statusCode?: number, public data?: ErrorResponse) {
        super(message)
        this.name = 'HttpError'
    }
}

export class ValidationError extends BaseHttpError {
    constructor(message: string, data?: ErrorResponse) {
        super(message, 400, data)
        this.name = 'ValidationError'
    }
}

export class ConflictError extends BaseHttpError {
    constructor(message: string, data?: ErrorResponse) {
        super(message, 409, data)
        this.name = 'ConflictError'
    }
}

export class ServerError extends BaseHttpError {
    constructor(message: string, data?: ErrorResponse) {
        super(message, 500, data)
        this.name = 'ServerError'
    }
}

export class UnauthorizedError extends BaseHttpError {
    constructor(message: string, data?: ErrorResponse) {
        super(message, 401, data)
        this.name = 'UnauthorizedError'
    }
}

export class NetworkError extends BaseHttpError {
    constructor(message: string) {
        super(message, 0)
        this.name = 'NetworkError'
    }
}

export function isHttpError(error: unknown): error is BaseHttpError {
    return error instanceof BaseHttpError
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

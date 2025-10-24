export interface AuthResponse {
    token: string
    message?: string
}

export interface ErrorResponse {
    message: string
    code?: string
    details?: any
}

export interface HttpError {
    status?: number
    statusCode: number
    statusMessage?: string
    data?: ErrorResponse
    message?: string
    response?: {
        _data?: ErrorResponse
    }
}

export interface AuthCredentials {
    username: string
    password: string
}

export type ErrorsMessages = Record<string, string>;
export type SuccessMessages = Record<string, string>;

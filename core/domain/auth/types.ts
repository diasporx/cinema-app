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

export interface LoginForm {
    username: string
    password: string
}

export interface RegisterForm {
    username: string
    password: string
}

export interface AuthCredentials {
    username: string
    password: string
}

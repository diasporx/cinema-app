import {
    isValidationError,
    isConflictError,
    isServerError,
    isUnauthorizedError,
    isNetworkError,
    isAuthError
} from './AuthErrors'

export function getErrorMessage(error: unknown): string {
    if (isValidationError(error) ||
        isConflictError(error) ||
        isServerError(error) ||
        isUnauthorizedError(error) ||
        isAuthError(error)) {
        return (error as { message: string }).message
    }

    if (isNetworkError(error)) {
        return 'Проверьте подключение к интернету'
    }

    const err = error as Error
    return err.message || 'Неизвестная ошибка'
}

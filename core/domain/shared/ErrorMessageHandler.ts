import { isHttpError, isValidationError, isConflictError, isServerError, isUnauthorizedError, isNetworkError } from './HttpErrors'

export function getErrorMessage(error: unknown): string {
    if (isValidationError(error) ||
        isConflictError(error) ||
        isServerError(error) ||
        isUnauthorizedError(error) ||
        isHttpError(error)) {
        return (error as { message: string }).message
    }

    if (isNetworkError(error)) {
        return 'Проверьте подключение к интернету'
    }

    const err = error as Error
    return err.message || 'Неизвестная ошибка'
}

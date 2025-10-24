import type { HttpError } from '@core/domain/auth/types';
import {
  ValidationError,
  ConflictError,
  ServerError,
  UnauthorizedError,
  NetworkError,
  BaseHttpError,
} from './HttpErrors';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class HttpErrorHandler {
  static handle(error: unknown): never {
    const httpError = error as HttpError;

    const statusCode = httpError?.statusCode || httpError?.status;
    const data = httpError?.data || httpError?.response?._data;
    const message = data?.message || httpError?.message || 'Неизвестная ошибка';

    switch (statusCode) {
      case 400:
        throw new ValidationError(message, data);
      case 401:
        throw new UnauthorizedError(message, data);
      case 409:
        throw new ConflictError(message, data);
      case 500:
        throw new ServerError(message, data);
      default:
        if (statusCode === 0 || !statusCode) {
          throw new NetworkError('Проверьте подключение к интернету');
        }
        throw new BaseHttpError(message, statusCode, data);
    }
  }
}

import { describe, it, expect } from 'vitest';
import { HttpErrorHandler } from '../../core/domain/shared/HttpErrorHandler';
import {
  BaseHttpError,
  ValidationError,
  UnauthorizedError,
  ConflictError,
  ServerError,
  NetworkError,
} from '../../core/domain/shared/HttpErrors';

describe('HttpErrorHandler.handle', () => {
  it('должен бросать ValidationError для статуса 400', () => {
    const mockError = {
      status: 400,
      data: { message: 'Invalid input' },
      message: 'Bad Request',
    };

    expect(() => HttpErrorHandler.handle(mockError)).toThrow(ValidationError);
    try {
      HttpErrorHandler.handle(mockError);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).message).toBe('Invalid input');
      expect((error as ValidationError).statusCode).toBe(400);
    }
  });

  it('должен бросать UnauthorizedError для статуса 401', () => {
    const mockError = {
      status: 401,
      data: { message: 'Unauthorized access' },
      message: 'Unauthorized',
    };

    expect(() => HttpErrorHandler.handle(mockError)).toThrow(UnauthorizedError);
    try {
      HttpErrorHandler.handle(mockError);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect((error as UnauthorizedError).message).toBe('Unauthorized access');
      expect((error as UnauthorizedError).statusCode).toBe(401);
    }
  });

  it('должен бросать ConflictError для статуса 409', () => {
    const mockError = {
      status: 409,
      data: { message: 'Resource conflict' },
      message: 'Conflict',
    };

    expect(() => HttpErrorHandler.handle(mockError)).toThrow(ConflictError);
    try {
      HttpErrorHandler.handle(mockError);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictError);
      expect((error as ConflictError).message).toBe('Resource conflict');
      expect((error as ConflictError).statusCode).toBe(409);
    }
  });

  it('должен бросать ServerError для статуса 500', () => {
    const mockError = {
      status: 500,
      data: { message: 'Internal server error' },
      message: 'Server Error',
    };

    expect(() => HttpErrorHandler.handle(mockError)).toThrow(ServerError);
    try {
      HttpErrorHandler.handle(mockError);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerError);
      expect((error as ServerError).message).toBe('Internal server error');
      expect((error as ServerError).statusCode).toBe(500);
    }
  });

  it('должен бросать NetworkError для статуса 0 (сетевая ошибка)', () => {
    const mockError = {
      status: 0,
      message: 'Network Error',
    };

    expect(() => HttpErrorHandler.handle(mockError)).toThrow(NetworkError);
    try {
      HttpErrorHandler.handle(mockError);
    } catch (error) {
      expect(error).toBeInstanceOf(NetworkError);
      expect((error as NetworkError).message).toBe(
        'Проверьте подключение к интернету',
      );
      expect((error as NetworkError).statusCode).toBe(0);
    }
  });

  it('должен бросать NetworkError для неопределённого статуса (сетевая ошибка)', () => {
    const mockError = {
      message: 'Unknown network error',
    };

    expect(() => HttpErrorHandler.handle(mockError)).toThrow(NetworkError);
    try {
      HttpErrorHandler.handle(mockError);
    } catch (error) {
      expect(error).toBeInstanceOf(NetworkError);
      expect((error as NetworkError).message).toBe(
        'Проверьте подключение к интернету',
      );
    }
  });

  it('должен бросать BaseHttpError для неизвестного статуса', () => {
    const mockError = {
      status: 404,
      data: { message: 'Not found' },
      message: 'Not Found',
    };

    expect(() => HttpErrorHandler.handle(mockError)).toThrow(BaseHttpError);
    try {
      HttpErrorHandler.handle(mockError);
    } catch (error) {
      expect(error).toBeInstanceOf(BaseHttpError);
      expect((error as BaseHttpError).message).toBe('Not found');
      expect((error as BaseHttpError).statusCode).toBe(404);
    }
  });

  it('должен использовать резервное сообщение, если data.message отсутствует', () => {
    const mockError = {
      status: 400,
      message: 'Fallback message',
    };

    expect(() => HttpErrorHandler.handle(mockError)).toThrow(ValidationError);
    try {
      HttpErrorHandler.handle(mockError);
    } catch (error) {
      expect((error as ValidationError).message).toBe('Fallback message');
    }
  });

  it('должен использовать сообщение по умолчанию, если сообщение недоступно', () => {
    const mockError = {
      status: 400,
    };

    expect(() => HttpErrorHandler.handle(mockError)).toThrow(ValidationError);
    try {
      HttpErrorHandler.handle(mockError);
    } catch (error) {
      expect((error as ValidationError).message).toBe('Неизвестная ошибка');
    }
  });
});

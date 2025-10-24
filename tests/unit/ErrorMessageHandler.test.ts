import { describe, it, expect } from 'vitest';
import { getErrorMessage } from '../../core/domain/shared/ErrorMessageHandler';
import {
  ValidationError,
  ConflictError,
  ServerError,
  UnauthorizedError,
  NetworkError,
  BaseHttpError,
} from '../../core/domain/shared/HttpErrors';

describe('getErrorMessage', () => {
  it('должен возвращать сообщение для ValidationError', () => {
    const error = new ValidationError('Invalid input');
    expect(getErrorMessage(error)).toBe('Invalid input');
  });

  it('должен возвращать сообщение для ConflictError', () => {
    const error = new ConflictError('Resource conflict');
    expect(getErrorMessage(error)).toBe('Resource conflict');
  });

  it('должен возвращать сообщение для ServerError', () => {
    const error = new ServerError('Internal server error');
    expect(getErrorMessage(error)).toBe('Internal server error');
  });

  it('должен возвращать сообщение для UnauthorizedError', () => {
    const error = new UnauthorizedError('Unauthorized access');
    expect(getErrorMessage(error)).toBe('Unauthorized access');
  });

  it('должен возвращать сообщение для BaseHttpError', () => {
    const error = new BaseHttpError('Not found', 404);
    expect(getErrorMessage(error)).toBe('Not found');
  });

  it('должен возвращать специальное сообщение для NetworkError', () => {
    const error = new NetworkError('Network error');
    expect(getErrorMessage(error)).toBe('Network error');
  });

  it('должен возвращать сообщение для обычного Error', () => {
    const error = new Error('Some error');
    expect(getErrorMessage(error)).toBe('Some error');
  });

  it('должен возвращать сообщение по умолчанию для Error без сообщения', () => {
    const error = new Error('');
    expect(getErrorMessage(error)).toBe('Неизвестная ошибка');
  });

  it('должен возвращать сообщение по умолчанию для неизвестного типа ошибки', () => {
    const error = 'string error';
    expect(getErrorMessage(error)).toBe('Неизвестная ошибка');
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthRepoHttp } from '../../infra/http/auth/AuthRepoHttp';
import type {
  AuthCredentials,
  AuthResponse,
} from '../../core/domain/auth/types';

describe('AuthRepoHttp', () => {
  let authRepo: AuthRepoHttp;

  beforeEach(() => {
    authRepo = new AuthRepoHttp('http://localhost:3000');
  });

  describe('login', () => {
    it('должен успешно выполнить вход и вернуть ответ', async () => {
      const credentials: AuthCredentials = {
        username: 'testuser',
        password: 'ValidPass123',
      };
      const expectedResponse: AuthResponse = {
        token: 'fake-jwt-token',
        message: 'Login successful',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockResolvedValue(expectedResponse);

      const result = await authRepo.login(credentials);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((global as any).$fetch).toHaveBeenCalledWith('/api/login', {
        method: 'POST',
        body: credentials,
      });
      expect(result).toEqual(expectedResponse);
    });

    it('должен обработать ошибку HTTP и бросить исключение', async () => {
      const credentials: AuthCredentials = {
        username: 'testuser',
        password: 'ValidPass123',
      };
      const mockError = new Error('Network error');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockRejectedValue(mockError);

      await expect(authRepo.login(credentials)).rejects.toThrow(
        'Проверьте подключение к интернету',
      );
    });
  });

  describe('register', () => {
    it('должен успешно выполнить регистрацию и вернуть ответ', async () => {
      const credentials: AuthCredentials = {
        username: 'newuser',
        password: 'ValidPass123',
      };
      const expectedResponse: AuthResponse = {
        token: 'fake-jwt-token',
        message: 'Registration successful',
      };

      (global as any).$fetch = vi.fn().mockResolvedValue(expectedResponse);

      const result = await authRepo.register(credentials);

      expect((global as any).$fetch).toHaveBeenCalledWith('/api/register', {
        method: 'POST',
        body: credentials,
      });
      expect(result).toEqual(expectedResponse);
    });

    it('должен обработать ошибку HTTP и бросить исключение', async () => {
      const credentials: AuthCredentials = {
        username: 'newuser',
        password: 'ValidPass123',
      };
      const mockError = new Error('Registration failed');

      (global as any).$fetch = vi.fn().mockRejectedValue(mockError);

      await expect(authRepo.register(credentials)).rejects.toThrow(
        'Проверьте подключение к интернету',
      );
    });
  });

  describe('logout', () => {
    it('должен успешно выполнить выход', async () => {
      (global as any).$fetch = vi.fn().mockResolvedValue(undefined);

      await expect(authRepo.logout()).resolves.toBeUndefined();

      expect((global as any).$fetch).toHaveBeenCalledWith('/api/logout', {
        method: 'POST',
      });
    });

    it('должен обработать ошибку HTTP и бросить исключение', async () => {
      const mockError = new Error('Logout failed');

      (global as any).$fetch = vi.fn().mockRejectedValue(mockError);

      await expect(authRepo.logout()).rejects.toThrow(
        'Проверьте подключение к интернету',
      );
    });
  });
});

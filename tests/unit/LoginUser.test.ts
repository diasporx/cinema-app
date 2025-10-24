import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginUser } from '../../core/application/auth/LoginUser';
import type { IAuthRepo } from '../../core/domain/auth/IAuthRepo';
import type {
  AuthCredentials,
  AuthResponse,
} from '../../core/domain/auth/types';

describe('LoginUser', () => {
  let mockRepo: IAuthRepo;
  let loginUser: LoginUser;

  beforeEach(() => {
    mockRepo = {
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
    };
    loginUser = new LoginUser(mockRepo);
  });

  describe('login', () => {
    it('должен валидировать учетные данные и вызывать repo.login с правильными учетными данными', async () => {
      const credentials: AuthCredentials = {
        username: 'validuser',
        password: 'ValidPass123',
      };
      const expectedResponse: AuthResponse = { token: 'fake-token' };

      vi.mocked(mockRepo.login).mockResolvedValue(expectedResponse);

      const result = await loginUser.login(credentials);

      expect(mockRepo.login).toHaveBeenCalledWith(credentials);
      expect(result).toEqual(expectedResponse);
    });

    it('должен выбрасывать ошибку для некорректного имени пользователя', async () => {
      const credentials: AuthCredentials = {
        username: 'short',
        password: 'ValidPass123',
      };

      await expect(loginUser.login(credentials)).rejects.toThrow(
        'Имя пользователя должно содержать минимум 8 символов',
      );
      expect(mockRepo.login).not.toHaveBeenCalled();
    });

    it('должен выбрасывать ошибку для некорректного пароля', async () => {
      const credentials: AuthCredentials = {
        username: 'validuser',
        password: 'short',
      };

      await expect(loginUser.login(credentials)).rejects.toThrow(
        'Пароль должен содержать минимум 8 символов',
      );
      expect(mockRepo.login).not.toHaveBeenCalled();
    });

    it('должен передавать ошибку от repo.login', async () => {
      const credentials: AuthCredentials = {
        username: 'validuser',
        password: 'ValidPass123',
      };
      const error = new Error('Login failed');

      vi.mocked(mockRepo.login).mockRejectedValue(error);

      await expect(loginUser.login(credentials)).rejects.toThrow(
        'Login failed',
      );
    });
  });
});

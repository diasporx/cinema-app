import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegisterUser } from '../../core/application/auth/RegisterUser';
import type { IAuthRepo } from '../../core/domain/auth/IAuthRepo';
import type {
  AuthCredentials,
  AuthResponse,
} from '../../core/domain/auth/types';

describe('RegisterUser', () => {
  let mockRepo: IAuthRepo;
  let registerUser: RegisterUser;

  beforeEach(() => {
    mockRepo = {
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
    };
    registerUser = new RegisterUser(mockRepo);
  });

  describe('register', () => {
    it('должен валидировать учетные данные и вызывать repo.register с правильными учетными данными', async () => {
      const credentials: AuthCredentials = {
        username: 'validuser',
        password: 'ValidPass123',
      };
      const expectedResponse: AuthResponse = { token: 'fake-token' };

      vi.mocked(mockRepo.register).mockResolvedValue(expectedResponse);

      const result = await registerUser.register(credentials);

      expect(mockRepo.register).toHaveBeenCalledWith(credentials);
      expect(result).toEqual(expectedResponse);
    });

    it('должен выбрасывать ошибку для некорректного имени пользователя', async () => {
      const credentials: AuthCredentials = {
        username: 'short',
        password: 'ValidPass123',
      };

      await expect(registerUser.register(credentials)).rejects.toThrow(
        'Имя пользователя должно содержать минимум 8 символов',
      );
      expect(mockRepo.register).not.toHaveBeenCalled();
    });

    it('должен выбрасывать ошибку для некорректного пароля', async () => {
      const credentials: AuthCredentials = {
        username: 'validuser',
        password: 'short',
      };

      await expect(registerUser.register(credentials)).rejects.toThrow(
        'Пароль должен содержать минимум 8 символов',
      );
      expect(mockRepo.register).not.toHaveBeenCalled();
    });

    it('должен передавать ошибку от repo.register', async () => {
      const credentials: AuthCredentials = {
        username: 'validuser',
        password: 'ValidPass123',
      };
      const error = new Error('Registration failed');

      vi.mocked(mockRepo.register).mockRejectedValue(error);

      await expect(registerUser.register(credentials)).rejects.toThrow(
        'Registration failed',
      );
    });
  });
});

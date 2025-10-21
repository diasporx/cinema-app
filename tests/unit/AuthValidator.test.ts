import { describe, it, expect } from 'vitest'
import { AuthValidator } from '../../core/domain/auth/AuthValidator'

describe('AuthValidator', () => {
  describe('validateUsername', () => {
    it('не должен выбрасывать ошибку для корректного имени пользователя', () => {
      expect(() => AuthValidator.validateUsername('validuser')).not.toThrow()
    })

    it('должен выбрасывать ошибку для имени пользователя короче 8 символов', () => {
      expect(() => AuthValidator.validateUsername('short')).toThrow('Имя пользователя должно содержать минимум 8 символов')
    })
  })

  describe('validatePassword', () => {
    it('не должен выбрасывать ошибку для корректного пароля', () => {
      expect(() => AuthValidator.validatePassword('ValidPass123')).not.toThrow()
    })

    it('должен выбрасывать ошибку для пароля короче 8 символов', () => {
      expect(() => AuthValidator.validatePassword('short')).toThrow('Пароль должен содержать минимум 8 символов')
    })

    it('должен выбрасывать ошибку для пароля без заглавной буквы', () => {
      expect(() => AuthValidator.validatePassword('validpass123')).toThrow('Пароль должен содержать хотя бы одну заглавную букву')
    })

    it('должен выбрасывать ошибку для пароля без цифры', () => {
      expect(() => AuthValidator.validatePassword('ValidPass')).toThrow('Пароль должен содержать хотя бы одну цифру')
    })
  })

  describe('validateLoginCredentials', () => {
    it('не должен выбрасывать ошибку для корректных учетных данных', () => {
      expect(() => AuthValidator.validateLoginCredentials('validuser', 'ValidPass123')).not.toThrow()
    })

    it('должен выбрасывать ошибку для некорректного имени пользователя', () => {
      expect(() => AuthValidator.validateLoginCredentials('short', 'ValidPass123')).toThrow('Имя пользователя должно содержать минимум 8 символов')
    })

    it('должен выбрасывать ошибку для некорректного пароля', () => {
      expect(() => AuthValidator.validateLoginCredentials('validuser', 'short')).toThrow('Пароль должен содержать минимум 8 символов')
    })
  })

  describe('validateRegisterCredentials', () => {
    it('не должен выбрасывать ошибку для корректных учетных данных', () => {
      expect(() => AuthValidator.validateRegisterCredentials('validuser', 'ValidPass123')).not.toThrow()
    })

    it('должен выбрасывать ошибку для некорректного имени пользователя', () => {
      expect(() => AuthValidator.validateRegisterCredentials('short', 'ValidPass123')).toThrow('Имя пользователя должно содержать минимум 8 символов')
    })

    it('должен выбрасывать ошибку для некорректного пароля', () => {
      expect(() => AuthValidator.validateRegisterCredentials('validuser', 'short')).toThrow('Пароль должен содержать минимум 8 символов')
    })
  })
})

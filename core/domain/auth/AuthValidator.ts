import type { ErrorsMessages } from '@core/domain/auth/types';
import { ERRORS_MESSAGES } from '@core/domain/auth/ErrorMessages';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthValidator {
  static validateUsername(username: string): void {
    if (username.length < 8) {
      throw new Error(ERRORS_MESSAGES.USERNAME_TOO_SHORT);
    }
  }

  static validateUsernameReturn(username: string): string | null {
    if (username.length < 8) {
      return ERRORS_MESSAGES.USERNAME_TOO_SHORT!;
    }
    return null;
  }

  static validatePassword(password: string): void {
    if (password.length < 8) {
      throw new Error(ERRORS_MESSAGES.PASSWORD_TOO_SHORT);
    }
    if (!/[A-Z]/.test(password)) {
      throw new Error(ERRORS_MESSAGES.PASSWORD_NO_UPPERCASE);
    }
    if (!/\d/.test(password)) {
      throw new Error(ERRORS_MESSAGES.PASSWORD_NO_DIGIT);
    }
  }

  static validatePasswordReturn(password: string): string | null {
    if (password.length < 8) {
      return ERRORS_MESSAGES.PASSWORD_TOO_SHORT!;
    }
    if (!/[A-Z]/.test(password)) {
      return ERRORS_MESSAGES.PASSWORD_NO_UPPERCASE!;
    }
    if (!/\d/.test(password)) {
      return ERRORS_MESSAGES.PASSWORD_NO_DIGIT!;
    }
    return null;
  }

  static validatePasswordMatch(
    password: string,
    repeatPassword: string,
  ): string | null {
    if (password !== repeatPassword) {
      return ERRORS_MESSAGES.PASSWORDS_DO_NOT_MATCH!;
    }
    return null;
  }

  static validateLoginCredentials(username: string, password: string): void {
    this.validateUsername(username);
    this.validatePassword(password);
  }

  static validateRegisterCredentials(username: string, password: string): void {
    this.validateUsername(username);
    this.validatePassword(password);
  }
}

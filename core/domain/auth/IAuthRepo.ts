import type { AuthResponse, AuthCredentials } from './types';

export interface IAuthRepo {
  login(credentials: AuthCredentials): Promise<AuthResponse>;
  register(credentials: AuthCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
}

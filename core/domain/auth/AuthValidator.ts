export class AuthValidator {
    static validateUsername(username: string): void {
        if (username.length < 8) {
            throw new Error('Имя пользователя должно содержать минимум 8 символов')
        }
    }

    static validatePassword(password: string): void {
        if (password.length < 8) {
            throw new Error('Пароль должен содержать минимум 8 символов')
        }
        if (!/[A-Z]/.test(password)) {
            throw new Error('Пароль должен содержать хотя бы одну заглавную букву')
        }
        if (!/\d/.test(password)) {
            throw new Error('Пароль должен содержать хотя бы одну цифру')
        }
    }

    static validateLoginCredentials(username: string, password: string): void {
        this.validateUsername(username)
        this.validatePassword(password)
    }

    static validateRegisterCredentials(username: string, password: string): void {
        this.validateUsername(username)
        this.validatePassword(password)
    }
}

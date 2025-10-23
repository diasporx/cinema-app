import { container } from './container'
import { AuthRepoHttp } from '@infra/http/auth/AuthRepoHttp'
import { LoginUser } from '@core/application/auth/LoginUser'
import { RegisterUser } from '@core/application/auth/RegisterUser'

container.register('authUC', (_container, apiBase) => {
    const repo = new AuthRepoHttp(apiBase)
    const loginUser = new LoginUser(repo)
    const registerUser = new RegisterUser(repo)

    return { loginUser, registerUser }
})
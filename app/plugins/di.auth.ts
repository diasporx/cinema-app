import { AuthRepoHttp } from '@infra/http/auth/AuthRepoHttp'
import { LoginUser } from '@core/application/auth/LoginUser'
import { RegisterUser } from '@core/application/auth/RegisterUser'

export default defineNuxtPlugin(() => {
    const { public: { apiBase } } = useRuntimeConfig()
    const repo = new AuthRepoHttp(apiBase)
    const loginUser = new LoginUser(repo)
    const registerUser = new RegisterUser(repo)

    return {
        provide: {
            authUC: { loginUser, registerUser },
        },
    }
})


import './di/auth'
import './di/cinema'
import './di/movie'
import { container } from './di/container'
import type { LoginUser } from '@core/application/auth/LoginUser'
import type { RegisterUser } from '@core/application/auth/RegisterUser'
import type { Movies } from '@core/application/movie/getMovies'
import type { Cinemas } from '@core/application/cinema/getCinemas'

export default defineNuxtPlugin(() => {
    const { public: { apiBase } } = useRuntimeConfig()

    return {
        provide: {
            authUC: container.resolve<{ loginUser: LoginUser; registerUser: RegisterUser }>('authUC', apiBase),
            cinemaUC: container.resolve<{ getCinemas: Cinemas }>('cinemaUC', apiBase),
            movieUC: container.resolve<{ getMovies: Movies }>('movieUC', apiBase),
        },
    }
})
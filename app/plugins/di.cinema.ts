import { CinemaRepoHttp } from "@infra/http/cinema/CinemaRepoHttp"
import { Cinemas } from "@core/application/cinema/getCinemas";

export default defineNuxtPlugin(() => {
    const { public: { apiBase } } = useRuntimeConfig()
    const repo = new CinemaRepoHttp(apiBase)
    const getCinemas = new Cinemas(repo)

    return {
        provide: {
            cinemaUC: { getCinemas },
        },
    }
})


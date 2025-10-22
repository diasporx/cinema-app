import { MovieRepoHttp } from '@infra/http/movie/MovieRepoHttp'
import { Movies } from "@core/application/movie/getMovies";

export default defineNuxtPlugin(() => {
    const { public: { apiBase } } = useRuntimeConfig()
    const repo = new MovieRepoHttp(apiBase)
    const getMovies = new Movies(repo)

    return {
        provide: {
            movieUC: { getMovies },
        },
    }
})


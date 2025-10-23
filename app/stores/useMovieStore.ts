import type { Movie, MovieSession } from "@core/domain/movie/types";
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMovieStore = defineStore('movie', () => {
    const movies = ref<Movie[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const sessions = ref<Record<number, MovieSession[]>>({})
    const sessionsLoading = ref(false)
    const sessionsError = ref<string | null>(null)

    const getMovies = computed(() => movies.value)
    const getSessions = computed(() => (movieId: number) => sessions.value[movieId] || [])

    const fetchMovies = async () => {
        if (movies.value.length > 0) return
        loading.value = true
        error.value = null
        try {
            const { $movieUC } = useNuxtApp()
            movies.value = await $movieUC.getMovies.exec()
        } catch (err: unknown) {
            console.error('Ошибка загрузки фильмов:', err)
            error.value = 'Ошибка загрузки фильмов'
        } finally {
            loading.value = false
        }
    }

    const getSessionsForMovie = async (movieId: number) => {
        if (sessions.value[movieId]) return sessions.value[movieId]
        sessionsLoading.value = true
        sessionsError.value = null
        try {
            const { $movieUC } = useNuxtApp()
            const result = await $movieUC.getMovies.getSessionsForMovie(movieId)
            sessions.value[movieId] = result
            return result
        } catch (err: unknown) {
            console.error('Ошибка загрузки сессий:', err)
            sessionsError.value = 'Ошибка загрузки сессий'
            throw err
        } finally {
            sessionsLoading.value = false
        }
    }

    const refreshMovies = async () => {
        movies.value = []
        await fetchMovies()
    }

    return {
        movies,
        loading,
        error,
        sessions,
        sessionsLoading,
        sessionsError,
        getMovies,
        getSessions,
        fetchMovies,
        getSessionsForMovie,
        refreshMovies
    }
})

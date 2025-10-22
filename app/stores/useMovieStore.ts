import type { Movie } from "@core/domain/movie/types";
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMovieStore = defineStore('movie', () => {
    const movies = ref<Movie[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const getMovies = computed(() => movies.value)

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

    const refreshMovies = async () => {
        movies.value = []
        await fetchMovies()
    }

    return {
        movies,
        loading,
        error,
        getMovies,
        fetchMovies,
        refreshMovies
    }
})

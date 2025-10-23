import { defineStore } from 'pinia'
import { computed, ref } from "vue";
import type { Cinema, CinemaSession } from "@core/domain/cinema/types";

export const useCinemasStore = defineStore('cinema', () => {
    const cinemas = ref<Cinema[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const sessions = ref<Record<number, CinemaSession[]>>({})
    const sessionsLoading = ref(false)
    const sessionsError = ref<string | null>(null)

    const getCinemas = computed(() => cinemas.value)
    const getSessions = computed(() => (cinemaId: number) => sessions.value[cinemaId] || [])

    const fetchCinemas = async () => {
        if (cinemas.value.length > 0) return
        loading.value = true
        error.value = null
        try {
            const { $cinemaUC } = useNuxtApp()
            cinemas.value = await $cinemaUC.getCinemas.exec()
        } catch (err: unknown) {
            console.error('Ошибка загрузки кинотеатров:', err)
            error.value = 'Ошибка загрузки кинотеатров'
        } finally {
            loading.value = false
        }
    }

    const getSessionsForCinema = async (cinemaId: number) => {
        if (sessions.value[cinemaId]) return sessions.value[cinemaId]
        sessionsLoading.value = true
        sessionsError.value = null
        try {
            const { $cinemaUC } = useNuxtApp()
            const result = await $cinemaUC.getCinemas.getSessionsForCinema(cinemaId)
            sessions.value[cinemaId] = result
            return result
        } catch (err: unknown) {
            console.error('Ошибка загрузки сессий:', err)
            sessionsError.value = 'Ошибка загрузки сессий'
            throw err
        } finally {
            sessionsLoading.value = false
        }
    }

    const refreshCinemas = async () => {
        cinemas.value = []
        await fetchCinemas()
    }

    return {
        cinemas,
        loading,
        error,
        sessions,
        sessionsLoading,
        sessionsError,
        getCinemas,
        getSessions,
        fetchCinemas,
        getSessionsForCinema,
        refreshCinemas
    }
})

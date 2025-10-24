<template>
  <div class="movie">
    <h1 class="text-4xl font-bold text-center">{{ movie?.title }}</h1>
    <div class="movie-header">
      <img :src="getImage(movie?.posterImage as string)" :alt="movie?.title">
      <div class="description">
        <p>
          {{ movie?.description }}
        </p>
        <ul>
          <li>Год: {{ movie?.year }}</li>
          <li>
            Продолжительность:
            {{ formatMinutesToHM(Number(movie?.lengthMinutes)) }}
          </li>
          <li>Рейтинг: {{ movie?.rating }}</li>
        </ul>
      </div>
    </div>
    <div class="movie-content">
      <div
        v-for="(cinemasForDate, date) in groupedSessions"
        :key="date"
        class="movie-session"
      >
        <h1 class="date-title text-3xl font-bold">{{ date }}</h1>
        <div
          v-for="(sessionsItems, cinemaId) in cinemasForDate"
          :key="cinemaId"
          class="cinema-block"
        >
          <h2 class="cinema-name text-2xl font-bold">
            {{ getCinemaName(cinemaId) }}
          </h2>
          <div class="times">
            <NuxtLink
              v-for="session in sessionsItems"
              :key="session.id"
              :to="`/booking/session/${session.id}`"
              class="button time"
            >
              {{ formatTime(session.startTime) }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from '@/stores/useMovieStore';
import { useCinemasStore } from '@/stores/useCinemaStore';
import { formatMinutesToHM, formatTime } from '@/composables/useUtils';
import {
  useGroupedSessions,
  useEntityName,
} from '@/composables/useSessionGrouping';

const route = useRoute();
const movieStore = useMovieStore();
const cinemaStore = useCinemasStore();
const { movies, sessions } = storeToRefs(movieStore);
const { cinemas } = storeToRefs(cinemaStore);
const movieId = Number(route.params.id);

onBeforeMount(async () => {
  if (movies.value.length === 0) {
    await movieStore.fetchMovies();
  }
  if (!(movieId in sessions.value)) {
    await movieStore.getSessionsForMovie(movieId);
  }
  if (cinemas.value.length === 0) {
    await cinemaStore.fetchCinemas();
  }
});

const getImage = computed(() => (posterImage: string) => {
  return `http://localhost:3022${posterImage}`;
});

const sessionsForMovie = computed(() => movieStore.getSessions(movieId));

const movie = computed(() => movieStore.movies.find(m => m.id === movieId));

const groupedSessions = useGroupedSessions(sessionsForMovie, 'cinemaId');
const getCinemaName = useEntityName(cinemas);
</script>

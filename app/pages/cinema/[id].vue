<template>
  <div class="cinema">
    <h1 class="text-4xl font-bold text-center">{{ cinema?.name }}</h1>
    <div class="movie-content">
      <div
        v-for="(cinemasForDate, date) in groupedSessions"
        :key="date"
        class="movie-session"
      >
        <h1 class="date-title text-3xl font-bold">{{ date }}</h1>
        <div
          v-for="(sessionsItems, cId) in cinemasForDate"
          :key="cId"
          class="cinema-block"
        >
          <h2 class="cinema-name text-2xl font-bold">
            {{ getMovieName(cId) }}
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
import { formatTime } from '@/composables/useUtils';
import {
  useGroupedSessions,
  useEntityName,
} from '@/composables/useSessionGrouping';

const route = useRoute();
const movieStore = useMovieStore();
const cinemaStore = useCinemasStore();
const { movies } = storeToRefs(movieStore);
const { cinemas, sessions } = storeToRefs(cinemaStore);
const cinemaId = Number(route.params.id);

onBeforeMount(async () => {
  if (cinemas.value.length === 0) {
    await cinemaStore.fetchCinemas();
  }
  if (!(cinemaId in sessions.value)) {
    await cinemaStore.getSessionsForCinema(cinemaId);
  }
  if (movies.value.length === 0) {
    await movieStore.fetchMovies();
  }
});

const sessionsForCinema = computed(() => cinemaStore.getSessions(cinemaId));

const cinema = computed(() => cinemaStore.cinemas.find(s => s.id === cinemaId));

const groupedSessions = useGroupedSessions(sessionsForCinema, 'movieId');
const getMovieName = useEntityName(movies);
</script>

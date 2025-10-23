<template>
  <div class="movie">
    <h1 class="text-4xl font-bold text-center">{{ movie?.title }}</h1>
    <div class="movie-header">
      <img :src="getImage(movie?.posterImage as string)" :alt="movie?.title">
      <p>
        {{ movie?.description }}
      </p>
      <p>

      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from "@/stores/useMovieStore";

const route = useRoute();
const movieStore = useMovieStore();
const { movies, sessions } = storeToRefs(movieStore)
const movieId = Number(route.params.id);

const getImage = computed(() => (posterImage: string) => {
  return `http://localhost:3022${posterImage}`
})

onBeforeMount(async () => {
  if (movies.value.length === 0) {
    await movieStore.fetchMovies();
    await movieStore.getSessionsForMovie(movieId);
  }
})

const movie = computed(() => movieStore.movies.find(m => m.id === movieId));

</script>

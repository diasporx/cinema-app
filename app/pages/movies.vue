<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from '~/stores/useMovieStore'

const movieStore = useMovieStore()

onMounted(() => {
  if (movieStore.movies.length === 0) {
    movieStore.fetchMovies()
  }
})
</script>

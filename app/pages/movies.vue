<template>
  <div class="movies relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
      <tr class="border-b dark:border-gray-700 border-gray-200">
        <th scope="col" class="px-6 py-3"></th>
        <th scope="col" class="px-6 py-3">
          Название
        </th>
        <th scope="col" class="px-6 py-3">
          Продолжительность
        </th>
        <th scope="col" class="px-6 py-3">
          Рейтинг
        </th>
        <th scope="col" class="px-6 py-3"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="movie in movies" :key="movie?.id">
        <td class="px-6 py-4">
          <img :src="getImage(movie?.posterImage)" :alt="movie?.title">
        </td>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ movie?.title }}
        </th>
        <td class="px-6 py-4">
          {{ movie?.lengthMinutes }}
        </td>
        <td class="px-6 py-4">
          {{ movie?.rating }}
        </td>
        <td class="px-6 py-4">
          <NuxtLink class="button" :to="`/movie/${movie?.id}`">Посмотреть сеансы</NuxtLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from '~/stores/useMovieStore'

const movieStore = useMovieStore()
const { movies } = storeToRefs(movieStore)
// const { $movieUC } = useNuxtApp();

onBeforeMount(async () => {
  if (movieStore.movies.length === 0) {
    await movieStore.fetchMovies()
  }
})

const getImage = computed(() => (posterImage: string) => {
  return `http://localhost:3022${posterImage}`
})

// const getSessionsForMovie = async (movieId: number) => {
//   await $movieUC.getMovies.getSessionsForMovie(movieId);
// }
</script>

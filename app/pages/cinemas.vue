<template>
  <div class="cinemas relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
      <tr class="border-b dark:border-gray-700 border-gray-200">
        <th scope="col" class="px-6 py-3">
          Кинотеатр
        </th>
        <th scope="col" class="px-6 py-3">
          Адрес
        </th>
        <th scope="col" class="px-6 py-3"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="cinema in cinemas" :key="cinema?.id">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ cinema?.name }}
        </th>
        <td class="px-6 py-4">
          {{ cinema?.address }}
        </td>
        <td class="px-6 py-4">
          <NuxtLink class="button" :to="`/cinema/${cinema?.id}`">Посмотреть сеансы</NuxtLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { useCinemasStore } from '~/stores/useCinemaStore'

const cinemasStore = useCinemasStore()
const { cinemas } = storeToRefs(cinemasStore)

onBeforeMount(async () => {
  if (cinemasStore.cinemas.length === 0) {
    await cinemasStore.fetchCinemas()
  }
})
</script>

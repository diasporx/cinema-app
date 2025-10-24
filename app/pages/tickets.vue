<template>
  <div class="tickets">
    <h1>Мои билеты</h1>
    <div v-if="bookings">
      <pre>{{ JSON.stringify(bookings, null, 2) }}</pre>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Booking } from '@core/domain/booking/types';

const { $bookingUC } = useNuxtApp();
const bookings = ref<Booking[] | null>(null);

onMounted(async () => {
  try {
    bookings.value = await $bookingUC.getBookings.getBookings();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
});
</script>

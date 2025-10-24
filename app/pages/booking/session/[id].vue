<template>
  <div class="book-session">
    <h1 class="text-4xl font-bold text-center mb-4">Выбрать места</h1>

    <ul class="mb-4">
      <li>Фильм: <b>{{ movieName }}</b></li>
      <li>Кинотеатр: <b>{{ cinemaName }}</b></li>
      <li>Время: <b>{{ formatTime(detailSession?.startTime as string) }}</b></li>
    </ul>

    <div v-if="detailSession" class="seats-wrapper mx-auto">
      <div
          class="grid gap-2"
          :style="`grid-template-columns: repeat(${cols + 1}, minmax(0, 1fr))`"
      >
        <div/>
        <template v-for="c in cols" :key="'h-' + c">
          <div class="text-center text-sm opacity-80">{{ c }}</div>
        </template>
      </div>

      <div class="mt-2 grid gap-2"
           :style="`grid-template-rows: repeat(${rows}, auto)`">
        <div v-for="r in rows" :key="'row-' + r"
             class="grid items-center gap-2"
             :style="`grid-template-columns: repeat(${cols + 1}, minmax(0, 1fr))`">
          <div class="pr-2 text-right text-sm"><span class="cinema-row">ряд {{ r }}</span></div>
          <button
              v-for="s in cols" :key="`r${r}-s${s}`"
              class="h-8 w-8 seat rounded-md border border-white/80"
              :class="[
                { 'bg-blue-500': isSeatSelected(r, s) },
                { 'bg-red-500': isSeatBooked(r, s) },
              ]"
              :disabled="isSeatBooked(r, s)"
              @click="bookSeats(r, s)"
          />
        </div>
      </div>
    </div>

    <div v-if="selectedSeats.length > 0" class="mt-6 text-center">
      <p class="mb-4">Выбранные места: {{ selectedSeats.map(s => `ряд ${s.row}, место ${s.seat}`).join(', ') }}</p>
      <button
          class="px-6 py-2 button text-white"
          @click="confirmBooking"
      >
        Забронировать
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Session, BookedSeat} from "@core/domain/booking/types";
import {formatTime} from "@/composables/useUtils";
import {useMovieStore} from "@/stores/useMovieStore";
import {useCinemasStore} from "@/stores/useCinemaStore";
import {useAlert} from "@/composables/useAlert";
import {getErrorMessage} from "@core/domain/shared/ErrorMessageHandler";

const route = useRoute();
const sessionId = Number(route.params.id);
const movieStore = useMovieStore();
const cinemaStore = useCinemasStore();
const detailSession = ref<Session | null>(null);
const selectedSeats = ref<Array<{ row: number, seat: number }>>([]);
const bookedSeats = ref<BookedSeat[]>([]);
const {addAlert} = useAlert();

const movieName = computed(() => {
  const id = detailSession.value?.movieId;
  if (id == null) return "";
  const m = movieStore.movies.find(x => x.id === id);
  return m?.title ?? "";
});

const cinemaName = computed(() => {
  const id = detailSession.value?.cinemaId;
  if (id == null) return "";
  const c = cinemaStore.cinemas.find(x => x.id === id);
  return c?.name ?? "";
});

const rows = computed<number>(() => detailSession.value?.seats?.rows ?? 0);
const cols = computed<number>(() => detailSession.value?.seats?.seatsPerRow ?? 0);

const isSeatSelected = (row: number, seat: number): boolean =>
  selectedSeats.value.some(s => s.row === row && s.seat === seat);

const isSeatBooked = (row: number, seat: number): boolean =>
  bookedSeats.value.some(b => b.rowNumber === row && b.seatNumber === seat);

onBeforeMount(async () => {
  try {
    if (movieStore.movies.length === 0) await movieStore.fetchMovies();
    if (cinemaStore.cinemas.length === 0) await cinemaStore.fetchCinemas();
    await getDetails();
  } catch (e) {
    console.error(e);
    detailSession.value = null;
  }
});

const getDetails = async () => {
  const { $bookingUC } = useNuxtApp();
  const res = await $bookingUC.getDetails.getDetails(sessionId);

  const normalized: Session | null = Array.isArray(res)
    ? res.find((s: Session) => s.id === sessionId) ?? null
    : res as Session;

  detailSession.value = normalized;
  bookedSeats.value = normalized?.bookedSeats ?? [];
};

const bookSeats = (row: number, seat: number) => {
  const seatIndex = selectedSeats.value.findIndex(s => s.row === row && s.seat === seat);
  if (seatIndex > -1) {
    selectedSeats.value.splice(seatIndex, 1);
  } else {
    selectedSeats.value.push({ row, seat });
  }
};

const confirmBooking = async () => {
  try {
    const { isAuthenticated } = useAuthToken();
    if (!isAuthenticated()) {
      await navigateTo('/auth/login');
      return;
    }

    const { $bookingUC } = useNuxtApp();
    const request = {
      seats: selectedSeats.value.map(seat => ({
        rowNumber: seat.row,
        seatNumber: seat.seat,
      })),
    };
    await $bookingUC.bookSeats.execute(sessionId, request);
    selectedSeats.value = [];
    addAlert({
      type: 'success',
      message: 'Бронирование успешно',
      duration: 3000,
    });
  } catch (error) {
    addAlert({
      type: 'error',
      message: getErrorMessage(error),
      duration: 5000,
    });
  } finally {
    await getDetails();
  }
};
</script>


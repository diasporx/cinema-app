<template>
  <aside>
    <ul>
      <li v-for="item in allItems" :key="item.route">
        <NuxtLink
            :to="item.route"
            :class="isActive(item.route) ? 'active' : ''"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { NAVIGATION_ITEMS } from '@core/domain/navigation/constants';
import { useAuthToken } from '@/composables/useAuthToken';

const { isAuthenticated } = useAuthToken();
const route = useRoute();

const authItem = computed(() => {
  const authenticated = isAuthenticated();
  return {
    label: authenticated ? 'Выход' : 'Вход',
    route: authenticated ? '/logout' : '/auth/login',
  };
});

const isActive = (itemRoute: string) => route.path === itemRoute;

const allItems = computed(() => [...NAVIGATION_ITEMS, authItem.value]);
</script>

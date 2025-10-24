<template>
  <div>
    <NuxtLayout>
      <template #titlePage>
        <div class="title-page">
          <h1 class="text-4xl font-bold">{{ currentPageTitle }}</h1>
        </div>
      </template>
      <NuxtPage />
    </NuxtLayout>
    <AlertComponent />
  </div>
</template>
<script setup lang="ts">
import { pageMeta, type PageMeta } from '@/config/pageMeta';
import '@/assets/main.css';
import '@/assets/scss/main.scss';

const route = useRoute();
const currentPageTitle = computed(() => {
  const matchedPath = route.matched[0]?.path || route.path;
  const meta: PageMeta | undefined = pageMeta[matchedPath];
  return meta?.title || '';
});
</script>

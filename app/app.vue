<template>
  <div>
    <NuxtLayout>
      <template #titlePage>
        <h1 class="text-4xl font-bold">{{ currentPageTitle }}</h1>
      </template>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { pageMeta, type PageMeta } from "@/config/pageMeta";
import "@/assets/main.css";
import "@/assets/scss/main.scss";

const route = useRoute();
const currentPageTitle = computed(() => {
  const meta: PageMeta | undefined = pageMeta[route.path];
  return meta?.title || '';
});
</script>

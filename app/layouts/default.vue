<template>
  <div class="default-layout">
    <div class="default-layout-child">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100lvh;
  &-child {
    min-width: 780px;
    min-height: 560px;
    border: 1px solid #fff;
  }
}
</style>

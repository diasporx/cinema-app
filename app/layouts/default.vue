<template>
  <div class="default-layout">
    <div class="default-layout-child">
      <slot name="titlePage"></slot>
      <div class="default-layout-child-block">
        <slot />
      </div>
    </div>
  </div>
</template>

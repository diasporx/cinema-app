<template>
  <div class="default-layout">
    <div class="default-layout-child">
      <slot name="titlePage"></slot>
      <div class="default-layout-child-block">
        <MenuComponent />
        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

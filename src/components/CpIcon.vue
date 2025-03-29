<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <svg aria-hidden="true" class="cp-icon">
    <use :href="`#icon-${name}`"color="red" />
  </svg>
</template>

<style lang="scss" scoped>
.cp-icon {
  width: 1em;
  height: 1em;
}
</style>

<template>
  <svg style="width: 30px; height: 30px">
    <use :xlink:href="'#icon-' + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: "",
  },
  name: String,
});
</script>
<style scoped></style>

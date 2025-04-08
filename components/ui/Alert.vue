<template>
  <p v-if="message" class="msg c-white">{{ message }}</p>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.msg {
  position: absolute;
  z-index: 8888;
  top: 2%;
  left: 50%;
  transform: translate(-50%, 0%);
  text-shadow: 0 2px 1px rgba(0, 0, 0);
}
</style>

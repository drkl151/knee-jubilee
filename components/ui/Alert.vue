<template>
  <p v-if="message" class="msg c-white fade-in-from-top">{{ message }}</p>
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
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0%);
  font-size: 20px;
  text-shadow: 0 2px 1px rgba(0, 0, 0);
  text-align: center;
  padding: 4px 85px;
  margin: 0;
  background: #000000;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(36, 36, 36, 0.7) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>

<template>
  <Transition name="fade"
    ><p v-if="message" class="msg c-white">{{ message }}</p>
  </Transition>
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
  font-size: 20px;
  text-shadow: 0 2px 1px rgba(0, 0, 0);
  padding: 3px 80px;
  background: #000000;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(36, 36, 36, 0.7) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>

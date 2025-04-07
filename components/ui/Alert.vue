<template>
  <p class="msg c-white" v-if="message">{{ message }}</p>
</template>

<script setup>
const props = defineProps({
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

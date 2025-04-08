<template>
  <button :class="['main-button', 'style-bordeaux', buttonSizeClass]" @click="handleClick">
    {{ buttonText }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'small',
    validator: (value) => ['small', 'large'].includes(value),
  },
});

const emit = defineEmits(['clicked']);

const buttonSizeClass = computed(() => {
  return props.size === 'large' ? 'large-button' : 'small-button';
});

function handleClick() {
  emit('clicked');
}
</script>

<style scoped>
.main-button {
  display: inline-block;
  margin: 0 auto;
  padding: 12px 24px;
  font-size: 28px;
  font-weight: bold;
  font-family: 'Trajan Pro', serif;
  color: var(--main-accent-color);
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: center;
  user-select: none;
}

.main-button:hover {
  background: linear-gradient(180deg, #2e2e2e, #191919);
  border-color: #c93232;
  color: var(--main-accent-light);
  text-shadow: 0 0 10px rgba(255, 180, 71, 0.8);
  transform: translateY(-2px);
}

.main-button:active {
  background: linear-gradient(180deg, #191919, #0f0f0f);
  box-shadow:
    0 2px 0 #5a1111,
    0 2px 6px rgba(0, 0, 0, 0.8);
  transform: translateY(2px);
}

.custom-button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.large-button {
  width: 30%;
  font-size: 20px;
  padding: 20px 30px;
}

.small-button {
  width: 10%;
  font-size: 14px;
  padding: 8px 16px;
}
</style>

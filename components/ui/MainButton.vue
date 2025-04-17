<template>
  <button
    :class="['main-button style-bordeaux', { disabled: disabled }]"
    :style="buttonStyle"
    @click="handleClick"
  >
    <slot>{{ buttonText }}</slot>
  </button>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  buttonText: {
    type: String,
    default: '',
  },
  font: {
    type: Number,
    default: 20,
  },
  padding: {
    type: String,
    default: '12px 24px',
  },
  width: {
    type: String,
    default: 'fit-content',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['clicked']);

const buttonStyle = computed(() => ({
  fontSize: `${props.font}px`,
  padding: props.padding,
  width: props.width,
}));

function handleClick() {
  emit('clicked');
}
</script>

<style scoped>
.main-button {
  display: inline-block;
  margin: 0 auto;
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
}

.main-button:active {
  background: linear-gradient(180deg, #191919, #0f0f0f);
  box-shadow:
    0 2px 0 #5a1111,
    0 2px 6px rgba(0, 0, 0, 0.8);
  transform: translateY(2px);
}

.disabled {
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
}

.main-button.no-border-shadow {
  background: none !important;
  border: none !important;
  box-shadow: none !important;
}

.main-button.no-border-shadow:active {
  box-shadow: none !important;
}
</style>

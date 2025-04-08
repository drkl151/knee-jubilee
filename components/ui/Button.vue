<template>
  <button
    :class="['main-button', buttonSizeClass, { 'disabled': disabled }]"
    @click="handleClick"
    :disabled="disabled"
  >
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
    disabled: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: 'small',
        validator: value => ['small', 'large'].includes(value),
    }
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
    background: none;
    border: none;
    padding: 12px 24px;
    font-size: 28px;
    font-weight: bold;
    font-family: "Trajan Pro", serif;
    color: var(--main-accent-color);
    text-transform: uppercase;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-align: center;
    user-select: none;
}

.main-button:hover {
    color: var(--main-accent-light);
    text-shadow: 0 0 10px rgba(255, 180, 71, 0.8);
    transform: translateY(-2px);
}

.main-button:active {
    transform: translateY(2px);
}

.large-button {
    font-size: 20px;
    padding: 15px 30px;
}

.small-button {
    font-size: 14px;
    padding: 8px 16px;
}

.disabled {
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
}
</style>

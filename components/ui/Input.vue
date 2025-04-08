<template>
  <div class="text-input">
    <label v-if="label">{{ label }}</label>
    <input
      v-model="modelValueInternal"
      class="input"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :spellcheck="spellcheck"
      @keyup.enter="$emit('enter')"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  spellcheck: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:modelValue', 'enter']);

const modelValueInternal = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val),
});
</script>

<style scoped>
.input {
  background: none;
  border: 2px solid var(--main-accent-color);
  padding: 12px 24px;
  margin-top: 20px;
  font-size: 24px;
  font-family: 'Trajan Pro', serif;
  color: var(--main-accent-color);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  text-align: center;
  outline: none;
  transition: all 0.2s ease-in-out;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  user-select: none;
}

.input::placeholder {
  color: rgba(214, 140, 56, 0.6);
  text-shadow: none;
  font-style: italic;
}

.input:hover,
.input:focus {
  border-color: var(--main-accent-light);
  color: var(--main-accent-light);
  text-shadow: 0 0 6px rgba(255, 180, 71, 0.8);
  box-shadow: 0 0 10px rgba(255, 180, 71, 0.3);
}
</style>

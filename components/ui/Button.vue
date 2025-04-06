<template>
    <button :class="['main-button', buttonSizeClass]" @click="handleClick">
        {{ buttonText }}
    </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Пропсы компонента
const props = defineProps({
    buttonText: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        default: 'small',  // Размер кнопки по умолчанию
        validator: value => ['small', 'large'].includes(value),  // Валидатор для размера
    }
});

// Эмиттер для клика на кнопку
const emit = defineEmits(['clicked']);

// Определение класса для кнопки в зависимости от размера
const buttonSizeClass = computed(() => {
    return props.size === 'large' ? 'large-button' : 'small-button';
});

// Обработчик клика
function handleClick() {
    emit('clicked');  // Эмитим событие 'clicked' при клике
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
    color: #d68c38;
    text-transform: uppercase;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-align: center;
    user-select: none;
}

.main-button:hover {
    color: #ffb347;
    text-shadow: 0 0 10px rgba(255, 180, 71, 0.8);
    transform: translateY(-2px);
}

.main-button:active {
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
    font-size: 20px;
    padding: 15px 30px;
}

.small-button {
    font-size: 14px;
    padding: 8px 16px;
}
</style>
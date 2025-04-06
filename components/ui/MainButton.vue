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
    display: inline-block;
    margin: 0 auto;
    padding: 12px 24px;
    font-size: 28px;
    font-weight: bold;
    font-family: "Trajan Pro", serif;
    color: #d68c38;
    text-transform: uppercase;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    background: linear-gradient(180deg, #252525, #111);
    border: 3px solid #a02c2c;
    border-radius: 5px;
    box-shadow: 0 4px 0 #7b1919, 0 4px 10px rgba(0, 0, 0, 0.6);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-align: center;
    user-select: none;
}

.main-button:hover {
    background: linear-gradient(180deg, #2e2e2e, #191919);
    border-color: #c93232;
    color: #ffb347;
    text-shadow: 0 0 10px rgba(255, 180, 71, 0.8);
    transform: translateY(-2px);
}

.main-button:active {
    background: linear-gradient(180deg, #191919, #0f0f0f);
    box-shadow: 0 2px 0 #5a1111, 0 2px 6px rgba(0, 0, 0, 0.8);
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
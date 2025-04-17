<template>
  <div v-if="visible" class="modal-overlay fade-in">
    <div class="modal-content scale-up style-bordeaux c-white">
      <h2 class="modal-title">{{ title }}</h2>
      <div v-if="coins !== 0">
        <img src="/img/icons/coins.png" alt="Coins" class="coin-image" />
        <p class="modal-coins">{{ coins }} coins!</p>
      </div>

      <MainButton
        button-text="Continue"
        size="large"
        class="continue-button"
        @clicked="onClicked"
      />
    </div>
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue';
import MainButton from '@/components/ui/MainButton.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
  coins: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: 'You received',
  },
  onClicked: {
    type: Function,
    default: () => {},
  },
});

const coinsSound = new Audio('/audio/coins.wav');
const wrongSound = new Audio('/audio/wrong.mp3');

onMounted(() => {
  if (props.visible) {
    if (props.coins !== 0) {
      coinsSound.play();
    } else {
      wrongSound.play();
    }
  }
});

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      if (props.coins !== 0) {
        coinsSound.play();
      } else {
        wrongSound.play();
      }
    }
  }
);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
}

.modal-content {
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.coin-image {
  width: 120px;
  margin: 20px 0 30px;
}

.modal-title {
  font-size: 24px;
  margin: 0;
}

.modal-coins {
  font-size: 32px;
  font-weight: bold;
  color: #f39c12;
  margin: 0;
}

.continue-button {
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease;
}

.continue-button:hover {
  background-color: #1e874b;
}
</style>

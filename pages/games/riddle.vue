<template>
  <div class="riddle-container">
    <Alert v-if="showAlert" :message="alertMessage" />

    <VideoPlayer
      :poster="posterSrc"
      :video-src="videoSrc"
      :loop="isIdle"
      :show-skip="showSkip"
      :can-play="!gameCompleted"
      @started="onVideoStarted"
      @ended="onVideoEnded"
      @skip="nextVideo"
    />

    <transition name="fade-input">
      <div v-if="showInput" class="inputContainer style-bordeaux c-white">
        <Input v-model="userAnswer" label="Enter the correct answer:" @enter="checkAnswer" />
        <MainButton
          :disabled="isAnswerDisabled"
          class="no-border-shadow"
          button-text="Answer"
          size="large"
          @clicked="checkAnswer"
        />
      </div>
    </transition>

    <CoinsModal
      title="You have guessed the riddle"
      :visible="showCoinsModal"
      :coins="coinsEarned"
      :on-clicked="returnToMap"
    />
  </div>
</template>

<script setup>
// -------- Imports --------
import { ref, computed, onMounted } from 'vue';
import { useAlert } from '@/composables/useAlert';

import VideoPlayer from '@/components/VideoPlayer.vue';
import CoinsModal from '@/components/CoinsModal.vue';

import Input from '@/components/ui/Input.vue';
import MainButton from '@/components/ui/MainButton.vue';
import Alert from '@/components/ui/Alert.vue';

// -------- Router & alert composable --------
const { returnToMap } = useGlobalUtils();
const { showAlert, alertMessage, triggerAlert, hideAlert } = useAlert();

// -------- Video sources --------
const videos = {
  start: '/games/riddle/video/wk_start.mp4',
  idle: '/games/riddle/video/wk_idle.mp4',
  correct: '/games/riddle/video/wk_right.mp4',
  wrong: '/games/riddle/video/wk_wrong.mp4',
};
const posterSrc = '/games/riddle/wk_start.png';

// -------- Reactive state --------
const videoSrc = ref(videos.start);
const showSkip = ref(false);
const showInput = ref(false);
const showCoinsModal = ref(false);
const userAnswer = ref('');
const isCorrect = ref(false);
const coinsEarned = ref(0);
const coinStore = useCoinStore();

// -------- Computed --------
const isIdle = computed(() => videoSrc.value === videos.idle);
const isAnswerDisabled = computed(() => videoSrc.value === videos.wrong);
const gameCompleted = computed(() => localStorage.getItem('wk_riddle_completed') === 'true');

// -------- Lifecycle Hooks --------
onMounted(() => {
  if (gameCompleted.value) {
    showCoinsModal.value = true;
    triggerAlert('You have already completed this riddle');
  } else {
    triggerAlert('Press anywhere to continue');
  }
});

// -------- Video event handlers --------
function onVideoStarted() {
  hideAlert();
  showSkip.value = true;
}

function nextVideo() {
  triggerAlert(
    'Цей секретний артефакт був подарований тобі, характер він інтимний мав, його назва: ???'
  );

  videoSrc.value = videos.idle;
  showSkip.value = false;
  showInput.value = true;
}

function onVideoEnded() {
  if (videoSrc.value === videos.start) {
    nextVideo();
  } else if (videoSrc.value === videos.idle) {
    showInput.value = true;
  } else if (videoSrc.value === videos.wrong) {
    videoSrc.value = videos.idle;
  } else if (videoSrc.value === videos.correct) {
    localStorage.setItem('wk_riddle_completed', 'true');
    showCoinsModal.value = true;
    coinsEarned.value = 10;
    coinStore.addCoins(coinsEarned.value);
  }
}

// -------- Answer checker --------
function checkAnswer() {
  const correctAnswers = ['трусіки', 'трусики', 'труси', 'трусы', 'underpants'];
  isCorrect.value = correctAnswers.includes(userAnswer.value.trim().toLowerCase());

  videoSrc.value = isCorrect.value ? videos.correct : videos.wrong;
  showSkip.value = false;

  if (isCorrect.value) {
    hideAlert();
    showInput.value = false;
  }
}
</script>

<style scoped>
.riddle-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.skipButton {
  bottom: 20px;
  right: 20px;
  position: absolute;
  z-index: 10;
}

.inputContainer {
  position: absolute;
  right: 15%;
  top: 15%;
  z-index: 10;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 35%;
}

/* Transition for input block */
.fade-input-enter-active,
.fade-input-leave-active {
  transition: all 0.5s ease;
}

.fade-input-enter-from,
.fade-input-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-input-enter-to,
.fade-input-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

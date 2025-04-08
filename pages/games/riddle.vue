<template>
  <div class="riddle-container">
    <Alert v-if="showAlert" :message="alertMessage" />

    <VideoPlayer
      :poster="posterSrc"
      :videoSrc="videoSrc"
      :loop="isIdle"
      :showSkip="showSkip"
      :muted="!videoStarted"
      @started="onVideoStarted"
      @ended="onVideoEnded"
      @skip="nextVideo"
    />

    <transition name="fade-input">
      <div v-if="showInput" class="inputContainer style-bordeaux c-white">
        <Input
          v-model="userAnswer"
          label="Enter the correct answer:"
          @enter="checkAnswer"
        />
        <Button
          :disabled="isAnswerDisabled"
          buttonText="Answer"
          size="large"
          @clicked="checkAnswer"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
// -------- Imports --------
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAlert } from '@/composables/useAlert'

import VideoPlayer from '@/components/VideoPlayer.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import Alert from '@/components/ui/Alert.vue'

// -------- Router & alert composable --------
const router = useRouter()
const { showAlert, alertMessage, triggerAlert, hideAlert } = useAlert()

// -------- Video sources --------
const videos = {
  start: '/games/riddle/video/test.mp4',
  idle: '/games/riddle/video/wk_idle.mp4',
  correct: '/games/riddle/video/wk_right.mp4',
  wrong: '/games/riddle/video/wk_wrong.mp4',
}
const posterSrc = '/games/riddle/wk_start.png'

// -------- Reactive state --------
const videoSrc = ref(videos.start)
const videoStarted = ref(false)
const showSkip = ref(false)
const showInput = ref(false)
const userAnswer = ref('')
const isCorrect = ref(false)

// -------- Computed --------
const isIdle = computed(() => videoSrc.value === videos.idle)
const isAnswerDisabled = computed(() => videoSrc.value === videos.wrong)

onMounted(() => {
  if (localStorage.getItem('wk_riddle_completed') === 'true') {
    router.push('/')
  }
  triggerAlert('Press anywhere to continue')
})

// -------- Video event handlers --------
function onVideoStarted() {
  hideAlert()
  videoStarted.value = true
  showSkip.value = true
}

function onVideoEnded() {
  if (videoSrc.value === videos.start) {
    nextVideo()
  } else if (videoSrc.value === videos.idle) {
    showInput.value = true
  } else if (videoSrc.value === videos.wrong) {
    videoSrc.value = videos.idle
  }
}

function nextVideo() {
  videoSrc.value = videos.idle
  showSkip.value = false
  showInput.value = true
}

// -------- Answer checker --------
function checkAnswer() {
  const correctAnswers = ['трусіки', 'трусики', 'труси', 'трусы', 'underpants']
  isCorrect.value = correctAnswers.includes(userAnswer.value.trim().toLowerCase())

  videoSrc.value = isCorrect.value ? videos.correct : videos.wrong
  showSkip.value = false

  if (isCorrect.value) {
    localStorage.setItem('wk_riddle_completed', 'true')

    let coins = parseInt(localStorage.getItem('player_coins')) || 0
    localStorage.setItem('player_coins', coins + 10)

    showInput.value = false
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

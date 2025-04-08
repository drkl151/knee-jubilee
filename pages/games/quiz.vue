<template>
  <div class="fullscreen flex">
    <Alert v-if="showAlert" :message="alertMessage" />

    <VideoPlayer
      :poster="posterSrc"
      :video-src="videoSrc"
      :loop="isIdle"
      :show-skip="showSkip"
      :muted="!videoStarted"
      @started="onVideoStarted"
      @ended="onVideoEnd"
      @skip="nextVideo"
    />

    <div v-if="showQuiz" class="quiz-container">
      <h2>{{ currentQuestion.question }}</h2>
      <div>
        <button
          v-for="(answer, index) in currentQuestion.answers"
          :key="index"
          class="answer-btn"
          :class="getAnswerClass(index)"
          :disabled="buttonsDisabled"
          @click="handleAnswer(index)"
        >
          <div v-if="answer.image">
            <img :src="answer.image" :alt="answer.text" />
            <p>{{ answer.text }}</p>
          </div>
          <div v-else>
            <p>{{ answer }}</p>
          </div>
        </button>
      </div>

      <p v-if="feedbackVisible" class="feedback">{{ feedbackMessage }}</p>

      <button
        v-if="feedbackVisible"
        class="next-btn"
        @click="isLastQuestion ? finishQuiz : nextQuestion"
      >
        {{ isLastQuestion ? 'Завершити' : 'Далі' }}
      </button>
    </div>
  </div>
</template>

<script setup>
// -------- Imports --------
import { ref, computed, onMounted } from 'vue';
import { useAlert } from '@/composables/useAlert';
import questionsFromQuiz from '~/assets/data/questionsFromQuiz.json';
import VideoPlayer from '@/components/VideoPlayer.vue';
import Alert from '@/components/ui/Alert.vue';

// -------- Alert system --------
const { showAlert, alertMessage, triggerAlert, hideAlert } = useAlert();

// -------- Video setup --------
const videoSrc = ref('/games/quiz/video/ww_start.mp4');
const posterSrc = '/games/quiz/ww_start.png';
const showQuiz = ref(false);
const videoStarted = ref(false);
const showSkip = ref(false);

const videos = {
  start: '/games/quiz/video/ww_start.mp4',
  idle: '/games/quiz/video/ww_idle.mp4',
  good: '/games/quiz/video/ww_good.mp4',
  normal: '/games/quiz/video/ww_normal.mp4',
  bad: '/games/quiz/video/ww_bad.mp4',
};

// -------- Quiz state --------
const currentIndex = ref(0);
const selectedAnswer = ref(null);
const buttonsDisabled = ref(false);
const feedbackMessage = ref('');
const feedbackVisible = ref(false);
const score = ref(0);

// -------- Computed --------
const isIdle = computed(() => videoSrc.value === videos.idle);
const currentQuestion = computed(() => questionsFromQuiz[currentIndex.value]);
const correctIndex = computed(() => currentQuestion.value.correct);
const isLastQuestion = computed(() => currentIndex.value === questionsFromQuiz.length - 1);

// -------- Lifecycle --------
onMounted(() => {
  triggerAlert('Press anywhere to continue');
});

// -------- Video control --------
const onVideoStarted = () => {
  hideAlert();
  showSkip.value = true;
  videoStarted.value = true;
};

const nextVideo = () => {
  if (videoSrc.value === videos.start) {
    videoSrc.value = videos.idle;
    showSkip.value = false;
    showQuiz.value = true;
  }
};

const onVideoEnd = () => {
  nextVideo();
};

const showFinalVideo = () => {
  const percent = (score.value / questionsFromQuiz.length) * 100;
  if (percent <= 33) {
    videoSrc.value = videos.bad;
  } else if (percent <= 66) {
    videoSrc.value = videos.normal;
  } else {
    videoSrc.value = videos.good;
  }
};

// -------- Quiz logic --------
const handleAnswer = (index) => {
  if (buttonsDisabled.value) return;

  selectedAnswer.value = index;
  buttonsDisabled.value = true;

  const isCorrect = index === correctIndex.value;
  if (isCorrect) {
    score.value += 1;
    feedbackMessage.value = '✅ Правильно!';
  } else {
    feedbackMessage.value = '❌ Неправильно!';
  }

  feedbackVisible.value = true;
};

const nextQuestion = () => {
  currentIndex.value += 1;
  selectedAnswer.value = null;
  buttonsDisabled.value = false;
  feedbackVisible.value = false;
};

const finishQuiz = () => {
  showQuiz.value = false;
  showFinalVideo();
};

// -------- UI helpers --------
const getAnswerClass = (index) => {
  if (selectedAnswer.value === null) return '';
  if (index === correctIndex.value) return 'correct';
  if (index === selectedAnswer.value) return 'wrong';
  return '';
};
</script>

<style scoped>
.answer-btn.correct {
  border: 3px solid #4caf50;
}

.answer-btn.wrong {
  border: 3px solid #f44336;
}

.answer-btn:disabled {
  opacity: 0.7;
}

.feedback {
  margin-top: 10px;
  font-weight: bold;
  font-size: 18px;
}

.quiz-container {
  position: absolute;
  right: 21%;
  top: 17%;
}

.answer-btn {
  margin: 10px;
  padding: 10px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: center;
}

.next-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.next-btn:hover {
  background-color: #115293;
}
</style>

<template>
  <div class="fullscreen flex">
    <Alert v-if="showAlert" :message="alertMessage" />

    <video
      ref="videoPlayer"
      :src="videoSrc"
      :poster="posterSrc"
      @ended="onVideoEnd"
      @click="startVideo"
      playsinline
    ></video>

    <MainButton
      v-if="showSkip"
      buttonText="Skip"
      size="small"
      class="skipButton"
      @clicked="nextVideo"
    />

    <div class="quiz-container" v-if="showQuiz">
      <h2>{{ currentQuestion.question }}</h2>
      <div>
        <button
          v-for="(answer, index) in currentQuestion.answers"
          :key="index"
          class="answer-btn"
          :class="getAnswerClass(index)"
          @click="handleAnswer(index)"
          :disabled="buttonsDisabled"
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

      <p class="feedback" v-if="feedbackVisible">{{ feedbackMessage }}</p>

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
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useAlert } from '@/composables/useAlert';
import questionsFromQuiz from '~/assets/data/questionsFromQuiz.json';
import Alert from '@/components/ui/Alert.vue';

const videoPlayer = ref(null);
const videoSrc = ref("/games/quiz/video/ww_start.mp4");
const posterSrc = "/games/quiz/ww_start.png";

const showQuiz = ref(false);
const videoStarted = ref(false);
const showSkip = ref(false);

const currentIndex = ref(0);
const selectedAnswer = ref(null);
const buttonsDisabled = ref(false);
const feedbackMessage = ref('');
const feedbackVisible = ref(false);
const score = ref(0);

const { showAlert, alertMessage, triggerAlert, hideAlert } = useAlert();

const soundCorrect = ref(null);
const soundWrong = ref(null);

onMounted(() => {
    triggerAlert('Press anywhere to continue');
    soundCorrect.value = new Audio("/audio/clarity_right.mp3");
    soundWrong.value = new Audio("/audio/wrong.mp3");
});

const videos = {
  start: "/games/quiz/video/ww_start.mp4",
  idle: "/games/quiz/video/ww_idle.mp4",
  good: "/games/quiz/video/ww_good.mp4",
  normal: "/games/quiz/video/ww_normal.mp4",
  bad: "/games/quiz/video/ww_bad.mp4",
};

const currentQuestion = computed(() => questionsFromQuiz[currentIndex.value]);
const correctIndex = computed(() => currentQuestion.value.correct);
const isLastQuestion = computed(() => currentIndex.value === questionsFromQuiz.length - 1);

const startVideo = () => {
  if (!videoStarted.value) {
    hideAlert();
    showSkip.value = true;
    videoStarted.value = true;
    videoPlayer.value.play().catch(() => {});
  }
};

const onVideoEnd = () => {
  if (videoSrc.value === videos.start) {
    videoSrc.value = videos.idle;
    showQuiz.value = true;
  } else if (videoSrc.value === videos.idle) {
    videoPlayer.value.currentTime = 0;
    videoPlayer.value.play();
  }
};

const handleAnswer = (index) => {
  if (buttonsDisabled.value) return;

  selectedAnswer.value = index;
  buttonsDisabled.value = true;

  const isCorrect = index === correctIndex.value;
  if (isCorrect) {
    score.value++;
    playSound(soundCorrect);
    feedbackMessage.value = "✅ Правильно!";
  } else {
    playSound(soundWrong);
    feedbackMessage.value = "❌ Неправильно!";
  }

  feedbackVisible.value = true;
};

const nextQuestion = () => {
  currentIndex.value++;
  selectedAnswer.value = null;
  buttonsDisabled.value = false;
  feedbackVisible.value = false;
};

const finishQuiz = () => {
  showQuiz.value = false;
  showFinalVideo();
};

const getAnswerClass = (index) => {
  if (selectedAnswer.value === null) return '';
  if (index === correctIndex.value) return 'correct';
  if (index === selectedAnswer.value) return 'wrong';
  return '';
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

const playSound = (sound) => {
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }
};

watch(videoSrc, async () => {
  await nextTick();
  if (videoPlayer.value) {
    videoPlayer.value.load();
    videoPlayer.value.play().catch(() => {});
  }
});
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

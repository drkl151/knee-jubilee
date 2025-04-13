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

    <div v-if="showQuiz" class="quiz-container style-bordeaux c-white">
      <h2>{{ currentQuestion.question }}</h2>
      <div class="answers">
        <MainButton
          v-for="(answer, index) in currentQuestion.answers"
          :key="index"
          class="answer-btn"
          :button-text="getAnswerText(answer)"
          :class="getAnswerClass(index)"
          :disabled="buttonsDisabled"
          @click="handleAnswer(index)"
        >
          <template v-if="answer.image">
            <img :src="answer.image" :alt="getAnswerText(answer)" />
            <p>{{ getAnswerText(answer) }}</p>
          </template>
          <template v-else>
            <p>{{ getAnswerText(answer) }}</p>
          </template>
        </MainButton>
      </div>

      <div class="flex-center column">
        <p v-if="feedbackVisible" class="feedback">
          {{ feedbackMessage }}: {{ score }} of {{ questionsFromQuiz.length }}
        </p>

        <MainButton
          v-if="feedbackVisible"
          class="no-border-shadow"
          :font="20"
          :button-text="isLastQuestion ? 'Завершити' : 'Далі'"
          @click="nextStep"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAlert } from '@/composables/useAlert';
import questionsFromQuiz from '~/assets/data/questionsFromQuiz.json';
import VideoPlayer from '@/components/VideoPlayer.vue';
import Alert from '@/components/ui/Alert.vue';
import MainButton from '@/components/ui/MainButton.vue';

const { showAlert, alertMessage, triggerAlert, hideAlert } = useAlert();

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

const currentIndex = ref(0);
const selectedAnswer = ref(null);
const buttonsDisabled = ref(false);
const feedbackMessage = ref('');
const feedbackVisible = ref(false);
const score = ref(0);

const isIdle = computed(() => videoSrc.value === videos.idle);
const currentQuestion = computed(() => questionsFromQuiz[currentIndex.value]);
const correctIndex = computed(() => currentQuestion.value.correct);
const isLastQuestion = computed(() => currentIndex.value === questionsFromQuiz.length - 1);

const correctSound = new Audio('/audio/clarity_right.mp3');
const wrongSound = new Audio('/audio/wrong.mp3');

onMounted(() => {
  triggerAlert('Press anywhere to continue');
  questionsFromQuiz.forEach((q) => {
    q.answers = q.answers.map((ans) => (typeof ans === 'string' ? { text: ans } : ans));
  });
});

const onVideoStarted = () => {
  hideAlert();
  showSkip.value = true;
  videoStarted.value = true;
};

const nextVideo = () => {
  if (videoSrc.value === videos.start) {
    triggerAlert('Answer all the quiz questions');

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

const getAnswerText = (answer) => {
  return typeof answer === 'string' ? answer : answer.text;
};

const handleAnswer = (index) => {
  if (buttonsDisabled.value) return;
  selectedAnswer.value = index;
  buttonsDisabled.value = true;
  const isCorrect = index === correctIndex.value;

  if (isCorrect) {
    score.value += 1;
    feedbackMessage.value = '✅ Correct!';
    correctSound.currentTime = 0;
    correctSound.play();
  } else {
    score.value = Math.max(0, score.value - 1);
    feedbackMessage.value = '❌ Wrong!';
    wrongSound.currentTime = 0;
    wrongSound.play();
  }

  feedbackVisible.value = true;
};

const nextQuestion = () => {
  currentIndex.value += 1;
  selectedAnswer.value = null;
  buttonsDisabled.value = false;
  feedbackVisible.value = false;
};

const nextStep = () => {
  if (isLastQuestion.value) {
    showQuiz.value = false;
    showFinalVideo();
  } else {
    nextQuestion();
  }
};

const getAnswerClass = (index) => {
  if (selectedAnswer.value === null) return '';
  if (index === correctIndex.value) return 'correct';
  if (index === selectedAnswer.value) return 'wrong';
  return '';
};
</script>

<style scoped>
.quiz-container {
  min-height: 550px;
  min-width: 700px;
  max-width: 850px;
  position: absolute;
  z-index: 7777;
  right: 15%;
  top: 20%;
  padding: 60px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.quiz-container h2 {
  margin: 0 0 15px 0;
}
.quiz-container p {
  margin: 0;
}

.answers {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.answer-btn {
  box-shadow:
    0 4px 0 #0000007d,
    0 4px 10px rgba(0, 0, 0, 0.6);
}
.answer-btn.correct {
  border: 3px solid #4caf50;
  box-shadow:
    0 4px 0 #3e8341,
    0 4px 10px rgba(0, 0, 0, 0.6);
  opacity: 1 !important;
}

.answer-btn.wrong {
  border: 3px solid #ff1100;
  box-shadow:
    0 4px 0 #a93434,
    0 4px 10px rgba(0, 0, 0, 0.6);
}

.answer-btn:disabled {
  opacity: 0.7;
}

.feedback {
  margin-top: 10px;
  font-weight: bold;
  font-size: 18px;
}
</style>

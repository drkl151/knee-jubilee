<template>
  <div class="wrapper">
    <Alert v-if="showAlert" :message="alertMessage" />

    <VideoPlayer
      :poster="posterSrc"
      :video-src="videoSrc"
      :loop="isIdle"
      :show-skip="showSkip"
      @started="onVideoStarted"
      @ended="onVideoEnd"
      @skip="nextVideo"
    />

    <div class="cards-block style-bordeaux">
      <ul class="cards">
        <li
          v-for="(card, index) in shuffledCards"
          :key="index"
          class="card"
          :class="{ flip: card.flipped, shake: card.shake }"
          @click="flipCard(card, index)"
        >
          <div class="view front-view">
            <img src="/games/memory/img/icon.webp" alt="icon" />
          </div>
          <div class="view back-view">
            <img :src="`/games/memory/img/${card.image}`" alt="card-img" />
          </div>
        </li>
      </ul>

      <div class="details style-bordeaux c-white">
        <p class="time">
          Time:
          <span
            ><b>{{ timeLeft }}</b
            >s</span
          >
        </p>
        <p class="flips">
          Flips:
          <span
            ><b>{{ flips }}</b></span
          >
        </p>
        <Button button-text="Refresh" size="large" @clicked="shuffleCards" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import VideoPlayer from '@/components/VideoPlayer.vue';
import Alert from '@/components/ui/Alert.vue';
import Button from '@/components/ui/Button.vue';

// -------- State Management --------
const showAlert = ref(false);
const alertMessage = ref('');
const timeLeft = ref(20);
const flips = ref(0);
const matchedPairs = ref(0);
const isPlaying = ref(false);
const disableDeck = ref(false);
const videoStarted = ref(false);
const cardOne = ref(null);
const cardTwo = ref(null);

const cardImages = ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp'];
const shuffledCards = reactive([]);

// -------- Video Handling --------
const videoSrc = ref('/games/memory/video/wr_start.mp4');
const posterSrc = '/games/memory/wr_start.png';
const showSkip = ref(false);

const videos = {
  start: '/games/memory/video/wr_start.mp4',
  idle: '/games/memory/video/wr_idle.mp4',
};

const isIdle = computed(() => videoSrc.value === videos.idle);

const onVideoStarted = () => {
  showAlert.value = false;
  showSkip.value = true;
  videoStarted.value = true;
};

const nextVideo = () => {
  if (videoSrc.value === videos.start) {
    videoSrc.value = videos.idle;
    showSkip.value = false;
    showAlert.value = true;
    alertMessage.value = 'Find matching pairs from memories in 20 seconds!';
  }
};

const onVideoEnd = () => {
  nextVideo();
};

// -------- Game Logic --------
const createShuffledCards = () => {
  const cards = [...cardImages, ...cardImages];
  cards.sort(() => Math.random() - 0.5);
  return cards.map((image) => ({
    image,
    flipped: false,
    shake: false,
  }));
};

const shuffleCards = () => {
  timeLeft.value = 20;
  flips.value = 0;
  matchedPairs.value = 0;
  isPlaying.value = false;
  disableDeck.value = false;
  cardOne.value = null;
  cardTwo.value = null;
  shuffledCards.splice(0, shuffledCards.length, ...createShuffledCards());
};

const startTimer = () => {
  const timer = setInterval(() => {
    if (timeLeft.value <= 0) {
      clearInterval(timer);
    } else {
      timeLeft.value -= 1;
    }
  }, 1000);
};

const resetCards = () => {
  cardOne.value = null;
  cardTwo.value = null;
  disableDeck.value = false;
};

const checkMatch = () => {
  const first = shuffledCards[cardOne.value.index];
  const second = shuffledCards[cardTwo.value.index];

  if (first.image === second.image) {
    matchedPairs.value += 1;
    if (matchedPairs.value === cardImages.length) {
      clearInterval(timer);
    }
    resetCards();
  } else {
    first.shake = true;
    second.shake = true;
    setTimeout(() => {
      first.shake = false;
      second.shake = false;
      first.flipped = false;
      second.flipped = false;
      resetCards();
    }, 1000);
  }
};

const flipCard = (card, index) => {
  if (!isPlaying.value) {
    isPlaying.value = true;
    startTimer();
  }

  if (disableDeck.value || card.flipped || timeLeft.value <= 0) return;

  flips.value += 1;
  const selectedCard = shuffledCards[index];
  selectedCard.flipped = true;

  if (!cardOne.value) {
    cardOne.value = { ...card, index };
  } else {
    cardTwo.value = { ...card, index };
    disableDeck.value = true;
    checkMatch();
  }
};

// -------- Lifecycle Hooks --------
onMounted(() => {
  shuffleCards();
  showAlert.value = true;
  alertMessage.value = 'Press anywhere to continue';
});

// -------- Watchers --------
watch(timeLeft, (newTime) => {
  if (newTime <= 0 && isPlaying.value) {
    console.log('time is over');
  }
});
</script>

<style scoped>
p {
  font-size: 20px;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #6563ff;
}

::selection {
  color: #fff;
  background: #6563ff;
}

.cards,
.card,
.view,
.details,
p {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cards-block {
  height: 550px;
  width: 700px;
  position: absolute;
  z-index: 7777;
  left: 10%;
  top: 20%;
  padding: 30px;
}

.cards {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
  margin-top: 0;
  margin-bottom: 50px;
}

.cards .card {
  cursor: pointer;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
  height: calc(100% / 4 - 10px);
  width: calc(100% / 4 - 10px);
}

.card.shake {
  animation: shake 0.35s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-13px);
  }

  40% {
    transform: translateX(13px);
  }

  60% {
    transform: translateX(-8px);
  }

  80% {
    transform: translateX(8px);
  }
}

.cards .card .view {
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
  position: absolute;
  background: #fff;
  border-radius: 7px;
  backface-visibility: hidden;
  transition: transform 0.25s linear;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.card .front-view img {
  max-width: 70px;
}

.card .back-view {
  transform: rotateY(-180deg);
}

.card .back-view img {
  max-width: 70px;
}

.card.flip .front-view {
  transform: rotateY(180deg);
}

.card.flip .back-view {
  transform: rotateY(0);
}

.details {
  width: 100%;
  margin-top: 15px;
  padding: 0 20px;
  justify-content: space-between;
}

.details p {
  font-size: 18px;
}

.details p span {
  margin-left: 8px;
}

.details p b {
  font-weight: 500;
}

@media screen and (max-width: 800px) {
  .cards {
    height: 550px;
    width: 400px;
  }

  .card .front-view img {
    max-width: 40px;
  }

  .card .back-view img {
    max-width: 40px;
  }
}

@media screen and (max-width: 530px) {
  .cards {
    height: 450px;
    width: 300px;
  }

  .card .back-view img {
    max-width: 35px;
  }

  .details {
    margin-top: 10px;
    padding: 0 15px;
    height: calc(100% / 4 - 20px);
  }

  .details p {
    height: 15px;
    font-size: 17px;
    padding-right: 13px;
  }

  .details button {
    font-size: 13px;
    padding: 5px 10px;
    border: none;
    color: #fff;
    background: #6563ff;
  }
}
</style>

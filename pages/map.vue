<template>
  <div class="main-container">
    <audio ref="bgMusic" loop>
      <source :src="getAssetPath('audio/menu.mp3')" type="audio/mpeg" />
    </audio>

    <div id="map">
      <video ref="videoMap" :src="getPathForMapVideo('map.mp4')" loop autoplay></video>

      <NuxtLink
        to="/games/quiz"
        class="hero-mini"
        :data-video="getAssetPath('hero_mini/wyvern_mini.mp4')"
        :data-time="0"
        :data-style="'display: block;'"
        :data-shadow="'0 0 20px rgb(19, 160, 178), inset 0 0 15px rgb(24, 227, 198)'"
        :data-pos-x="61"
        :data-pos-y="23"
      >
        <video loop muted class="hero-video"></video>
      </NuxtLink>

      <NuxtLink
        to="/games/riddle"
        class="hero-mini"
        :data-video="getAssetPath('hero_mini/wk_mini.mp4')"
        :data-time="0"
        :data-style="'display: block;'"
        :data-shadow="'0 0 20px rgb(21, 145, 41), inset 0 0 15px rgb(64, 75, 73)'"
        :data-pos-x="58"
        :data-pos-y="58"
      >
        <video loop muted class="hero-video"></video>
      </NuxtLink>
      <NuxtLink
        to="/games/memory"
        class="hero-mini"
        :data-video="getAssetPath('hero_mini/wr_mini.mp4')"
        :data-time="1"
        :data-style="'display: block;'"
        :data-shadow="'rgb(255 64 0) 0px 0px 20px, rgb(255 93 75) 0px 0px 15px inset'"
        :data-pos-x="16"
        :data-pos-y="19"
      >
        <video loop muted class="hero-video"></video>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const bgMusic = ref(null);
const videoMap = ref(null);

const getPathForMapVideo = (file) => {
  return `/video/${file}`;
};

const getAssetPath = (file) => {
  return `/${file}`;
};

const initGame = () => {
  const heroBlocks = document.querySelectorAll('.hero-mini');

  heroBlocks.forEach((block) => {
    const video = block.querySelector('.hero-video');
    if (video) {
      video.src = block.dataset.video;
      video.currentTime = parseFloat(block.dataset.time) || 0;
      video.setAttribute('style', block.dataset.style);
      video.pause();
    }

    block.style.left = `${block.dataset.posX || 50}vw`;
    block.style.top = `${block.dataset.posY || 50}vh`;

    block.addEventListener('mouseenter', () => {
      if (video) video.play();
      block.style.boxShadow = block.dataset.shadow;
    });

    block.addEventListener('mouseleave', () => {
      if (video) {
        video.pause();
        video.currentTime = parseFloat(block.dataset.time) || 0;
      }
      block.style.boxShadow =
        '0 0 20px rgba(255, 255, 255, 0.5), inset 0 0 15px rgba(200, 200, 200, 0.3)';
    });
  });
};

const startGame = () => {
  const simulateClick = new MouseEvent('click', { bubbles: true, cancelable: true });

  const clickElement = document.createElement('button');
  clickElement.style.display = 'none';

  clickElement.addEventListener('click', () => {
    if (videoMap.value) {
      videoMap.value.style.display = 'block';
      videoMap.value.play();
    }
    if (bgMusic.value) {
      bgMusic.value.play();
      bgMusic.value.volume = 0.2;
    }
  });

  document.body.appendChild(clickElement);
  clickElement.dispatchEvent(simulateClick);
  document.body.removeChild(clickElement);
};

onMounted(() => {
  initGame();
  startGame();
});
</script>

<style scoped>
.grayscale {
  filter: grayscale(100%);
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 50px;
}

.main-container {
  width: 100vw;
  height: 100vh;
}

#videoMap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

.hero-mini {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 20px rgba(255, 255, 255, 0.5),
    inset 0 0 15px rgba(200, 200, 200, 0.3);
  background-image: url('./img/greyfade.jpg');
  cursor: pointer;
  position: absolute;
  transition: 1s;
}

.hero-mini:hover {
  box-shadow:
    0 0 20px rgb(19 160 178),
    inset 0 0 15px rgb(24 227 198);
  transition: 0.4s;
}

.hero-mini:hover::before {
  opacity: 1;
}

.hero-mini video {
  mix-blend-mode: lighten;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.2) translate(0px, 8px);
}
</style>

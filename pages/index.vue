<template>
  <div class="menu-container fullscreen">
    <div class="menu">
      <img class="menu-photo" src="/img/menu.jpg" alt="menu" draggable="false" />
      <MainButton
        button-text="Мапа"
        :font="24"
        padding="16px 32px"
        width="500px"
        @clicked="goToMap"
      />
      <MainButton
        button-text="Лавка"
        :font="24"
        padding="16px 32px"
        width="500px"
        @clicked="goToShop"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import MainButton from '../components/ui/MainButton.vue';

const router = useRouter();

const goToMap = () => {
  router.push('/map');
};

const goToShop = () => {
  router.push('/shop');
};
</script>

<style scoped>
.menu-container {
  background-image: url('/img/bg_repeater.jpg');
  background-position: -300px;
  background-size: cover;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 30px;
}

.menu-photo {
  width: 50%;
  margin: 0 auto;
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 1) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 10%, rgb(0 0 0 / 0%) 70%);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  mask-size: cover;
  margin-bottom: 70px;
}

.menu-photo:hover {
  animation: glitch 0.5s infinite;
  cursor: grab;
}

@keyframes glitch {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(2px, -2px);
  }
  60% {
    transform: translate(-2px, 2px);
  }
  80% {
    transform: translate(2px, -1px);
  }
  100% {
    transform: translate(0);
  }
}
</style>

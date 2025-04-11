<template>
  <div class="menu-container fullscreen">
    <div class="menu">
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
  padding-top: 50px;
}
</style>

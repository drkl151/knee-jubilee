<template>
  <div class="interface">
    <NuxtLink to="/">
      <img class="menu-icon" src="/img/icons/menu.svg" alt="menu" />
    </NuxtLink>

    <div class="score flex-center">
      <div>{{ coinStore.coins }}</div>
      <img src="/img/icons/coins.png" alt="Coins" class="coin-icon" />
    </div>
  </div>
</template>

<script setup>
const coinStore = useCoinStore();
</script>

<style scoped>
.interface {
  width: 100%;
  position: absolute;
  right: 0;
  top: 0;
  padding: 20px;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  z-index: 9999;
}

.score {
  box-shadow: 1px 8px 5px rgb(0 0 0 / 46%);
  padding: 0 10px 0 20px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.322) 0%,
    rgb(255 255 255 / 48%) 30%,
    rgb(255 255 255 / 50%) 50%,
    rgba(255, 255, 255, 0.192) 100%
  );
  border-radius: 10px;
}
.menu-icon {
  width: 50px;
  cursor: pointer;
  box-shadow: -3px 3px 6px rgb(0 0 0 / 46%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.342) 0%,
    rgb(255 255 255 / 50%) 50%,
    rgba(255, 255, 255, 0.308) 100%
  );
  padding: 5px;
  border-radius: 5px;
}
</style>

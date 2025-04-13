<template>
  <div class="interface">
    <div class="score">{{ coinStore.coins }}</div>
    <img src="/img/icons/coins.png" alt="Coins" class="coin-icon" />
  </div>
</template>

<script setup>
const coinStore = useCoinStore();
</script>

<style scoped>
.interface {
  position: absolute;
  right: 0;
  top: 0;
  padding: 20px;
  font-size: 30px;
  display: flex;
  z-index: 9999;
}

.coin-icon {
  width: 40px;
  margin-left: 10px;
}
</style>

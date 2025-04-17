<template>
  <div class="shop fullscreen">
    <Alert v-if="showAlert" :message="alertMessage" />

    <div class="shop-container fullscreen c-accent">
      <swiper-container
        ref="swiperRef"
        :slides-per-view="1"
        :loop="true"
        :navigation="true"
        class="mySwiper"
      >
        <swiper-slide v-for="item in itemsForShop" :key="item.id" class="swiper-slide">
          <div class="shop-item style-bordeaux">
            <h2 class="item-title">{{ item.description }}</h2>

            <div class="flex-center" style="gap: 20px">
              <img :src="item.image" alt="Item" class="item-img" />
              <p v-if="isPurchased(item.id)">{{ item.location }}</p>
            </div>

            <p class="item-title">
              {{ item.price }} <img class="coin-icon" src="/img/icons/coins.png" />
            </p>

            <MainButton :disabled="isPurchased(item.id)" @click="buyItem(item.id)">
              {{ isPurchased(item.id) ? 'Purchased' : 'Buy' }}
            </MainButton>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>

<script setup>
// -------- Imports --------
import { ref, onMounted } from 'vue';
import itemsForShop from '@/assets/data/itemsForShop.json';
import { useCoinStore } from '@/stores/scoreCoins';
import MainButton from '@/components/ui/MainButton.vue';
import Alert from '@/components/ui/Alert.vue';

const coinStore = useCoinStore();

const swiperRef = ref(null);
const purchasedItems = ref([]);

const successSound = new Audio('/audio/coins.wav');
const errorSound = new Audio('/audio/wrong.mp3');

const { showAlert, alertMessage, triggerAlert } = useAlert();

const allItemsPurchased = computed(() => {
  return itemsForShop.length > 0 && purchasedItems.value.length === itemsForShop.length;
});

const checkAllPurchased = () => {
  const allPurchased = itemsForShop.length === purchasedItems.value.length;
  if (allPurchased) {
    triggerAlert(
      'You have purchased all the necessary clues about the location of the items. Get them and follow the rest of the clues'
    );
  }
};

const buyItem = (id) => {
  const item = itemsForShop.find((i) => i.id === id);
  if (!item) return;

  if (purchasedItems.value.includes(id)) {
    errorSound.play();
    return;
  }

  if (coinStore.spendCoins(item.price)) {
    purchasedItems.value.push(id);
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems.value));
    successSound.play();
    checkAllPurchased();
  } else {
    errorSound.play();
  }
};

const isPurchased = (id) => purchasedItems.value.includes(id);

if (allItemsPurchased.value) {
  triggerAlert(
    'You have purchased all the necessary clues about the location of the items. Get them and follow the rest of the clues'
  );
} else {
  triggerAlert('Buy all the clues. They will lead you to the items — and to the main prize');
}

// -------- Lifecycle Hooks --------
onMounted(() => {
  const saved = localStorage.getItem('purchasedItems');
  if (saved) {
    purchasedItems.value = JSON.parse(saved);
  }
});
</script>

<style>
.shop {
  background-image: url('/img/secret-shop.png');
  background-size: cover;
  background-position: bottom;
}

.shop-container {
  padding: 16% 10% 2%;
  backdrop-filter: blur(4px);
}

.swiper-slide {
  transform: scale(0.5);
  transition: 0.3s ease;
}

.swiper-slide-active {
  transform: scale(1);
  transition: transform 0.3s ease;
}

.shop-item {
  border-radius: 13px;
  box-shadow: none;
  padding: 32px 25px 40px;
  text-align: center;
  max-width: 35%;
  margin: auto;
}

.item-img {
  max-height: 250px;
  height: auto;
  object-fit: contain;
  margin-bottom: 12px;
}

.item-title {
  font-size: 22px;
  margin-bottom: 30px;
}
</style>

<template>
  <div class="shop fullscreen">
    <div class="shop-container fullscreen c-accent">
      <swiper-container
        ref="swiperRef"
        :slides-per-view="1"
        :loop="true"
        :navigation="true"
        class="mySwiper"
      >
        <swiper-slide v-for="item in items" :key="item.id" class="swiper-slide">
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
import { ref, onMounted } from 'vue';
import MainButton from '@/components/ui/MainButton.vue';

const items = ref([
  {
    id: 'item1',
    description: 'Healing Salve',
    price: 10,
    image: '/img/shop/flasc.png',
    location: 'This great item will give you energy, look for it on the snack shelf',
  },
  {
    id: 'item2',
    description: 'Iron Branch',
    price: 20,
    image: '/img/shop/iron_branch.png',
    location: 'This great item will give you energy, look for it on the snack shelf',
  },
  {
    id: 'item3',
    description: 'Tango',
    price: 30,
    image: '/img/shop/tango.png',
    location: 'This great item will give you energy, look for it on the snack shelf',
  },
]);

const swiperRef = ref(null);
const purchasedItems = ref([]);

const buyItem = (id) => {
  if (!purchasedItems.value.includes(id)) {
    purchasedItems.value.push(id);
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems.value));
  }
};

const isPurchased = (id) => purchasedItems.value.includes(id);

onMounted(() => {
  const saved = localStorage.getItem('purchasedItems');
  if (saved) {
    purchasedItems.value = JSON.parse(saved);
  }
});
</script>

<style scoped>
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

.swiper-button-next svg,
.swiper-button-prev svg {
  stroke-width: 1px;
  stroke: azure;
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

<template>
  <div class="shop-container">
    <h1 class="title">Secret Shop</h1>
    <swiper-container
      ref="swiperRef"
      :slides-per-view="3"
      :loop="true"
      :navigation="true"
      class="mySwiper"
    >
      <swiper-slide v-for="item in items" :key="item.id">
        <div class="shop-item">
          <img :src="item.image" alt="Item" class="item-img" />
          <h2 class="item-title">{{ item.description }}</h2>
          <p class="item-price">{{ item.price }} coins</p>

          <button class="buy-button" :disabled="isPurchased(item.id)" @click="buyItem(item.id)">
            {{ isPurchased(item.id) ? 'Куплено' : 'Купить' }}
          </button>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const items = ref([
  { id: 'item1', description: 'Описание предмета 1', price: 10, image: '/img/shop/item1.png' },
  { id: 'item2', description: 'Описание предмета 2', price: 20, image: '/img/shop/item2.png' },
  { id: 'item3', description: 'Описание предмета 3', price: 30, image: '/img/shop/item3.png' },
  { id: 'item4', description: 'Описание предмета 4', price: 40, image: '/img/shop/item4.png' },
]);

const swiperRef = ref(null);
const purchasedItems = ref([]);

const buyItem = (id) => {
  if (!purchasedItems.value.includes(id)) {
    purchasedItems.value.push(id);
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems.value));
    alert('Предмет куплен!');
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
.shop-container {
  position: relative;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 32px;
  font-size: 32px;
}

.shop-item {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  background: #fff;
  max-width: 300px;
  margin: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 12px;
}

.item-title {
  font-size: 18px;
  margin-bottom: 8px;
}

.item-price {
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 12px;
}

.buy-button {
  padding: 8px 16px;
  border: none;
  background: #4caf50;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.buy-button:disabled {
  background: #999;
  cursor: not-allowed;
}
</style>

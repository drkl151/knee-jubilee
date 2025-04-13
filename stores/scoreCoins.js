import { defineStore } from 'pinia';

export const useCoinStore = defineStore('coinStore', {
  state: () => ({
    coins: 0,
  }),

  actions: {
    addCoins(amount) {
      this.coins += amount;
    },
  },

  persist: true,
});

import { defineStore } from 'pinia';

export const useCoinStore = defineStore('coinStore', {
  state: () => ({
    coins: 0,
  }),

  actions: {
    addCoins(amount) {
      this.coins += amount;
    },
    spendCoins(amount) {
      if (this.coins >= amount) {
        this.coins -= amount;
        return true;
      }
      return false;
    },
  },

  persist: true,
});

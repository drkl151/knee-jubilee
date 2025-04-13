import persistedState from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia;

  if (pinia && typeof pinia.use === 'function') {
    pinia.use(persistedState);
  }
});

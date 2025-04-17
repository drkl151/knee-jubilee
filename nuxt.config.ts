export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
  },
  css: ['@/assets/styles/main.css'],
  modules: ['nuxt-swiper', '@pinia/nuxt'],
  plugins: ['~/plugins/pinia-plugin-persistedstate.client.js'],
  devtools: { enabled: true },
  generate: {
    routes: ['/map', '/shop', '/games/quiz'],
  },
});

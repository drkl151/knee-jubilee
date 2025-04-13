// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/styles/main.css'],
  modules: ['nuxt-swiper', '@pinia/nuxt'],
  plugins: [{ src: '~/plugins/pinia-plugin-persistedstate.client.js', mode: 'client' }],
  ssr: false,
});

// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  // โหลดสไตล์หลัก + primeicons (และ primeflex ถ้าใช้)
  css: [
    '~/assets/css/main.css',
    'primeicons/primeicons.css',
    // 'primeflex/primeflex.css', // <- เอาออกถ้าไม่ใช้
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // ถ้าเจอปัญหา build/SSR กับบางโปรเจกต์ ค่อยเปิดบรรทัดนี้
  // build: {
  //   transpile: ['primevue'],
  // },
})

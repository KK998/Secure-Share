// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'sl',
        name: 'Slovenščina',
        file: 'sl.json'
      },
    ],
    defaultLocale: 'en'
  },

  modules: [
    '@nuxt/icon',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n'
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  }
})
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  ssr: false,
  runtimeConfig: {
    // Will be available in both client and server
    discordApiId: "1126085790259224586",
    discordApiSecret: '',
    disocrdApiRedirectUri: "http://localhost:3000/login",
    discordApiUrl: "https://discord.com/api/v10/oauth2/token",
    public: {
      discordRedirectUri: "https://discord.com/oauth2/authorize?client_id=1126085790259224586&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&scope=identify",
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  nitro: {
    experimental: {
      database: true
    }
  },
})
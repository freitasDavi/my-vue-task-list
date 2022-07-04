import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["cookie-universal-nuxt"],
  server: {
    port: 8000,
  },
});

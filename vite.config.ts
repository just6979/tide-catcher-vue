import vue from "@vitejs/plugin-vue"
import {defineConfig} from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.GITHUB_PAGES === "production" ? "/tide-catcher-vue/" : "/",
  server: {
    port: 3000
  },
  preview: {
    port: 3000,
  },
  build: {
    sourcemap: true,
    license: true,
  }
})

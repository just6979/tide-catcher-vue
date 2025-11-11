import vue from "@vitejs/plugin-vue"
import {defineConfig} from "vite"

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === "production" ? "/tide-catcher-vue/" : "/",
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

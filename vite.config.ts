import vue from "@vitejs/plugin-vue"
import {defineConfig} from "vite"

console.log(process.env)

export default defineConfig({
  plugins: [vue()],
  base: process.env.BASE_PATH || "/",
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

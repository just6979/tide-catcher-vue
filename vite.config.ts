import vue from "@vitejs/plugin-vue"
import TurboConsole from "unplugin-turbo-console/vite"
import {defineConfig} from "vite"

export default defineConfig({
  plugins: [
    vue(),
    TurboConsole()
  ],
  base: process.env.BASE_PATH || "/",
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    sourcemap: true,
    license: true,
  },
})

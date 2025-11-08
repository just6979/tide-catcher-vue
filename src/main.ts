import {createApp} from "vue"
import "./style.css"
import {createRouter, createWebHistory} from "vue-router"
import App from "./App.vue"
import About from "./components/About.vue"
import Chooser from "./components/Chooser.vue"
import StationByStation from "./components/StationByStation.vue"
import TidesByStation from "./components/TidesByStation.vue"

export const DEFAULT_STATION = "8441241"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: "/", component: Chooser},
    {path: "/about", component: About},
    {path: "/station/:id", component: StationByStation, props: true},
    {path: "/tides/station/:id", component: TidesByStation, props: true},
  ],
  linkActiveClass: "active-route",
})

const app = createApp(App)
app.use(router)
app.mount("#app")

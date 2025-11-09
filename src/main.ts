import {createApp} from "vue"
import "./style.css"
import {createRouter, createWebHistory} from "vue-router"
import App from "./App.vue"
import About from "./components/About.vue"
import StationsChooser from "./components/StationsChooser.vue"
import TidesChooser from "./components/TidesChooser.vue"
import StationByLocation from "./components/StationByLocation.vue"
import StationByStation from "./components/StationByStation.vue"
import StationsAll from "./components/StationsAll.vue"
import TidesByLocation from "./components/TidesByLocation.vue"
import TidesByStation from "./components/TidesByStation.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: "/", component: TidesChooser},
    {path: "/about", component: About},
    {path: "/tides", component: TidesChooser},
    {path: "/stations", component: StationsChooser},
    {path: "/tides/location/:loc", component: TidesByLocation, props: true},
    {path: "/tides/station/:id", component: TidesByStation, props: true},
    {path: "/station/location/:loc", component: StationByLocation, props: true},
    {path: "/station/id/:id", component: StationByStation, props: true},
    {path: "/station/all", component: StationsAll, props: true},
  ],
  linkActiveClass: "active-route",
})

const app = createApp(App)
app.use(router)
app.mount("#app")

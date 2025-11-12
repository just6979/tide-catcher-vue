import {createApp} from "vue"
import "./style.css"
import {createRouter, createWebHistory} from "vue-router"
import App from "./App.vue"
import AboutPage from "./components/AboutPage.vue"
import StationsChooser from "./components/StationsChooser.vue"
import TidesChooser from "./components/TidesChooser.vue"
import StationByLocation from "./components/StationByLocation.vue"
import StationByStation from "./components/StationByStation.vue"
import StationsAll from "./components/StationsAll.vue"
import TidesByLocation from "./components/TidesByLocation.vue"
import TidesByStation from "./components/TidesByStation.vue"

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/", component: TidesChooser},
    {path: "/about", component: AboutPage},
    {path: "/tides", component: TidesChooser},
    {path: "/stations", component: StationsChooser},
    {path: "/tides/location/:loc", component: TidesByLocation, props: true},
    {path: "/tides/station/:id", component: TidesByStation, props: true},
    {path: "/stations/location/:loc", component: StationByLocation, props: true},
    {path: "/stations/id/:id", component: StationByStation, props: true},
    {path: "/stations/all", component: StationsAll, props: true},
  ],
})

const app = createApp(App)
app.use(router)
app.mount("#app")

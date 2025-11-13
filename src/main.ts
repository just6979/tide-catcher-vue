import { createApp } from "vue"
import "./style.css"
import { createRouter, createWebHistory } from "vue-router"
import App from "./App.vue"
import AboutPage from "./components/AboutPage.vue"
import StationById from "./components/StationById.vue"
import StationByLocation from "./components/StationByLocation.vue"
import StationChooser from "./components/StationChooser.vue"
import StationList from "./components/StationList.vue"
import TidesByLocation from "./components/TidesByLocation.vue"
import TidesByStation from "./components/TidesByStation.vue"
import TidesChooser from "./components/TidesChooser.vue"
import { DEFAULT_LOCATION, DEFAULT_STATION } from "./lib/constants.ts"

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: TidesChooser },
    { path: "/about", component: AboutPage },
    { path: "/tides", component: TidesChooser },
    { path: "/tides/location/:loc", component: TidesByLocation, props: true },
    {
      path: "/tides/location/",
      redirect: () => {
        return { path: `/tides/location/${DEFAULT_LOCATION}` }
      },
    },
    { path: "/tides/station/:id", component: TidesByStation, props: true },
    {
      path: "/tides/station/",
      redirect: () => {
        return { path: `/tides/station/${DEFAULT_STATION}` }
      },
    },
    { path: "/station", component: StationChooser },
    { path: "/station/id/:id", component: StationById, props: true },
    {
      path: "/station/id/",
      redirect: () => {
        return { path: `/station/id/${DEFAULT_STATION}` }
      },
    },
    { path: "/station/location/:loc", component: StationByLocation, props: true },
    {
      path: "/station/location/",
      redirect: () => {
        return { path: `/station/location/${DEFAULT_LOCATION}` }
      },
    },
    { path: "/station/list", component: StationList, props: true },
  ],
})

const app = createApp(App)
app.use(router)
app.mount("#app")

import { createApp } from "vue"
import "./style.css"
import { createRouter, createWebHashHistory } from "vue-router"
import App from "./App.vue"
import AboutPage from "./components/AboutPage.vue"
import StationById from "./components/StationById.vue"
import StationByLocation from "./components/StationByLocation.vue"
import StationChooser from "./components/StationChooser.vue"
import StationList from "./components/StationList.vue"
import TidesById from "./components/TidesById.vue"
import TidesByLocation from "./components/TidesByLocation.vue"
import TidesChooser from "./components/TidesChooser.vue"
import { DEFAULT_LOCATION, DEFAULT_STATION } from "./lib/constants.ts"

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: TidesChooser },
    { path: "/about", component: AboutPage },
    { path: "/tides", component: TidesChooser },
    { path: "/station", component: StationChooser },
    { path: "/station/list", component: StationList },
    { path: "/tides/id/:id", component: TidesById, props: true },
    {
      path: "/tides/id/",
      redirect: () => {
        return { path: `/tides/id/${DEFAULT_STATION}` }
      },
    },
    { path: "/tides/location/:loc", component: TidesByLocation, props: true },
    {
      path: "/tides/location/",
      redirect: () => {
        return { path: `/tides/location/${DEFAULT_LOCATION}` }
      },
    },
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
    // TODO: make a 404 page
    { path: "/:pathMatch(.*)*", component: TidesChooser },
  ],
})

const app = createApp(App)
app.use(router)
app.mount("#app")

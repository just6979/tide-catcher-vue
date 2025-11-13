<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import { DEFAULT_LOCATION, GEOLOCATION_ERRORS, GEOLOCATION_OPTIONS } from "../lib/constants.ts"
import { fetchTidePredStation } from "../lib/stations.ts"
import { fetchTides } from "../lib/tides.ts"
import type { NoaaTidePrediction, NoaaTidePredStation } from "../lib/types.ts"
import RequestInfoTable from "./RequestInfoTable.vue"
import TidesTable from "./TidesTable.vue"

const route = useRoute()
const loading = ref(true)
const error = ref<string>()
const locating = ref(false)
const location = ref<[number, number]>()
const station = ref<NoaaTidePredStation>()
const tides = ref<NoaaTidePrediction[]>()

function main() {
  const locationParam = route.params.loc?.toString() || DEFAULT_LOCATION

  if (locationParam === "gps") {
    // get the location from geolocation
    locating.value = true
    console.log("Geolocating...")
    navigator.geolocation.getCurrentPosition(
      (position) => {
        location.value = [position.coords.latitude, position.coords.longitude]
        console.log(`Geolocated: [${location.value}].`)
        locating.value = false
        loading.value = false
      },
      (err) => {
        console.warn(`error getting location: ${GEOLOCATION_ERRORS[err.code]}`)
        error.value = GEOLOCATION_ERRORS[err.code]
        locating.value = false
        loading.value = false
      },
      GEOLOCATION_OPTIONS,
    )
  } else {
    // get the location from params
    const locationSplit = locationParam.split(",")
    console.log(locationSplit)
    if (locationSplit.length >= 2) {
      location.value = [Number(locationSplit[0]), Number(locationSplit[1])]
    } else {
      error.value = "Invalid location."
    }
  }
}

// uses the location ref to get the station details from the TidePredStations API
watch(location, (newLocation) => {
  if (newLocation) {
    fetchTidePredStation(newLocation, error, station)
  }
})

// use the station details to get the tides
watch(station, (newStation) => {
  if (newStation) {
    fetchTides(newStation, error, tides)
  }
})

watch(tides, () => {
  loading.value = false
})

main()
</script>

<template>
  <div>
    <div v-if="locating">
      <p>Geolocating...</p>
    </div>
    <div v-else-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <template v-else-if="station">
      <template v-if="tides">
        <TidesTable :station="station" :tides="tides" />
      </template>
      <div v-else>
        <p>No Tides found for {{ location }}.</p>
      </div>
      <RequestInfoTable :station="station" :req-location="location" />
    </template>
    <div v-else>
      <p>No Station found for {{ location }}.</p>
    </div>
  </div>
</template>

<style scoped></style>

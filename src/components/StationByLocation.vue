<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import { DEFAULT_LOCATION, GEOLOCATION_ERRORS, GEOLOCATION_OPTIONS } from "../lib/constants.ts"
import { fetchTidePredStation } from "../lib/stations.ts"
import type { NoaaTidePredStation } from "../lib/types.ts"
import StationTable from "./StationTable.vue"

const route = useRoute()
const loading = ref(true)
const error = ref<string>()
const locating = ref(false)
const location = ref<[number, number]>()
const station = ref<NoaaTidePredStation>()

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

watch(station, () => {
  loading.value = false
})

main()
</script>

<template>
  <div>
    <div v-if="locating">
      <p>Geolocating...</p>
    </div>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else-if="error">
      <p>Error: {{ error }}</p>
    </div>
    <div v-else-if="station">
      <StationTable :station="station" />
    </div>
    <div v-else>
      <p>No Station found for {{ location }}.</p>
    </div>
  </div>
</template>

<style scoped></style>

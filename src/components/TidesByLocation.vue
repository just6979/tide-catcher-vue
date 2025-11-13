<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import { DEFAULT_LOCATION } from "../constants.ts"
import { fetchTidePredStation } from "../lib/stations.ts"
import { fetchTides } from "../lib/tides.ts"
import type { NoaaTidePrediction, NoaaTidePredStation } from "../types.ts"
import TidesTable from "./TidesTable.vue"

const route = useRoute()
const loading = ref(true)
const error = ref<string>()
const location = ref<[number, number]>()
const station = ref<NoaaTidePredStation>()
const tides = ref<NoaaTidePrediction[]>()

const locationParam = route.params.location?.toString() || DEFAULT_LOCATION
console.log(locationParam)

// get the location from params
const locationSplit = locationParam.split(",")
if (locationSplit.length >= 2) {
  location.value = [Number(locationSplit[0]), Number(locationSplit[1])]
} else {
  error.value = "Invalid location."
}

// uses the location ref to get the station details from the TidePredStations API
if (location.value) {
  fetchTidePredStation(location.value, error, station)
}

// use the station details to get the tides
watch(station, (newStation) => {
  if (newStation) {
    fetchTides(newStation, error, tides)
    console.log(tides.value)
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading">
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
      <p>No Tides found for {{ station?.stationId }}.</p>
    </div>
  </template>
  <div v-else>
    <p>No Station found for {{ location }}.</p>
  </div>
</template>

<style scoped>

</style>

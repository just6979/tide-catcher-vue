<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import { DEFAULT_STATION } from "../lib/constants.ts"
import { fetchCoOpsStation, fetchTidePredStation } from "../lib/stations.ts"
import { fetchTides } from "../lib/tides.ts"
import type { NoaaTidePrediction, NoaaTidePredStation } from "../lib/types.ts"
import TidesTable from "./TidesTable.vue"

const route = useRoute()
const loading = ref(true)
const error = ref<string>()
const location = ref<[number, number]>()
const station = ref<NoaaTidePredStation>()
const tides = ref<NoaaTidePrediction[]>()

const stationId = route.params.id?.toString() || DEFAULT_STATION

// fill in the location ref using the NOAA CO-OPS API
fetchCoOpsStation(route.params.id?.toString() || DEFAULT_STATION, location, error)

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
    <p>No Station found for {{ stationId }}.</p>
  </div>
</template>

<!--suppress CssUnusedSymbol-->
<style scoped>
</style>

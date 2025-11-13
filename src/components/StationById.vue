<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import { DEFAULT_STATION } from "../lib/constants.ts"
import { fetchCoOpsStation, fetchTidePredStation } from "../lib/stations.ts"
import type { NoaaTidePredStation } from "../lib/types.ts"
import StationTable from "./StationTable.vue"

const route = useRoute()
const loading = ref(true)
const error = ref<string>()
const location = ref<[number, number]>()
const station = ref<NoaaTidePredStation>()

// fill in the location ref using the NOAA CO-OPS API
fetchCoOpsStation(route.params.id?.toString() || DEFAULT_STATION, location, error)

// uses the location ref to get the station details from the TidePredStations API
watch(location, (newLocation) => {
  if (newLocation) {
    fetchTidePredStation(newLocation, error, station)
  }
})

watch(station, () => {
  loading.value = false
})
</script>

<template>
  <div>
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
      <p>No Station found for ID {{ route.params.id }}</p>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import { DEFAULT_LOCATION } from "../lib/constants.ts"
import { fetchTidePredStation } from "../lib/stations.ts"
import type { NoaaTidePredStation } from "../lib/types.ts"
import StationTable from "./StationTable.vue"

const route = useRoute()
const loading = ref(true)
const error = ref<string>()
const location = ref<[number, number]>()
const station = ref<NoaaTidePredStation>()

const locationParam = route.params.location?.toString() || DEFAULT_LOCATION

// get the location from params
const locationSplit = locationParam.split(",")
if (locationSplit.length >= 2) {
  location.value = [Number(locationSplit[0]), Number(locationSplit[1])]
} else {
  error.value = "Invalid location."
}
console.log()
// uses the location ref to get the station details from the TidePredStations API
if (location.value) {
  fetchTidePredStation(location.value, error, station)
}

watch(station, () => {
  loading.value = false
})
</script>

<template>
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
</template>

<style scoped></style>

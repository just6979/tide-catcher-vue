<script setup lang="ts">
import { ref } from "vue"
import type { NoaaError, NoaaTidePredResponse, NoaaTidePredStation } from "../lib/types.ts"

const loading = ref(true)
const error = ref<string>()
const stations = ref<NoaaTidePredStation[]>()

const url = "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json"
fetch(url)
  .then((res) => {
    res
      .json()
      .then((data: NoaaTidePredResponse | NoaaError) => {
        if (!("error" in data)) {
          stations.value = data.stationList
          // stations.value.sort((a: TidePredStation, b: TidePredStation) => {
          //   if (a.stationId < b.stationId) return -1
          //   else if (a.stationId > b.stationId) return 1
          //   else return 0
          // })
        } else {
          console.log(`Message: ${data.error.message}`)
          console.log(`URL: ${url}`)
          error.value = data.error.message
        }
        loading.value = false
      })
      .catch((err: Error) => {
        const msg = `JSON Error: ${err}`
        console.log(msg)
        error.value = msg
        loading.value = false
      })
  })
  .catch((err) => {
    const msg = `Fetch Error: ${err.toString()}`
    console.log(msg)
    error.value = msg
    loading.value = false
  })
</script>

<template>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else-if="error">
    <p>{{ error }}</p>
  </div>
  <div v-else-if="stations">
    <h2>Found {{ stations.length }} Stations</h2>
    <ul>
      <li v-for="station in stations" :key="station.stationId">
        <RouterLink :to="`/station/id/${station.stationId}`">{{ station.stationId }}</RouterLink>
        |
        {{ station.commonName }}, {{ station.state }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>No Stations found.</p>
  </div>
</template>

<style scoped>
ul {
  font-size: 75%;
  text-align: start;
}
</style>

<script setup lang="ts">
import {ref} from "vue"
import {useRoute} from "vue-router"
import {DEFAULT_STATION} from "../constants.ts"
import type {NoaaCoOpsStation, NoaaTidePredStation} from "../types.ts"

const route = useRoute()
const stationId = route.params.id?.toString() || DEFAULT_STATION

const station = ref<NoaaTidePredStation>()
const loading = ref(true)
const error = ref(null)
let location: string

function fetchTidePredStation(coOpsStation: NoaaCoOpsStation) {
  try {
    const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json` +
        `?lat=${coOpsStation.lat}&lon=${coOpsStation.lng}&radius=1`
    fetch(url).then((res) => res.json().then((data: any) => {
      if ("error" in data) {
        console.log(`Message: ${data["error"]["message"]}`)
        console.log(`URL: ${url}`)
        error.value = data["error"]["message"]
      } else {
        const s = data["stationList"][0]
        location = `${Number(s.lat).toFixed(5)},${Number(s.lon).toFixed(5)}`
        console.log(s)
        station.value = s
      }
    }))
  } catch (err: any) {
    console.log(`Error: ${err.toString()}`)
    error.value = err.toString()
  }
}

try {
  const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${stationId}.json`
  fetch(url).then((res) => res.json().then((data: any) => {
    if ("error" in data) {
      console.log(`Message: ${data["error"]["message"]}`)
      console.log(`URL: ${url}`)
      error.value = data["error"]["message"]
    } else {
      fetchTidePredStation(data["stations"][0])
    }
  }))
} catch (err: any) {
  console.log(`Error: ${err.toString()}`)
  error.value = err.toString()
} finally {
  loading.value = false
}
</script>

<template>
  <div>
    <h2>Station {{ stationId }}</h2>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <table v-else-if="station">
      <tbody>
      <tr>
        <td>NOAA ID</td>
        <td>
          <a
              :href="`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${stationId}`"
              target="_blank"
          >
            {{ station.stationId }}
          </a>
        </td>
      </tr>
      <tr>
        <td>Station Name</td>
        <td>{{ station.stationName }}</td>
      </tr>
      <tr>
        <td>Location</td>
        <td>
          <a :href="`https://www.google.com/maps/place/${station.lat},${station.lon}/@${station.lat},${station.lon},12z`"
             target="_blank">
            [{{ location }}]
          </a>
        </td>
      </tr>
      <tr>
        <td>Common Name</td>
        <td>{{ station.commonName }}</td>
      </tr>
      <tr>
        <td>Station Name</td>
        <td>{{ station.stationName }}</td>
      </tr>
      <tr>
        <td>eTides Name</td>
        <td>{{ station.etidesStnName }}</td>
      </tr>
      <tr>
        <td>State</td>
        <td>{{ station.state }}</td>
      </tr>
      <tr>
        <td>Region</td>
        <td>{{ station.region }}</td>
      </tr>
      <tr>
        <td>Timezone Offset</td>
        <td>{{ station.timeZoneCorr }}</td>
      </tr>
      </tbody>
    </table>
    <p v-else>No Station found for ID {{ stationId }}</p>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}

table {
  width: 100%;
  margin: 0;
  border-collapse: collapse;
  border-color: #666666;
  border-width: thin;
}

tr {
  border-width: thin;
  border-color: inherit;
  border-style: solid;
}

tr :first-child {
  width: 50%;
  border-width: thin;
  border-color: inherit;
  border-right-style: dotted;
}
</style>

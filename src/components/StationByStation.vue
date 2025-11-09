<script setup lang="ts">
import {ref, watch} from "vue"
import {useRoute} from "vue-router"
import {DEFAULT_STATION} from "../constants.ts"
import type {NoaaCoOpsResponse, NoaaError, NoaaTidePredResponse, NoaaTidePredStation} from "../types.ts"

const route = useRoute()
const loading = ref(true)
const error = ref<string>()
const location = ref<[number, number]>()
const station = ref<NoaaTidePredStation>()

// fill in the location ref using the NOAA CO-OPS API
fetchCoOpsStation(route.params.id?.toString() || DEFAULT_STATION)
// uses the location ref to get the station details from the TidePredStations API
watch(location, (newLocation) => {
  if (newLocation) fetchTidePredStation(newLocation)
})

function fetchCoOpsStation(stationId: string) {
  const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${stationId}.json`
  fetch(url).then((res) => {
    res.json().then((data: NoaaCoOpsResponse | NoaaError) => {
      if (!("error" in data)) {
        const coOpsStation = data.stations[0]
        if (coOpsStation) {
          location.value = [coOpsStation.lat, coOpsStation.lng]
        }

      } else {
        console.log(`Message: ${data["error"]["message"]}`)
        console.log(`URL: ${url}`)
        error.value = data["error"]["message"]
      }
    })
  }).catch((err: Error) => {
    let msg = `JSON Error: ${err}`
    console.log(msg)
    error.value = msg
  }).catch((err: any) => {
    let msg = `Fetch Error: ${err.toString()}`
    console.log(msg)
    error.value = msg
  })
}

function fetchTidePredStation(location: [number, number]) {
  const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json` +
      `?lat=${location[0]}&lon=${location[1]}&radius=1`
  fetch(url).then((res) => {
    res.json().then((data: NoaaTidePredResponse | NoaaError) => {
      if (!("error" in data)) {
        station.value = data["stationList"][0]
      } else {
        console.log(`Message: ${data["error"]["message"]}`)
        console.log(`URL: ${url}`)
        error.value = data["error"]["message"]
      }
      loading.value = false
    }).catch((err: Error) => {
      let msg = `JSON Error: ${err}`
      console.log(msg)
      error.value = msg
      loading.value = false
    })
  }).catch((err: any) => {
    let msg = `Fetch Error: ${err.toString()}`
    console.log(msg)
    error.value = msg
    loading.value = false
  })
}
</script>

<template>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else-if="error">
    <p>Error: {{ error }}</p>
  </div>
  <div v-else-if="station">
    <h2>Station {{ station.stationId }}</h2>
    <table>
      <tbody>
      <tr>
        <td>NOAA ID</td>
        <td>
          <a
              :href="`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${station.stationId}`"
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
          [<a
            :href="`https://www.google.com/maps/place/${station.lat},${station.lon}/@${station.lat},${station.lon},12z`"
            target="_blank">
          {{ `${station.lat.toFixed(5)}, ${station.lon.toFixed(5)}` }}
        </a>]
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
  </div>
  <div v-else>
    <p>No Station found for ID {{ route.params.id }}</p>
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

tr td:first-child {
  width: 50%;
  border-width: thin;
  border-color: inherit;
  border-right-style: dotted;
}
</style>

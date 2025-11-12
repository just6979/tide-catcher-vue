<script setup lang="ts">
import {ref, watch} from "vue"
import {useRoute} from "vue-router"
import {DEFAULT_STATION} from "../constants.ts"
import {fetchCoOpsStation, fetchTidePredStation} from "../lib/stations.ts"
import type {NoaaTidePredStation} from "../types.ts"

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
    loading.value = false
  }
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
    <table>
      <caption>{{ station.stationName }}</caption>
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
        <td>Full Name</td>
        <td>{{ station.stationFullName }}</td>
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
  margin: 1em 0;
  border-collapse: collapse;
  font-size: 66%;
}

caption {
  padding-bottom: 0.5em;
  font-size: 133%;
}

td {
  padding: 0.5em;
}

td:first-child {
  width: 50%;
  border-width: thin;
  border-color: inherit;
  border-right-style: dotted;
  text-align: end;
  white-space: nowrap;
}

tr {
  text-align: start;
}
</style>

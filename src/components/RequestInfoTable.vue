<script setup lang="ts">
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import type { NoaaTidePredStation } from "../lib/types.ts"

const { station, reqLocation = undefined } = defineProps<{
  station: NoaaTidePredStation
  reqLocation?: [number, number]
}>()

const now = new Date().toLocaleString()
let reqLoc: string
if (reqLocation) {
  reqLoc = `${reqLocation[0].toFixed(3)},${reqLocation[1].toFixed(3)}`
}

let stationLoc: string
if (station) {
  stationLoc = `${station.lat.toFixed(3)},${station.lon.toFixed(3)}`
}
</script>

<template>
  <table class="request-info">
    <tbody>
      <tr>
        <td>Current Time</td>
        <td>{{ now }}</td>
      </tr>
      <tr v-if="reqLoc">
        <td>
          <a :href="`https://www.google.com/maps/place/${reqLoc}/@${reqLoc},12z`" class="external" target="_blank">
            Your Location
            <FontAwesomeIcon :icon="faArrowUpRightFromSquare" />
          </a>
        </td>
        <td>
          [{{ reqLoc }}]
          <br />
          (<RouterLink :to="`/station/location/${reqLoc}`">Station</RouterLink>,
          <RouterLink :to="`/tides/location/${reqLoc}`">Tides</RouterLink>)
        </td>
      </tr>
      <tr v-if="station">
        <td>
          <a
            :href="`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${station.stationId}`"
            class="external"
            target="_blank"
          >
            Station ID
            <FontAwesomeIcon :icon="faArrowUpRightFromSquare" />
          </a>
        </td>
        <td>
          {{ station.stationId }}
          <br />
          <RouterLink :to="`/station/id/${station.stationId}`">Station</RouterLink>,
          <RouterLink :to="`/tides/id/${station.stationId}`">Tides</RouterLink>
        </td>
      </tr>
      <tr v-if="station">
        <td>
          <a
            :href="`https://www.google.com/maps/place/${stationLoc}/@${stationLoc},12z`"
            class="external"
            target="_blank"
          >
            Station Location
            <FontAwesomeIcon :icon="faArrowUpRightFromSquare" />
          </a>
        </td>
        <td>
          [{{ stationLoc }}]
          <br />
          (<RouterLink :to="`/station/location/${stationLoc}`">Station</RouterLink>,
          <RouterLink :to="`/tides/location/${stationLoc}`">Tides</RouterLink>)
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.request-info {
  width: 80%;
  margin: 1em auto;
  font-size: 66%;
}

.request-info td:first-child {
  border-right: dotted thin;
  white-space: nowrap;
  width: 50%;
  text-align: end;
  padding: 0.5em;
}

.request-info td {
  text-align: start;
  padding: 0.5em;
}

.external {
  text-decoration: none;
}
</style>

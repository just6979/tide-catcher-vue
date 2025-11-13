<script setup lang="ts">
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import type { NoaaTidePredStation } from "../lib/types.ts"

const props = defineProps<{
  station: NoaaTidePredStation
  reqLocation?: [number, number]
}>()

const now = new Date().toLocaleString()
let reqLoc: string
if (props.reqLocation) {
  reqLoc = `${props.reqLocation[0].toFixed(5)},${props.reqLocation[1].toFixed(5)}`
}

let stationLoc: string
if (props.station) {
  stationLoc = `${props.station.lat.toFixed(5)},${props.station.lon.toFixed(5)}`
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
          [<RouterLink :to="`/tides/location/${reqLoc}`">{{ reqLoc }}</RouterLink
          >]
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
          <RouterLink :to="`/tides/station/${station.stationId}`">
            {{ station.stationId }}
          </RouterLink>
          (<RouterLink :to="`/station/id/${station.stationId}`">Details</RouterLink>)
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
          [<RouterLink :to="`/tides/location/${stationLoc}`">{{ stationLoc }}</RouterLink
          >]
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.request-info {
  margin: 1em 0;
  font-size: 66%;
}

.request-info td:first-child {
  border-right: dotted thin;
  white-space: nowrap;
}

.request-info td:first-child {
  width: 50%;
  text-align: end;
}

.request-info td {
  text-align: start;
  padding: 0.5em;
  white-space: collapse;
}

.external {
  text-decoration: none;
}
</style>

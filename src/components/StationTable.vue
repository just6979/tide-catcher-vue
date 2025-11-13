<script setup lang="ts">
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import type { NoaaTidePredStation } from "../lib/types.ts"

const props = defineProps<{
  station: NoaaTidePredStation
}>()

const station = props.station
const stationLoc = `${station.lat.toFixed(5)},${station.lon.toFixed(5)}`
</script>

<template>
  <table>
    <caption>
      {{
        station.stationName
      }}
    </caption>
    <tbody>
      <tr>
        <td>
          <a
            :href="`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${station.stationId}`"
            class="external"
            target="_blank"
          >
            NOAA ID
            <FontAwesomeIcon :icon="faArrowUpRightFromSquare" />
          </a>
        </td>
        <td>
          <RouterLink :to="`/station/id/${station.stationId}`">{{ station.stationId }}</RouterLink>
          (<RouterLink :to="`/tides/station/${station.stationId}`">Tides</RouterLink>)
        </td>
      </tr>
      <tr>
        <td>Station Name</td>
        <td>{{ station.stationName }}</td>
      </tr>
      <tr>
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
          [<RouterLink :to="`/station/location/${stationLoc}`">{{ stationLoc }}</RouterLink
          >] (<RouterLink :to="`/tides/location/${stationLoc}`">Tides</RouterLink>)
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
</template>

<style scoped>
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

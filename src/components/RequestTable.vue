<script setup lang="ts">
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"

const props = defineProps<{
  stationId: string,
  reqLoc?: string,
  stationLoc?: string
}>()

const now = new Date().toLocaleString()
const stationId = props.stationId
const reqLoc = props.reqLoc
const stationLoc = props.stationLoc

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
        <a
            :href="`https://www.google.com/maps/place/${reqLoc}/@${reqLoc},12z`"
            class="external"
            target="_blank"
        >
          Your Location
          <FontAwesomeIcon :icon="faArrowUpRightFromSquare"/>
        </a>
      </td>
      <td>
        [
        <RouterLink :to="`/tides/location/${reqLoc}`">{{ reqLoc }}</RouterLink>
        ]
      </td>
    </tr>
    <tr>
      <td>
        <a
            :href="`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${stationId}`"
            class="external"
            target="_blank"
        >
          Station ID
          <FontAwesomeIcon :icon="faArrowUpRightFromSquare"/>
        </a>
      </td>
      <td>
        <RouterLink :to="`/tides/station/${stationId}`">
          {{ stationId }}
        </RouterLink>
        (
        <RouterLink :to="`/stations/id/${stationId}`">Details</RouterLink>
        )
      </td>
    </tr>
    <tr v-if="stationLoc">
      <td>
        <a
            :href="`https://www.google.com/maps/place/${stationLoc}/@${stationLoc},12z`"
            class="external"
            target="_blank"
        >
          Station Location
          <FontAwesomeIcon :icon="faArrowUpRightFromSquare"/>
        </a>
      </td>
      <td>
        [
        <RouterLink :to="`/tides/location/${stationLoc}`">{stationLoc}</RouterLink>
        ]
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
}

.external {
  text-decoration: none;
}

</style>

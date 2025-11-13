<script setup lang="ts">
import { ref } from "vue"
import { DEFAULT_LOCATION, DEFAULT_STATION } from "../lib/constants.ts"
import { router } from "../main.ts"

const station = ref("")
const location = ref("")
const gpsLocation = ref("")

function gotoTidesByStation(id: string) {
  router.push(`/tides/station/${id !== "" ? id : DEFAULT_STATION}`)
}

function gotoTidesByLocation(location: string) {
  router.push(`/tides/location/${location !== "" ? location : DEFAULT_LOCATION}`)
}
</script>

<template>
  <div id="tides-chooser">
    <p>
      <strong> Choose your tides: </strong>
    </p>
    <p>
      &nbsp;Nearby
      <input v-model="gpsLocation" placeholder="Pre-locating..." />
      <button @click="gotoTidesByLocation(gpsLocation)">Go</button>
    </p>
    <p>
      Station
      <input v-model="station" :placeholder="DEFAULT_STATION" />
      <button @click="gotoTidesByStation(station)">Go</button>
    </p>
    <p>
      &nbsp;Coords
      <input v-model="location" :placeholder="DEFAULT_LOCATION" />
      <button @click="gotoTidesByLocation(location)">Go</button>
    </p>
  </div>
</template>

<style scoped></style>

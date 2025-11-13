<script setup lang="ts">
import { ref } from "vue"
import { DEFAULT_LOCATION, DEFAULT_STATION } from "../lib/constants.ts"
import { prelocate } from "../lib/geolocation.ts"
import { router } from "../main.ts"

const gpsLocation = ref("")
const location = ref("")
const station = ref("")

prelocate(gpsLocation)

function gotoTidesById(id: string) {
  router.push(`/tides/id/${id !== "" ? id : DEFAULT_STATION}`)
}

function gotoTidesByLocation(location: string) {
  router.push(`/tides/location/${location !== "" ? location : DEFAULT_LOCATION}`)
}
</script>

<template>
  <div>
    <p>
      <strong>Choose your tides:</strong>
    </p>
    <p>
      &nbsp;Nearby
      <input readonly :placeholder="gpsLocation" @keydown.enter="gotoTidesByLocation(gpsLocation)" />
      <button @click="gotoTidesByLocation(gpsLocation)">Go</button>
    </p>
    <p>
      Station
      <input v-model="station" :placeholder="DEFAULT_STATION" @keydown.enter="gotoTidesById(station)" />
      <button @click="gotoTidesById(station)">Go</button>
    </p>
    <p>
      &nbsp;Coords
      <input v-model="location" :placeholder="DEFAULT_LOCATION" @keydown.enter="gotoTidesByLocation(location)" />
      <button @click="gotoTidesByLocation(location)">Go</button>
    </p>
  </div>
</template>

<style scoped></style>

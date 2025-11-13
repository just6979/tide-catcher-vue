<script setup lang="ts">
import { ref } from "vue"
import { DEFAULT_LOCATION, DEFAULT_STATION } from "../lib/constants.ts"
import { prelocate } from "../lib/geolocation.ts"
import { router } from "../main.ts"

const id = ref("")
const location = ref("")
const gpsLocation = ref("")

prelocate(gpsLocation)

function gotoStationById(id: string) {
  router.push(`/station/id/${id !== "" ? id : DEFAULT_STATION}`)
}

function gotoStationByLocation(location: string) {
  router.push(`/station/location/${location !== "" ? location : DEFAULT_LOCATION}`)
}

function gotoStationsAll() {
  router.push("/station/list")
}
</script>

<template>
  <div>
    <p>
      <strong>Choose your station:</strong>
    </p>
    <p>
      &nbsp;Nearby
      <input :placeholder="gpsLocation" @keydown.enter="gotoStationByLocation(gpsLocation)" />
      <button @click="gotoStationByLocation(gpsLocation)">Go</button>
    </p>
    <p>
      Station
      <input v-model="id" :placeholder="DEFAULT_STATION" @keydown.enter="gotoStationById(id)" />
      <button @click="gotoStationById(id)">Go</button>
    </p>
    <p>
      &nbsp;Coords
      <input v-model="location" :placeholder="DEFAULT_LOCATION" @keydown.enter="gotoStationByLocation(location)" />
      <button @click="gotoStationByLocation(location)">Go</button>
    </p>
    <p>
      All
      <button @click="gotoStationsAll()">Go</button>
    </p>
  </div>
</template>

<style scoped></style>

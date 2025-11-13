<script setup lang="ts">
import { ref } from "vue"
import { DEFAULT_LOCATION, DEFAULT_STATION } from "../lib/constants.ts"
import { router } from "../main.ts"

const station = ref("")
const location = ref("")
const gpsLocation = ref("")

function gotoStationByStation(id: string) {
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
      <strong> Choose your station: </strong>
    </p>
    <p>
      &nbsp;Nearby
      <input v-model="gpsLocation" placeholder="Pre-locating..." @keydown.enter="gotoStationByLocation(gpsLocation)" />
      <button @click="gotoStationByLocation(gpsLocation)">Go</button>
    </p>
    <p>
      Station
      <input v-model="station" :placeholder="DEFAULT_STATION" @keydown.enter="gotoStationByStation(station)" />
      <button @click="gotoStationByStation(station)">Go</button>
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

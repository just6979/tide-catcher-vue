<script setup lang="ts">
import {ref} from "vue"
import {DEFAULT_LOCATION, DEFAULT_STATION} from "../constants.ts"
import {router} from "../main.ts"

const station = ref("")
const location = ref("")
const gpsLocation = ref("")

function gotoStationByStation(id: string) {
  router.push(`/station/${(id !== "" ? id : DEFAULT_STATION)}`)
}

function gotoStationByLocation(location: string) {
  router.push(`/station/location/${(location !== "" ? location : DEFAULT_LOCATION)}`)
}

function gotoStationsAll() {
  router.push("/station/all")
}
</script>

<template>
  <div id="station-chooser">
    <p>
      How would you like
      <br/>
      to get your station?
    </p>
    <p>
      &nbsp;Nearby
      <input v-model="gpsLocation" placeholder="Pre-locating..."/>
      <button @click="gotoStationByLocation(gpsLocation)">Go</button>
    </p>
    <p>
      Station
      <input v-model="station" :placeholder="DEFAULT_STATION"/>
      <button @click="gotoStationByStation(station)">Go</button>
    </p>
    <p>
      &nbsp;Coords
      <input v-model="location" :placeholder="DEFAULT_LOCATION"/>
      <button @click="gotoStationByLocation(location)">Go</button>
    </p>
    <p>
      All
      <button @click="gotoStationsAll()">Go</button>
    </p>
  </div>
</template>

<style scoped>
#station-chooser {
  border-bottom: dotted thin;
}
</style>

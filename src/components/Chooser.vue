<script setup lang="ts">
import {ref} from "vue"
import {DEFAULT_LOCATION, DEFAULT_STATION} from "../constants.ts"
import {router} from "../main.ts"

const station = ref("")
const location = ref("")
const gpsLocation = ref("")

function gotoTidesByStation(id: string) {
  router.push(`/tides/station/${(id !== "" ? id : DEFAULT_STATION)}`)
}

function gotoTidesByLocation(location: string) {
  router.push(`/tides/location/${(location !== "" ? location : DEFAULT_LOCATION)}`)
}

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
  <div id="tides-chooser">
    <p>
      How would you like
      <br/>
      to get your tides?
    </p>
    <p>
      Station:
      <input v-model="station" :placeholder="DEFAULT_STATION"/>
      <button @click="gotoTidesByStation(station)">Go</button>
    </p>
    <p>
      &nbsp;Nearby:
      <input v-model="gpsLocation" placeholder="Pre-locating..."/>
      <button @click="gotoTidesByLocation(gpsLocation)">Go</button>
    </p>
    <p>
      &nbsp;Coords:
      <input v-model="location" :placeholder="DEFAULT_LOCATION"/>
      <button @click="gotoTidesByLocation(location)">Go</button>
    </p>
  </div>
  <div id="station-chooser">
    <p>
      How would you like
      <br/>
      to get your station?
    </p>
    <p>
      Station:
      <input v-model="station" :placeholder="DEFAULT_STATION"/>
      <button @click="gotoStationByStation(station)">Go</button>
    </p>
    <p>
      &nbsp;Nearby:
      <input v-model="gpsLocation" placeholder="Pre-locating..."/>
      <button @click="gotoStationByLocation(gpsLocation)">Go</button>
    </p>
    <p>
      &nbsp;Coords:
      <input v-model="location" :placeholder="DEFAULT_LOCATION"/>
      <button @click="gotoStationByLocation(location)">Go</button>
    </p>
    <p>
      All:
      <button @click="gotoStationsAll()">Go</button>
    </p>
  </div>
</template>

<style scoped>
#tides-chooser {
  border-bottom: dotted thin;
}
</style>

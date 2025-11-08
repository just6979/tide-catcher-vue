<script setup lang="ts">
import {ref} from "vue"
import {DEFAULT_STATION, router} from "../main.ts"

const station = ref("")

function gotoTidesByStation() {
  let stationId = DEFAULT_STATION
  if (station.value !== "") {
    stationId = station.value
  }
  router.push(`/tides/station/${stationId}`)
}

function gotoStationByStation() {
  let stationId = DEFAULT_STATION
  if (station.value !== "") {
    stationId = station.value
  }
  router.push(`/station/${stationId}`)
}
</script>

<template>
  <h2>Chooser</h2>

  <p>
    Tides:
    <input v-model="station" :placeholder="DEFAULT_STATION"/>
    <button @click="gotoTidesByStation()">Go</button>
    <br/>
    Quick Links:
    <br/>
    <RouterLink :to="`/tides/station/${DEFAULT_STATION}`">{{ DEFAULT_STATION }}</RouterLink>
  </p>

  <p>
    Station:
    <input v-model="station" :placeholder="DEFAULT_STATION"/>
    <button @click="gotoStationByStation()">Go</button>
    <br/>
    Quick Links:
    <br/>
    <RouterLink :to="`/station/${DEFAULT_STATION}`">{{ DEFAULT_STATION }}</RouterLink>
  </p>

</template>

<style scoped>
</style>

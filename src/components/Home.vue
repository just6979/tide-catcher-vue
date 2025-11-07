<script setup lang="ts">
import {ref} from 'vue'
import {DEFAULT_STATION, router} from '../main.ts'

const station = ref('')

function goToStation() {
  let stationId = DEFAULT_STATION
  if (station.value !== '') {
    stationId = station.value
  }
  router.push(`/station/${stationId}`)
}</script>

<template>
  <h2>Chooser</h2>

  <p>
    Station:
    <input v-model="station" :placeholder="DEFAULT_STATION" />
    <button @click="goToStation()">Go</button>
  </p>

  <p>
    Quick Links:
    <br/>
    <RouterLink :to="`/station/${DEFAULT_STATION}`">{{ DEFAULT_STATION }}</RouterLink>
  </p>

</template>

<style scoped>
</style>

<script setup lang="ts">
import {ref} from "vue"
import {useRoute} from "vue-router"
import {DEFAULT_STATION} from "../constants.ts"
import type {NoaaError, NoaaTidePrediction, NoaaTidesResponse} from "../types.ts"

const route = useRoute()
const loading = ref(true)
const error = ref<string>()
const tides = ref<NoaaTidePrediction[]>()

const stationId = route.params.id?.toString() || DEFAULT_STATION

fetchTides(stationId)

function fetchTides(stationId: string) {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const beginDate = encodeURI(`${now.getFullYear()}${month}${day} ${hours}:${minutes}`)
  const url = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?` +
      `&product=predictions&units=english&format=json` +
      `&datum=MLLW&interval=hilo&station=${stationId}` +
      `&time_zone=lst_ldt&begin_date=${beginDate}&range=72`

  fetch(url).then((res) => {
    res.json().then((data: NoaaTidesResponse | NoaaError) => {
      if (!("error" in data)) {
        tides.value = data.predictions
      } else {
        console.log(`Message: ${data.error.message}`)
        console.log(`URL: ${url}`)
        error.value = data.error.message
      }
      loading.value = false
    }).catch((err: Error) => {
      let msg = `JSON Error: ${err}`
      console.log(msg)
      error.value = msg
      loading.value = false
    })
  }).catch((err: any) => {
    let msg = `Fetch Error: ${err.toString()}`
    console.log(msg)
    error.value = msg
    loading.value = false
  })
}
</script>

<template>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else-if="error">
    <p>{{ error }}</p>
  </div>
  <div v-else-if="tides">
    <h2>Station {{ stationId }}</h2>
    <table>
      <tr v-for="item in tides">
        <td>{{ item.t }}</td>
        <td>{{ item.type == "H" ? "High" : "Low" }}</td>
        <td>{{ item.v }}</td>
      </tr>
    </table>
  </div>
  <div v-else>
    <p>No Tides found for {{ stationId }}.</p>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}

table {
  width: 100%;
  margin: 0;
  border-collapse: collapse;
  border-color: #666666;
  border-width: thin;
}

tr {
  border-width: thin;
  border-color: inherit;
  border-style: solid;
}

tr :first-child {
  width: 50%;
  border-width: thin;
  border-color: inherit;
  border-right-style: dotted;
}
</style>

<script setup lang="ts">
import {ref} from "vue"
import {useRoute} from "vue-router"
import {DEFAULT_STATION} from "../main.ts"
import type {NoaaTidePrediction} from "../types.ts"

const route = useRoute()
const stationId = ref(DEFAULT_STATION)
const loading = ref(true)
const tides = ref<NoaaTidePrediction[]>([])
const error = ref("")

stationId.value = route.params.id?.toString() || DEFAULT_STATION

const now = new Date()
const month = String(now.getMonth() + 1).padStart(2, "0")
const day = String(now.getDate()).padStart(2, "0")
const hours = String(now.getHours()).padStart(2, "0")
const minutes = String(now.getMinutes()).padStart(2, "0")
const beginDate = encodeURI(`${now.getFullYear()}${month}${day} ${hours}:${minutes}`)
const url = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?` +
    `&product=predictions&units=english&format=json` +
    `&datum=MLLW&interval=hilo&station=${stationId.value}` +
    `&time_zone=lst_ldt&begin_date=${beginDate}&range=72`

try {
  fetch(url).then((res) => res.json().then((data: any) => {
    if ("error" in data) {
      console.log(`Message: ${data["error"]["message"]}`)
      console.log(`URL: ${url}`)
      error.value = data["error"]["message"]
    } else {
      tides.value = data["predictions"]
    }

  }))
} catch (err: any) {
  console.log(`Error: ${err.toString()}`)
  console.log(`URL: ${url}`)
  error.value = err.toString()
} finally {
  loading.value = false
}
</script>

<template>
  <div>
    <h2>Station {{ stationId }}</h2>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <table v-else>
      <tr v-for="item in tides">
        <td>{{ item.t }}</td>
        <td>{{ item.type == "H" ? "High" : "Low" }}</td>
        <td>{{ item.v }}</td>
      </tr>
    </table>
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

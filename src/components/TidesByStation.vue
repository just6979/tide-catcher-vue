<script setup lang="ts">
import {subHours} from "date-fns"
import {ref} from "vue"
import {useRoute} from "vue-router"
import {DEFAULT_STATION} from "../constants.ts"
import type {NoaaError, NoaaTidePrediction, NoaaTidesResponse} from "../types.ts"
import RequestTable from "./RequestTable.vue"
import TideRow from "./TideRow.vue"

const route = useRoute()
const loading = ref(true)
const error = ref<string>()
const tides = ref<NoaaTidePrediction[]>()

const stationId = route.params.id?.toString() || DEFAULT_STATION

fetchTides(stationId)

function fetchTides(stationId: string) {
  const backdateHours = 7
  const reqDate = subHours(new Date(), backdateHours)

  const month = String(reqDate.getMonth() + 1).padStart(2, "0")
  const day = String(reqDate.getDate()).padStart(2, "0")
  const hours = String(reqDate.getHours()).padStart(2, "0")
  const minutes = String(reqDate.getMinutes()).padStart(2, "0")

  const beginDate = encodeURI(`${reqDate.getFullYear()}${month}${day} ${hours}:${minutes}`)
  const range = (48 + backdateHours).toString()
  const url = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?` +
      `&product=predictions&units=english&format=json` +
      `&datum=MLLW&interval=hilo&station=${stationId}` +
      `&time_zone=lst_ldt&begin_date=${beginDate}&range=${range}`

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
      const msg = `JSON Error: ${err}`
      console.log(msg)
      error.value = msg
      loading.value = false
    })
  }).catch((err) => {
    const msg = `Fetch Error: ${err.toString()}`
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
    <table id="tides">
      <caption>Station {{ stationId }}</caption>
      <tbody>
      <TideRow v-for="tide in tides" :key="tide.t" :tide="tide"/>
      </tbody>
    </table>
    <RequestTable :station-id="stationId"/>
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
}

caption {
  padding: 0.5em;
}

tbody > .future {
  font-weight: bold;
  filter: saturate(150%);
}

tbody > .future ~ .future {
  font-weight: normal;
  filter: none;
}

.prior {
  font-size: 66%;
  filter: contrast(50%) saturate(50%) blur(0.5px);
}

.high {
  background-color: var(--high-row-bg);
}

.low {
  background-color: var(--low-row-bg);
}

</style>

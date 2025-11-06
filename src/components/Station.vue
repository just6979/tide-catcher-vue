<script setup lang="ts">
import {ref} from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const loading = ref(false)
const tides = ref('')
const error = ref(null)

fetchData(route.params.id)

async function fetchData(id?: string | string[]): Promise<void> {
  error.value = null
  tides.value = ''
  loading.value = true

  if (!id || id.length < 1) {
    id = '8441241'
  }

  try {
    // replace `getPost` with your data fetching util / API wrapper
    tides.value = await getTides(id)
  } catch (err: any) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}

async function getTides(id: string) {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  const beginDate = encodeURI(`${now.getFullYear()}${month}${day} ${hours}:${minutes}`)
  const url = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?` +
      `&product=predictions&units=english&format=json` +
      `&datum=MLLW&interval=hilo&station=${id}` +
      `&time_zone=lst_ldt&begin_date=${beginDate}&range=72`
  console.log(url)
  const response = await fetch(url)
  const data = await response.json()
  return data.predictions
}
</script>

<template>
  <div>
    <h2>Station {{ id }}</h2>

    <p v-if="loading">Loading...</p>
    <table>
      <tr v-for="item in tides">
        <td>{{ item.t }}</td>
        <td>{{ item.type == 'H' ? 'High' : 'Low' }}</td>
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

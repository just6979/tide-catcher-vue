<script setup lang="ts">
import type { NoaaTidePrediction, NoaaTidePredStation } from "../lib/types.ts"
import RequestInfoTable from "./RequestInfoTable.vue"
import TidesRow from "./TidesRow.vue"

const props = defineProps<{
  station: NoaaTidePredStation
  tides: NoaaTidePrediction[]
}>()

const station = props.station
const tides = props.tides
</script>

<template>
  <div>
    <table id="tides">
      <caption>
        {{ station.stationName }}
      </caption>
      <tbody>
        <TidesRow v-for="tide in tides" :key="tide.t" :tide="tide" />
      </tbody>
    </table>
    <RequestInfoTable :station="station" />
  </div>
</template>

<style scoped>
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
  filter: contrast(50%) saturate(50%) blur(1px);
}

.high {
  background-color: var(--high-row-bg);
}

.low {
  background-color: var(--low-row-bg);
}

</style>

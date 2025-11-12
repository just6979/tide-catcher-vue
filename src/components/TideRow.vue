<script setup lang="ts">
import {WEEKDAYS} from "../constants.ts"
import type {NoaaTidePrediction} from "../types.ts"

const props = defineProps<{
  tide: NoaaTidePrediction
}>()

const nowDate = new Date()
const tideDate = new Date(props.tide.t)
const tideType = props.tide.type === "H" ? "high" : "low"

const arrow: string = tideType === "high" ? "⤴" : "⤵"
const prior = tideDate < nowDate ? "prior" : "future"
const time = `${tideDate.getHours().toString().padStart(2, "0")}:${tideDate.getMinutes().toString().padStart(2, "0")}`
const day = WEEKDAYS[tideDate.getDay()]
const date = `${(tideDate.getMonth() + 1).toString().padStart(2, "0")}/${tideDate.getDate().toString().padStart(2, "0")}`
</script>

<template>
  <tr :class="`${prior} ${tideType}`">
    <td>
      {{ arrow }} {{ tideType.toUpperCase().padEnd(4, "\u00A0") }}
    </td>
    <td class="time">{{ time }}</td>
    <td class="day">{{ day }}</td>
    <td class="date">{{ date }}</td>
  </tr>

</template>

<style scoped>
td {
  padding: 0.5em;
}

</style>

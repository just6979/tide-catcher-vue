<script setup lang="ts">
import {ref} from 'vue'
import {router} from '../main.ts'

const station = ref("")
</script>

<template>
  <h2>Chooser</h2>

  <p>
    Station:
    <input v-model="station" placeholder="8441241"/>
    <button @click="router.push(`/station/${station}`)">Go</button>
  </p>

  <p>
    Quick Links:
    <br/>
    <RouterLink to="/station/8441241">Plum Island South (8441241)</RouterLink>
  </p>

</template>

<style scoped>
</style>

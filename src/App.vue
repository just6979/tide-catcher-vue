<script setup lang="ts">
import {RouterView} from "vue-router"
</script>

<template>
  <header>
    <RouterLink to="/">
      <img src="/images/wave_left_64.png" alt="WaveLeft" />
      <h1>Tide Catcher</h1>
    </RouterLink>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    &nbsp;
    <RouterLink to="/about">About</RouterLink>
  </nav>
  </header>
  <RouterView></RouterView>
</template>

<style scoped>
a {
  text-decoration: none;
}

nav {
  border-bottom: thin dotted;
  padding: 1.5em;
}

nav a {
  border: thin solid;
  padding: 0.5em 1em
}
</style>

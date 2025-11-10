<script setup lang="ts">
import {RouterView} from "vue-router"
</script>

<template>
  <header>
    <a id="title" href="/">
      <img src="/images/wave_left_48.png" alt="WaveLeft"/>
      <h1>Tide Catcher</h1>
    </a>
  </header>

  <main>
    <Suspense>
      <RouterView></RouterView>
    </Suspense>
  </main>

  <footer>
    <nav>
      <RouterLink to="/tides">
        <button>Tides</button>
      </RouterLink>
      <RouterLink to="/stations">
        <button>Stations</button>
      </RouterLink>
      <RouterLink to="/about">
        <button>About</button>
      </RouterLink>
    </nav>
    <p>(C) 2025 Justin White</p>
  </footer>
</template>

<style scoped>
header {
  margin: auto;
  padding-bottom: 0.25em;
  border-bottom: dotted thin;
}

header a {
  text-decoration: none;
}

header h1 {
  font-family: "Trade Winds", monospace;
  font-weight: 400;
  font-style: normal;
  margin: 0;
}

nav {
  padding: 0.5em;
}

nav button {
  padding: 0.25em 1em;
  border: dotted thin;
}

.active-route button {
  border: solid thin;
}

footer {
  border-top: dotted thin;
}
</style>

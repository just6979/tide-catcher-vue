<script setup lang="ts">
import {RouterView} from "vue-router"
</script>

<template>
  <header>
    <a href="/">
      <img src="/images/wave_left_64.png" alt="WaveLeft"/>
      <h1>Tide Catcher</h1>
    </a>
    <nav>
      <RouterLink to="/">
        <button>Home</button>
      </RouterLink>
      &nbsp;
      <RouterLink to="/about">
        <button>About</button>
      </RouterLink>
    </nav>
  </header>

  <Suspense>
    <RouterView></RouterView>
  </Suspense>

  <footer>
    <p>(C) 2025 Justin White</p>
  </footer>
</template>

<style scoped>
header {
  margin: auto;
  padding: 0;
  border-bottom: dotted thin;
}

img {
  margin: 0;
  padding: 0;
}

h1 {
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

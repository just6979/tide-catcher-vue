<script setup lang="ts">
import {RouterView} from "vue-router"
</script>

<template>
  <header>
    <a id="title" href="/">
      <img src="/images/wave_left_48.png" alt="WaveLeft"/>
      <h1>Tide Catcher</h1>
      <nav>
        <RouterLink to="/tides">Tides</RouterLink>
        <RouterLink to="/stations">Stations</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </a>
  </header>

  <main>
    <Suspense>
      <RouterView></RouterView>
    </Suspense>
  </main>

  <footer>
    <p>&copy; 2025 <a href="http://justinwhite.net">Justin White</a></p>
  </footer>
</template>

<style scoped>
header {
  margin: auto;
  padding-bottom: 0.5em;
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

footer {
  border-top: dotted thin;
}

nav {
  font-size: 75%;
  padding: 1em;
}

nav a {
  color: white;
  background: buttonface;
  text-decoration: none;
  padding: 0.25em 1em;
  border: solid thin buttonface;
}

nav a:hover {
  filter: brightness(125%);
  border: dotted thin;
}

.router-link-active {
  font-weight: bold;
  border: solid thin;
}

footer p {
  font-size: 75%;

}
</style>

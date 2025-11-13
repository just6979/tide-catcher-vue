<script setup lang="ts">
import { RouterView } from "vue-router"
</script>

<template>
  <header>
    <RouterLink id="title" to="/">
      <img src="/images/wave-line-icon-192.png" alt="Wave Icon" width="64" height="64" />
      <h1>Tide Catcher</h1>
    </RouterLink>
    <nav>
      <RouterLink to="/tides">Tides</RouterLink>
      <RouterLink to="/station">Stations</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <main>
    <Suspense>
      <RouterView></RouterView>
    </Suspense>
  </main>

  <footer>
    <p>&copy; 2025 <a href="https://www.justinwhite.net">Justin White</a></p>
  </footer>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
header {
  color: #29b7ef;
  margin: auto;
  padding-bottom: 0.5em;
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

main {
  border-top: dotted thin;
  border-bottom: dotted thin;
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

#title {
  font-weight: normal;
  border: none;
}

footer p {
  font-size: 75%;
}
</style>

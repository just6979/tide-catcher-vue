<script setup lang="ts">
</script>

<template>
  <div id="about">
    <h2>About</h2>
    <div id="who-what-why">
      <ul>
        <li>
          Created by
          <a href="mailto:jw@justinwhite.net">Justin White</a>
          (C) 2025
        </li>
        <li>
          Tide data retrieved from
          <a href="https://tidesandcurrents.noaa.gov" target="_blank">NOAA Tides & Currents</a>
        </li>
        <li>
          Built with
          <a href="https://vuejs.org" target="_blank">Vue</a>
          +
          <a href="https://vite.dev" target="_blank">Vite</a>
        </li>
        <li>
          <a href="https://github.com/just6979/tide-catcher-vue" target="_blank">Open-source</a>,
          hosted on
          <a href="https://github.com/" target="_blank">Github</a>
        </li>
        <li>
          Privacy: We don&#39;t record or save anything. Your location might
          end up in a request log, since you are sending it to us, but those
          log are ephemeral and currently only retained for 1 day.
        </li>
      </ul>
    </div>

    <div id="coming-soon">
      <h3>Coming Soon</h3>
      <ul>
        <li>
          Cache recently used stations and tide data to minimize external
          data requests
        </li>
        <li>
          Offline mode: pull 7 days of data at a time, will only need
          internet when that data is stale.
        </li>
        <li>
          Favorite stations: Keep a list of nearby stations instead of
          relying on GPS data.
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#about {
  font-size: 75%;
}

ul {
  text-align: start;
}

#coming-soon {
  border-top: dotted thin;
}

#coming-soon .todo-done {
  text-decoration: line-through;
}


</style>

# What

Web app to quickly display upcoming high & low tide data from nearest NOAA tide stations.

- Built with Vite + Vue on (deployment env TBD).
- An SPA (Single Page App) reproduction
  of https://github.com/just6979/tide-catcher-next / https://tide-catcher.justinwhite.net

# Where

Deployment TBD, perhaps directly from my site at [NearlyFreeSpeech.net](https://www.nearlyfreespeech.net)

# How

- Vue.js + Vite SPA
- Client-side fetching of tide info directly from
  [NOAA Tides & Currents](https://tidesandcurrents.noaa.gov/web_services_info.html) APIs.

## TODO

- Cache (client-side) recently used stations and tide data to minimize external data requests.
- Offline mode: pull 7 days of data at a time, will only need internet when that data is stale.
- Favorite stations: Keep a list of nearby stations.

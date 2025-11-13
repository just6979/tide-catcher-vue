import type { Ref } from "vue"
import { DEFAULT_TIDEPRED_RADIUS } from "./constants.ts"
import type { NoaaCoOpsResponse, NoaaError, NoaaTidePredResponse, NoaaTidePredStation } from "./types.ts"

export function fetchCoOpsStation(
  stationId: string,
  location: Ref<[number, number] | undefined>,
  error: Ref<string | undefined>,
) {
  console.log(`Fetching location details for Station ID ${stationId}.`)
  const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${stationId}.json`
  fetch(url)
    .then((res) => {
      res.json().then((data: NoaaCoOpsResponse | NoaaError) => {
        if (!("error" in data)) {
          const coOpsStation = data.stations[0]
          if (coOpsStation) {
            location.value = [coOpsStation.lat, coOpsStation.lng]
          }
        } else {
          console.log(`Message: ${data["error"]["message"]}`)
          console.log(`URL: ${url}`)
          error.value = data["error"]["message"]
        }
      })
    })
    .catch((err: Error) => {
      const msg = `JSON Error: ${err}`
      console.log(msg)
      error.value = msg
    })
    .catch((err) => {
      const msg = `Fetch Error: ${err.toString()}`
      console.log(msg)
      error.value = msg
    })
}

export function fetchTidePredStation(
  location: [number, number],
  error: Ref<string | undefined>,
  station: Ref<NoaaTidePredStation | undefined>,
  radius = DEFAULT_TIDEPRED_RADIUS,
) {
  console.log(`Fetching Station details for ${location}.`)
  const url =
    `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json` +
    `?lat=${location[0]}&lon=${location[1]}&radius=${radius}`
  fetch(url)
    .then((res) => {
      res
        .json()
        .then((data: NoaaTidePredResponse | NoaaError) => {
          if (!("error" in data)) {
            station.value = data["stationList"][0]
          } else {
            console.log(`Message: ${data["error"]["message"]}`)
            console.log(`URL: ${url}`)
            error.value = data["error"]["message"]
          }
        })
        .catch((err: Error) => {
          const msg = `JSON Error: ${err}`
          console.log(msg)
          error.value = msg
        })
    })
    .catch((err) => {
      const msg = `Fetch Error: ${err.toString()}`
      console.log(msg)
      error.value = msg
    })
}

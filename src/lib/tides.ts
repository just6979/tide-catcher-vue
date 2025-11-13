import { subHours } from "date-fns"
import type { Ref } from "vue"
import type { NoaaError, NoaaTidePrediction, NoaaTidePredStation, NoaaTidesResponse } from "./types.ts"

export function fetchTides(
  station: NoaaTidePredStation,
  error: Ref<string | undefined>,
  tides: Ref<NoaaTidePrediction[] | undefined>,
) {
  console.log(`Fetching tides for Station ID ${station.stationId}.`)
  const backdateHours = 7
  const reqDate = subHours(new Date(), backdateHours)

  const month = String(reqDate.getMonth() + 1).padStart(2, "0")
  const day = String(reqDate.getDate()).padStart(2, "0")
  const hours = String(reqDate.getHours()).padStart(2, "0")
  const minutes = String(reqDate.getMinutes()).padStart(2, "0")

  const beginDate = encodeURI(`${reqDate.getFullYear()}${month}${day} ${hours}:${minutes}`)
  const range = (48 + backdateHours).toString()
  const url =
    `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?` +
    `&product=predictions&units=english&format=json` +
    `&datum=MLLW&interval=hilo&station=${station.stationId}` +
    `&time_zone=lst_ldt&begin_date=${beginDate}&range=${range}`

  fetch(url)
    .then((res) => {
      res
        .json()
        .then((data: NoaaTidesResponse | NoaaError) => {
          if (!("error" in data)) {
            tides.value = data.predictions
          } else {
            console.log(`Message: ${data.error.message}`)
            console.log(`URL: ${url}`)
            error.value = data.error.message
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

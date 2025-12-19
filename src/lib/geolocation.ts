import type { Ref } from "vue"
import { GEOLOCATION_ERRORS, GEOLOCATION_OPTIONS } from "./constants.ts"

export function geolocate(location: Ref<string>) {
  console.log("Geolocating...")
  navigator.geolocation.getCurrentPosition(
    (position) => {
      location.value = `${position.coords.latitude.toFixed(3)},${position.coords.longitude.toFixed(3)}`
      console.log(`Geolocated: [${location.value}].`)
    },
    (err) => {
      console.warn(`error getting location: ${GEOLOCATION_ERRORS[err.code]}`)
      location.value = GEOLOCATION_ERRORS[err.code] || err.message
    },
    GEOLOCATION_OPTIONS,
  )
}

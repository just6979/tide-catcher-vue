import type { Ref } from "vue"
import { GEOLOCATION_ERRORS, GEOLOCATION_OPTIONS } from "./constants.ts"

export function prelocate(location: Ref<string>) {
  navigator.permissions
    .query({ name: "geolocation" })
    .then((perm) => {
      if (perm.state === "granted") {
        location.value = "Pre-locating..."
        geolocate(location)
      } else if (perm.state === "prompt") {
        location.value = "Can't pre-locate. Hit Go!"
      }
    })
    .catch((reason) => {
      location.value = "GPS not supported."
      console.log(reason)
    })
}

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

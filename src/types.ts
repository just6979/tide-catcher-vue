export interface NoaaError {
  error: {
    message: string;
  }
}

export interface NoaaTidePredStation {
  stationId: string
  stationName: string
  lat: number
  lon: number
  commonName: string
  stationFullName: string
  etidesStnName: string
  state: string
  region: string
  timeZoneCorr: string
  distance: number
}

export interface NoaaTidePredResponse {
  stationList: NoaaTidePredStation[]
}

export interface NoaaCoOpsStation {
  id: string
  lat: number
  lng: number
  name: string
  state: string
  timezonecorr: number
}

export interface NoaaTidePrediction {
  t: string
  v: string
  type: string
}

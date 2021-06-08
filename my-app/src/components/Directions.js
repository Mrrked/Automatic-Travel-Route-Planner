import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { useEffect, useState } from "react";


export default function Directions({ matrix, route, travelMode, waypoints=[] }){
  const [fetchDirections, setFetchDirections] = useState(false)
  const [response, setResponse] = useState(null)

  useEffect(_ => {
    if (!matrix) return

    setFetchDirections(true)
  }, [matrix])

  return route && <>
      {fetchDirections && <DirectionsService 
        options={{
          origin: route?.[0].value,
          destination: route?.[route.length - 1].value,
          waypoints: route?.filter((loc, index) => index > 0 && index < route.length - 1)
            .map(loc => {
              return { location: loc.value }
            }),
          travelMode,
        }}
        callback={resp => {
          if (resp !== null){
            if (resp.status === "OK") {
              setResponse(resp)
              setFetchDirections(false)
            }
          }
        }}
      />}
      {response && <DirectionsRenderer 
        options={{
          directions: response
        }}
      />}
  </>
}
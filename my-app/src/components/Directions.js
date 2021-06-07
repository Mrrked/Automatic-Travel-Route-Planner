import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { useState } from "react";


export default function Directions({ fetchDirections=false, destination, origin, travelMode, waypoints=[] }){
    const [response, setResponse] = useState(null)
    return <>
        <DirectionsService 
          options={{
            destination,
            origin,
            travelMode,
            waypoints
          }}
          callback={resp => {
            if (resp !== null){
              if (resp.status === "OK") setResponse(resp)
            }
          }}
        />
        {response && <DirectionsRenderer 
          options={{
            directions: response
          }}
        />}
    </>
}
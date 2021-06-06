import { useState } from "react";
import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import {
  Box,
  Toolbar, 
} from "@material-ui/core"
import Header from "components/Header"

// eslint-disable-next-line
const activated = "AIzaSyDPCx-DR57YVb-1pYfEwi9EsvWUqLWMKmA"
// eslint-disable-next-line
const dummy = "AIzaSyDr-Sb2ICpI-9HRANMJBLIOEAzAHNNWjbk"

const center = {
  lat: 14.599513,
  lng: 120.984222
};

export default function App() {
  const [map, setMap] = useState(null)
  const [response, setResponse] = useState(null)

  const onLoad = map => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }

  const onUnmount = _ =>{
    setMap(null)
  }

  return <div style={{ height: "100%", display: "flex", flexDirection: "column"}}>
    <Header />
    <Toolbar/>
    <LoadScript
      googleMapsApiKey={activated}
    >
       <GoogleMap
        mapContainerStyle={{ flexGrow: 1 }}
        center={center}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* <Marker
          position={{
            lat: 14.599513,
            lng: 120.984222
          }}
          title="This is a marker"
        />
        <Polyline 
          path={[
            {
              lat: 14.599513,
              lng: 120.984222
            },
            {
              lat: 15,
              lng: 120.984222
            },
          ]}
          options={{
            strokeColor: "red"
          }}
        /> */}
        <DirectionsService 
          options={{
            destination: {
              lat: 14.599513,
              lng: 120.984222
            },
            origin: {
              lat: 15,
              lng: 120.984222
            },
            travelMode: "DRIVING"
          }}
          callback={resp => {
            console.log(resp)
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
      </GoogleMap>
    </LoadScript>
    
  </div>
}
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  float: 'right',
  width: '1000px',
  height: '600px'
};

const center = {
  lat: 14.599513,
  lng: 120.984222
};

function MyComponent() {


















  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDr-Sb2ICpI-9HRANMJBLIOEAzAHNNWjbk" //AIzaSyDPCx-DR57YVb-1pYfEwi9EsvWUqLWMKmA
  })                                                            //AIzaSyDr-Sb2ICpI-9HRANMJBLIOEAzAHNNWjbk

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)
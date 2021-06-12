import { useEffect, useState } from "react"
import { DistanceMatrixService, GoogleMap, Marker } from "@react-google-maps/api";
import { getValidLocations } from "utils";
import Directions from "components/Directions";
import Geocode from "react-geocode"

Geocode.setApiKey("AIzaSyDPCx-DR57YVb-1pYfEwi9EsvWUqLWMKmA")

export default function Map({ handleAddLocation, setNotification, mapContainerStyle, locations, matrix, setMatrix, route, fetchDistance, setFetchDistance }){
    const [map, setMap] = useState(null)
    const [center, setCenter] = useState({
        lat: 14.599513,
        lng: 120.984222
    })

    const validLocations = getValidLocations(locations)

    useEffect(_ => {
        if (validLocations.length === 0) return
        if (validLocations.length === 1) return setCenter(validLocations[0].value)

        const bounds = new window.google.maps.LatLngBounds()

        validLocations.forEach(loc => {
            bounds.extend(loc.value)
        })
    
        map?.fitBounds(bounds)

    }, [validLocations, map])

    return <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={11}
        onLoad={map => setMap(map) }
        onRightClick={async e => {
            const response = await Geocode.fromLatLng(String(e.latLng.lat()), String(e.latLng.lng()))
            if (response.status !== "OK") return console.log("not found")

            const result = response.results[0]

            handleAddLocation({
                value: result.geometry.location,
                address: result.formatted_address
            })
        }}
    >
        {!route && locations.map((location, index) =>
        location.value && 
        <Marker 
            key={location.id}
            position={location.value}
            label={index === 0 ? "S" : `${index}`}
        />
        )}
        <Directions 
            matrix={matrix}
            route={route}
            validLocations={validLocations}
            travelMode="DRIVING"
        />
        {fetchDistance && 
        <DistanceMatrixService
            key="distance_matrix" 
            options={{
                    travelMode: "DRIVING",
                    origins: validLocations.map(loc => loc.value),
                    destinations: validLocations.map(loc => loc.value),
                }}
            callback={resp => {
                setFetchDistance(false)   
                if (!resp) return setNotification({text: "Something went wrong.", severity: "error"})
                if (resp.rows.some(row => row.elements.some(element => element.status !== "OK" )))
                    return setNotification({text: "Unreachable location.", severity: "error"})
                setMatrix(resp.rows.map(row =>
                    row.elements.map(element => element.duration.value)
                ))
            }}
        />}
    </GoogleMap>
}
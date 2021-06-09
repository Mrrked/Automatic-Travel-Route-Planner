import { useEffect, useState } from "react"
import { DistanceMatrixService, GoogleMap, Marker } from "@react-google-maps/api";
import { getValidLocations } from "utils";
import Directions from "components/Directions";

export default function Map({ setError, mapContainerStyle, locations, matrix, setMatrix, route, fetchDistance, setFetchDistance }){
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
            travelMode="DRIVING"
        />
        {fetchDistance && 
        <DistanceMatrixService
            key="distance_matrix" 
            options={{
                origins: validLocations.map(loc => loc.value),
                destinations: validLocations.map(loc => loc.value),
                travelMode: "DRIVING"
            }}
            callback={resp => {
                setFetchDistance(false)   

                if (resp.rows.some(row => row.elements.some(element => element.status !== "OK" )))
                    return setError("Unreachable location.")

                setMatrix(resp.rows.map(row =>
                    row.elements.map(element => element.distance.value)
                ))

                setError("")
            }}
        />}
    </GoogleMap>
}
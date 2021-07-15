import { useContext, useEffect, useState } from "react"
import { DistanceMatrixService, GoogleMap } from "@react-google-maps/api";
import Directions from "components/Directions";
import Geocode from "react-geocode"
import { MainContext } from "providers/Main";
import Markers from "./Markers";
import Graph from "./Graph";

Geocode.setApiKey("AIzaSyDPCx-DR57YVb-1pYfEwi9EsvWUqLWMKmA")

export default function Map({ mapContainerStyle }){
    const { 
        handleAddLocation, 
        setNotification, 
        locations, 
        matrix, 
        route,
        validLocations,
        shouldGetMatrix, setShouldGetMatrix,
        setMatrix,
        setIsLoading,
        mapView
    } = useContext(MainContext)
    const [map, setMap] = useState(null)
    const [center, setCenter] = useState({
        lat: 14.599513,
        lng: 120.984222
    })
    const [fetchDistance, setFetchDistance] = useState(false)
    const [origin, setOrigin] = useState(0)

    const interval = Math.floor(100 / validLocations.length)

    const [tempMatrix, setTempMatrix] = useState([])

    useEffect(_ => {
        if (tempMatrix.length > 0 && tempMatrix.length === validLocations.length){
            setMatrix(tempMatrix)
            setTempMatrix([])
            setOrigin(0)
        }
        // eslint-disable-next-line
    }, [tempMatrix])
    
    useEffect(_ => {
        if (shouldGetMatrix) {
            setFetchDistance(true)
            setTempMatrix([])
        }
    }, [shouldGetMatrix])

    useEffect(_ => {
        if (!fetchDistance && tempMatrix.length < validLocations.length)
            setTimeout(_ => setFetchDistance(true), 5000)
        // eslint-disable-next-line
    }, [fetchDistance])

    // useEffect(_ => {
    //     if (validLocations.length === 0) return
    //     if (validLocations.length === 1) return setCenter(validLocations[0].value)

    //     const bounds = new window.google.maps.LatLngBounds()

    //     validLocations.forEach(loc => {
    //         bounds.extend(loc.value)
    //     })
    
    //     map?.fitBounds(bounds)

    // }, [validLocations, map])

    return <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={11}
        options={{
            // maxZoom: 5,
            minZoom: 11
        }}
        onLoad={map => {
            setMap(map)
        }}
        onRightClick={async e => {
            const response = await Geocode.fromLatLng(String(e.latLng.lat()), String(e.latLng.lng()))
            if (response.status !== "OK") return console.log("not found")

            const result = response.results[0]

            handleAddLocation({
                value: result.geometry.location,
                address: result.formatted_address,
            })
        }}
    >
        {!route && <Markers locations={locations} />}
        {route && mapView === "GRAPH" && <Graph />}
        {/* {!route && locations.map((location, index) =>
        location.value && 
        <Marker 
            key={location.id}
            position={location.value}
            label={index === 0 ? "S" : `${index}`}
        />
        )} */}
        <Directions 
            display={mapView === "ROUTE"}
            matrix={matrix}
            route={route}
            validLocations={validLocations}
            travelMode="DRIVING"
        />
        {shouldGetMatrix && fetchDistance &&
        <DistanceMatrixService
            key="distance_matrix" 
            options={{
                    travelMode: "DRIVING",
                    origins: validLocations.slice(origin, origin + interval).map(loc => loc.value),
                    destinations: validLocations.map(loc => loc.value)
                }}
            callback={(resp, status) => {
                setFetchDistance(false)   
                console.log("Status: ", status)
                if (!resp) return
                
                if (resp.rows.some(row => row.elements.some(element => element.status !== "OK" ))){
                    setShouldGetMatrix(false)
                    setTempMatrix([])
                    setIsLoading(false)
                    return setNotification({text: "Unreachable location.", severity: "error"})
                }

                console.log(resp)

                // const newData = [
                //     ...tempMatrix,
                //     ...resp.rows.map(row =>
                //         row.elements.map(element => {
                //             return {
                //                 duration: element.duration.value,
                //                 distance: element.distance.value
                //             }
                //         })
                //     )
                // ]

                const newOrigin = origin + interval
                // console.log(newData)

                setTempMatrix(old => [
                    ...old,
                    ...resp.rows.map(row =>
                        row.elements.map(element => {
                            return {
                                duration: element.duration.value,
                                distance: element.distance.value
                            }
                        })
                    )
                ])
                setOrigin(newOrigin)
                
                if (newOrigin > validLocations.length) setShouldGetMatrix(false)
            }}
        />}
    </GoogleMap>
}
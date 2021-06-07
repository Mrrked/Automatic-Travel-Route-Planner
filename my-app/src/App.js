import { useEffect, useState } from "react";
import { DistanceMatrixService, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Toolbar, 
} from "@material-ui/core"
import {
  Add as AddIcon,
  Clear as ClearIcon,
} from "@material-ui/icons"
import Header from "components/Header"
import Directions from "components/Directions";
import AutocompleteField from "components/AutocompleteField";
import { v4 as uuid } from "uuid"
import { libraries } from "config"

// eslint-disable-next-line
const activated = "AIzaSyDPCx-DR57YVb-1pYfEwi9EsvWUqLWMKmA"
// eslint-disable-next-line
const dummy = "AIzaSyDr-Sb2ICpI-9HRANMJBLIOEAzAHNNWjbk"

const center = {
  lat: 14.599513,
  lng: 120.984222
};


export default function App() {
  const [locations, setLocations] = useState([{ id: uuid() }, { id: uuid() } ])
  const [directions, setDirections] = useState(null)
  const [fetchDistance, setFetchDistance] = useState(false)
  const [matrix, setMatrix] = useState(null)
  const [route, setRoute] = useState(null)

  const locs = locations.filter(loc => loc.value)

  useEffect(_ => {
    if (!matrix) return

    setLocations(locs)
    
    const newRoute = locs // insert algorithm

    setRoute(newRoute)

    setDirections(
      <Directions 
        origin={newRoute[0].value}
        destination={newRoute[newRoute.length - 1].value}
        waypoints={newRoute.filter((loc, index) => index > 0 && index < newRoute.length - 1)
        .map(loc => {
          return { location: loc.value }
        })
        }
        travelMode="DRIVING"
      />
    )
    // eslint-disable-next-line
  }, [matrix])

  
  const handleGenerateRoute = () => setFetchDistance(true)

  return <div style={{ height: "100%", display: "flex", flexDirection: "column"}}>
    <Header />
    <Toolbar/>
    <Box display="flex" height="100%">
      <LoadScript
        googleMapsApiKey={activated}
        libraries={libraries}
      >
        <Box p={3} width={300} alignSelf="stretch" variant="outlined" component={Paper}>
          {locations.map((location, index) => 
          <Box
            key={location.id}
            mb={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box width={250} mr={1}>
              <AutocompleteField
                label={index === 0 ? "Start" : `Destination ${index}`}
                onPlaceChanged={newLoc => setLocations(old => {
                  setRoute(null)
                  setDirections(null)
                  return old.map(loc => loc.id === location.id ? { ...loc, ...newLoc } : loc)
                })}
                value={location?.address}
              />
            </Box>
            {index > 0 && <IconButton 
              size="small"
              disabled={locations.length <= 2}
              onClick={_ => setLocations(old => 
                old.filter(l => l.id !== location.id)
              )}
            >
              <ClearIcon fontSize="small"/>
            </IconButton>}
          </Box>
          )}
          <Box mb={2}>
            <Button
              disabled={locations.some(loc => !loc.value)}
              startIcon={<AddIcon />}
              onClick={_ => setLocations(old => [...old, { id: uuid() }])}
            >
              Add Location
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              color="primary"
              disabled={locs.length < 2}
              onClick={handleGenerateRoute}
            >
              Generate Route
            </Button>
          </Box>
        </Box>
        
        <GoogleMap
          mapContainerStyle={{ flexGrow: 1 }}
          center={center}
          zoom={11}
        >
          {!route && locations.map((location, index) =>
            location.value && <Marker 
              key={location.id}
              position={location.value}
              label={index === 0 ? "S" : `${index}`}
            />
          )}
          {directions}
          {fetchDistance && <DistanceMatrixService
            key="distance_matrix" 
            options={{
              origins: locs.map(loc => loc.value),
              destinations: locs.map(loc => loc.value),
              travelMode: "DRIVING"
            }}
            callback={resp => {
              setFetchDistance(false)
              setMatrix(resp.rows.map(row =>
                row.elements.map(element => element.distance.value)
              ))
            }}
          />}
        </GoogleMap>
      </LoadScript>
    </Box>
  </div>
}
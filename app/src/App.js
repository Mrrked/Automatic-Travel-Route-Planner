import { v4 as uuid } from "uuid"
import { useEffect, useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Snackbar,
  Checkbox,
  Typography,
  Fab
} from "@material-ui/core"
import {
  Clear as ClearIcon,
  Menu as MenuIcon
} from "@material-ui/icons"
import { Alert } from "@material-ui/lab"
import { libraries } from "config"
import { getValidLocations } from "utils";
import Map from "components/Map";
import Panel from "components/Panel";
import * as tsp from "tsp/index"
import { MainContext } from "providers/Main";
import useLocalStorage from "hooks/useLocalStorage";

// eslint-disable-next-line
const activated = "AIzaSyDPCx-DR57YVb-1pYfEwi9EsvWUqLWMKmA"
// eslint-disable-next-line
const dummy = "AIzaSyDr-Sb2ICpI-9HRANMJBLIOEAzAHNNWjbk"

const sizeToApprox = 10

export default function App() {
  const [locations, setLocations] = useState([
    { id: uuid(), distances: {} }, 
    { id: uuid(), distances: {} } 
  ])
  const [matrix, setMatrix] = useState(null)
  const [end, setEnd] = useState("ANY")
  const [route, setRoute] = useState(null)
  const [notification, setNotification] = useState({ text: "", severity: "info" })
  const [noStart, setNoStart] = useState(false)
  const [noDestination, setNoDestination] = useState(false)
  const [noEnd, setNoEnd] = useState(false)
  const [origin, setOrigin] = useState([])
  const [destinations, setDestinations] = useState([])
  const [shouldGetMatrix, setShouldGetMatrix] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [showDialog, setShowDialog] = useLocalStorage("showDialog", true)
  
  const validLocations = getValidLocations(locations)

  const [openPanel, setOpenPanel] = useState(true)

  useEffect(_ => {
    (async function(){
      if (!matrix) return
      if (validLocations.length < 2) return
  
      const endIndex = validLocations.findIndex(loc => loc.id === end)

      const result = await (
        validLocations.length < sizeToApprox
        ? tsp.getRoute(matrix.map(row => row.map(element => element.duration)), endIndex)
        : tsp.getRouteApprox(matrix.map(row => row.map(element => element.duration)), endIndex)
      )
  
      setRoute(result.path)
      setIsLoading(false)
    })()
    // eslint-disable-next-line
  }, [matrix])

  const handleEditLocation = (id, updates={}) => {
    const location = locations.find(loc => loc.id === id)
    if (!location) return

    if (route) setRoute(null)

    setLocations(old => old.map(loc => 
      loc.id === id 
      ? { ...loc, ...updates } 
      : loc
    ))
  }

  const handleAddLocation = (newLoc = {}) => {
    const emptyLoc = locations.find(loc => !loc.value)
    
    if (emptyLoc) 
      setLocations(old => old.map(loc => 
        loc.id === emptyLoc.id ? { id: loc.id, ...newLoc }
        : loc
      ))
    else {
      setLocations(old => [...old, { ...newLoc, id: uuid() }])
    }
    setRoute(null)
  }

  const generateRoute = () => {
    setRoute(null)
    setLocations(validLocations)
    setShouldGetMatrix(true)
    setIsLoading(true) 
  }

  const handleGenerateRoute = () => {
    const newNoStart = !locations?.[0].value
    const newNoEnd = !end
    const newNoDestination = validLocations.length < 2
    
    setNoStart(newNoStart)
    setNoEnd(newNoEnd)
    setNoDestination(newNoDestination)

    if (newNoStart || newNoEnd || newNoDestination) return

    if (validLocations.length >= sizeToApprox && showDialog) setOpenDialog(true)
    else generateRoute()
  } 

  return <MainContext.Provider 
    value={{
      locations, setLocations,
      matrix, setMatrix,
      end, setEnd,
      route, setRoute,
      notification, setNotification,
      noStart, setNoStart,
      noEnd, setNoEnd,
      noDestination, setNoDestination,
      handleAddLocation, handleEditLocation, handleGenerateRoute,
      validLocations,
      origin, setOrigin,
      destinations, setDestinations,
      shouldGetMatrix, setShouldGetMatrix,
      isLoading, setIsLoading,
      openPanel, setOpenPanel
    }}
  >
  <Dialog open={openDialog}>
    <DialogTitle>Results may not be exact.</DialogTitle>
    <DialogContent>
      <Typography>
        Due to the resource-intensive operations required to calculate routes, results for ten or more locations can only be approximated. 
      </Typography>
      <Box mt={2}>
        <FormControlLabel 
          checked={!showDialog}
          onChange={e => setShowDialog(!e.target.checked)}
          label="Don't show this message again"
          control={<Checkbox size="small" />}   
        />
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={_ => setOpenDialog(false)}>
        Cancel
      </Button>
      <Button 
        onClick={_ => {
          setOpenDialog(false)
          generateRoute()
        }}
      >
        Continue
      </Button>
    </DialogActions>
  </Dialog>
  <div style={{ height: "100%", display: "flex", flexDirection: "column"}}>
    <Box display="flex" height="100%">
      <LoadScript
        googleMapsApiKey={activated}
        libraries={libraries}
      >
        <Backdrop style={{ zIndex: 2 }} open={isLoading}>
          <CircularProgress />
        </Backdrop>
        {openPanel && <Panel/>}
        <Box flexGrow={1}>
          <Box style={{ position: "absolute", bottom: 0, padding: 5, zIndex: 5 }}>
            <Fab color="primary" size="small" onClick={_ => setOpenPanel(old => !old)}>
              <MenuIcon fontSize="small" />
            </Fab>
          </Box>
          <Map mapContainerStyle={{ height: "100%", width: "100%"}}/>
        </Box>
      </LoadScript>
    </Box>
    <Snackbar 
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={Boolean(notification.text)}
    >
      <Alert severity={notification.severity}>
        {notification.text}
        <IconButton size="small" onClick={_ => setNotification({ text: "", severity: "info" })}>
          <ClearIcon fontSize="small" />
        </IconButton>
      </Alert>
    </Snackbar>
  </div>
  </MainContext.Provider>
}
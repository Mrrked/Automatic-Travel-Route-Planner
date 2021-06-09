import { v4 as uuid } from "uuid"
import {
    Box,
    Button,
    Fab,
    IconButton,
    Paper,
    Typography,
  } from "@material-ui/core"
import {
    Add as AddLocationIcon,
    Clear as ClearIcon,
    SearchOutlined as FindRouteIcon
} from "@material-ui/icons"
import AutocompleteField from "components/AutocompleteField";
import { getValidLocations } from "utils"

export default function Panel({ locations, setLocations, setRoute, handleGenerateRoute }){
    const validLocations = getValidLocations(locations)

    return <Box zIndex={1} boxShadow={2} width={300} display="flex" flexDirection="column" alignSelf="stretch" component={Paper}>
        <Box boxShadow={1} p={3} color="primary.contrastText" bgcolor="primary.main">
            <Typography variant="h6" color="inherit">
                Travel Route Planner
            </Typography>
        </Box>
        <Box px={3} pt={1} flexGrow={1} flexShrink={1} overflow="scroll" display="flex" flexDirection="column">
            <Box mb={2} display="flex" justifyContent="flex-end">
                <Button
                    disabled={locations.some(loc => !loc.value)}
                    startIcon={<AddLocationIcon />}
                    onClick={_ => setLocations(old => [...old, { id: uuid() }])}
                >
                    Add Location
                </Button>
            </Box>
            {locations.map((location, index) => 
            <Box
                key={location.id}
                mb={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box width={220} mr={1}>
                    <AutocompleteField
                    label={index === 0 ? "Start" : `Destination ${index}`}
                    onPlaceChanged={newLoc => setLocations(old => {
                        setRoute(null)
                        return old.map(loc => loc.id === location.id ? { ...loc, ...newLoc } : loc)
                    })}
                    value={location?.address}
                    />
                </Box>
                    {index > 0 && <IconButton 
                        size="small"
                        disabled={locations.length <= 2}
                        onClick={_ => setLocations(old => {
                        if (location.value) setRoute(null)
                        return old.filter(l => l.id !== location.id)
                        })}
                    >
                        <ClearIcon fontSize="small"/>
                    </IconButton>}
            </Box>
            )}
        </Box>
        <Box p={3} display="flex" justifyContent="flex-end">
            <Fab 
                variant="extended" 
                color="primary"
                disabled={validLocations.length < 2}
                onClick={handleGenerateRoute}
            >
                <FindRouteIcon style={{ marginRight: 10 }} />
                Find Route
            </Fab>
        </Box>
    </Box>
}
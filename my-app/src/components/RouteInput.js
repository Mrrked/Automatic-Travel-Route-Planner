import { v4 as uuid } from "uuid"
import {
    Box,
    Button,
    Fab,
    IconButton,
  } from "@material-ui/core"
import {
    Add as AddLocationIcon,
    Clear as ClearIcon,
    SearchOutlined as FindRouteIcon
} from "@material-ui/icons"
import AutocompleteField from "components/AutocompleteField";
import { getValidLocations } from "utils"

export default function RouteInput({ route, handleViewRoute, locations, setLocations, setRoute, handleGenerateRoute }){
    const validLocations = getValidLocations(locations)

    return <>
        <Box flexGrow={1} flexShrink={1} overflow="scroll" display="flex" flexDirection="column">
            <Box mb={2} display="flex" justifyContent="flex-end">
                <Button
                    disabled={locations.some(loc => !loc.value)}
                    startIcon={<AddLocationIcon />}
                    onClick={_ => {
                        setLocations(old => [...old, { id: uuid() }])
                        setRoute(null)
                    }}
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
        <Box display="flex" flexDirection="row-reverse" justifyContent="space-between">
            <Fab 
                variant="extended" 
                color="primary"
                disabled={validLocations.length < 2}
                onClick={handleGenerateRoute}
            >
                <FindRouteIcon style={{ marginRight: 10 }} />
                Find Route
            </Fab>
            {route && <Button 
                size="small"
                color="secondary"
                onClick={handleViewRoute}
            >
                View Route
            </Button>}
        </Box>
    </>
}
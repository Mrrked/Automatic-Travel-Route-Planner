import { v4 as uuid } from "uuid"
import {
    Box,
    Button,
    IconButton,
    Paper,
    Typography,
  } from "@material-ui/core"
import {
    Add as AddIcon,
    Clear as ClearIcon,
} from "@material-ui/icons"
import AutocompleteField from "components/AutocompleteField";
import { getValidLocations } from "utils"

export default function Panel({ locations, setLocations, setRoute, handleGenerateRoute }){
    const validLocations = getValidLocations(locations)

    return <Box width={300} display="flex" flexDirection="column" alignSelf="stretch" component={Paper}>
        <Box p={3} width="100%" color="primary.contrastText" bgcolor="primary.main">
            <Typography variant="h6" color="inherit">
                Travel Route Planner
            </Typography>
        </Box>
        <Box p={3} flexGrow={1} flexShrink={1} overflow="scroll" display="flex" flexDirection="column">
            <Box overflow="scroll">
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
                    disabled={validLocations.length < 2}
                    onClick={handleGenerateRoute}
                >
                    Generate Route
                </Button>
            </Box>
        </Box>
    </Box>
}
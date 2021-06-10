import {
    Box,
    Button,
    Fab,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
  } from "@material-ui/core"
import {
    Add as AddLocationIcon,
    Clear as ClearIcon,
    SearchOutlined as FindRouteIcon
} from "@material-ui/icons"
import AutocompleteField from "components/AutocompleteField";
import { getValidLocations } from "utils"
import { useEffect } from "react";

export default function RouteInput({ handleAddLocation, noStart, setNoStart, noEnd, setNoEnd, end, setEnd, route, handleViewRoute, locations, setLocations, setRoute, handleGenerateRoute }){
    const validLocations = getValidLocations(locations)

    useEffect(_ => {
        if (validLocations.findIndex(loc => loc.id === end) === -1) setEnd("ANY")
    }, [validLocations, end, setEnd])

    return <>
        <Box flexGrow={1} flexShrink={1} overflow="scroll" display="flex" flexDirection="column">
            <Box mb={2} display="flex" justifyContent="flex-end">
                <Button
                    disabled={locations.some(loc => !loc.value)}
                    startIcon={<AddLocationIcon />}
                    onClick={_ => {
                        handleAddLocation()
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
                <Box width={250} mr={1}>
                    <AutocompleteField
                        error={noStart && index === 0}
                        helperText={noStart && index === 0 && "Required"}
                        label={index === 0 ? "Start" : `Destination ${index}`}
                        onPlaceChanged={newLoc => setLocations(old => {
                            if (index === 0) setNoStart(false)
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
            <Box mb={2} width={250}>
                <FormControl 
                    fullWidth
                    size="small"
                    error={noEnd}
                >
                    <InputLabel>End</InputLabel>
                    <Select 
                        label="End"
                        disabled={validLocations.length === 0}
                        value={end}
                        onChange={e => {
                            setEnd(e.target.value)
                            setRoute(null)
                            setNoEnd(false)
                        }}
                    >
                        <MenuItem value="ANY">
                            Any
                        </MenuItem>
                        {validLocations.map((loc) => 
                        <MenuItem
                            key={loc.id}
                            value={loc.id}
                        >
                            {loc.id === locations[0].id && "(Round trip)"} {loc.address} 
                        </MenuItem>
                        )}
                    </Select>
                    <FormHelperText>{noEnd && "Required"}</FormHelperText>
                </FormControl>
                    
            </Box>
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
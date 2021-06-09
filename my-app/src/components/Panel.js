import {
    Box,
    Paper,
    Typography,
  } from "@material-ui/core"
import RouteInput from "components/RouteInput"

export default function Panel({ locations, setLocations, setRoute, handleGenerateRoute }){

    return <Box zIndex={1} boxShadow={2} width={300} display="flex" flexDirection="column" alignSelf="stretch" component={Paper}>
        <Box boxShadow={1} p={3} color="primary.contrastText" bgcolor="primary.main">
            <Typography variant="h6" color="inherit">
                Travel Route Planner
            </Typography>
        </Box>
        <RouteInput {...{ locations, setLocations, setRoute, handleGenerateRoute }} />
    </Box>
}
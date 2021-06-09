import {
    Box,
    Button,
    Paper,
    Typography,
} from "@material-ui/core"
import {
    ArrowBackIos as BackIcon
} from "@material-ui/icons"
import RouteInput from "components/RouteInput"
import { useEffect, useState } from "react"
import RouteDisplay from "./RouteDisplay"

export default function Panel({ locations, matrix, setLocations, route, setRoute, handleGenerateRoute }){
    const [view, setView] = useState("ROUTE_INPUT")

    useEffect(_ => {
        if (route) setView("ROUTE_DISPLAY")
    }, [route])

    return <Box zIndex={1} boxShadow={2} width={300} display="flex" flexDirection="column" alignSelf="stretch" component={Paper}>
        <Box boxShadow={1} p={3} color="primary.contrastText" bgcolor="primary.main">
            <Typography variant="h6" color="inherit">
                Travel Route Planner
            </Typography>
        </Box>
        <Box display="flex" flexDirection="column" flexGrow={1} px={3} py={1}>
            {view !== "ROUTE_INPUT" &&
                <Box display="flex" mb={2}>
                    <Button
                        onClick={_ => setView("ROUTE_INPUT")}
                        size="small"
                    >
                        <BackIcon fontSize="small" />
                        Back
                    </Button>
                </Box>
            }
            {view === "ROUTE_INPUT" 
            ? <RouteInput 
                {...{ locations, setLocations, route, setRoute, handleGenerateRoute }} 
                handleViewRoute={_ => setView("ROUTE_DISPLAY")}
            />
            : view === "ROUTE_DISPLAY"
            ? <RouteDisplay {...{route, locations, matrix}} />
            : null}

        </Box>
        
    </Box>
}
import {
    Box,
    Button,
    Paper,
    Typography,
} from "@material-ui/core"
import {
    ArrowBack as BackIcon
} from "@material-ui/icons"
import RouteInput from "components/RouteInput"
import { MainContext } from "providers/Main"
import { useContext, useEffect, useState } from "react"
import RouteDisplay from "./RouteDisplay"

export default function Panel(){
    const [view, setView] = useState("ROUTE_INPUT")
    const { route } = useContext(MainContext)

    useEffect(_ => {
        if (route) setView("ROUTE_DISPLAY")
        else setView("ROUTE_INPUT")
    }, [route])

    return <Box zIndex={1} boxShadow={2} width={400} display="flex" flexDirection="column" alignSelf="stretch" component={Paper}>
        <Box boxShadow={1} p={3} color="primary.contrastText" bgcolor="primary.main">
            <Typography variant="h6" color="inherit">
                Travel Route Planner
            </Typography>
        </Box>
        <Box display="flex" flexDirection="column" overflow="scroll" flexGrow={1} px={3} py={1}>
            {view !== "ROUTE_INPUT" &&
                <Box display="flex" mb={2}>
                    <Button
                        onClick={_ => setView("ROUTE_INPUT")}
                        size="small"
                        startIcon={<BackIcon/>}
                    >
                        Back
                    </Button>
                </Box>
            }
            {view === "ROUTE_INPUT" 
            ? <RouteInput handleViewRoute={_ => setView("ROUTE_DISPLAY")} />
            : view === "ROUTE_DISPLAY"
            ? <RouteDisplay/>
            : null}

        </Box>
        
    </Box>
}
import { Box, Typography } from "@material-ui/core";
import { Timeline, TimelineConnector, TimelineContent, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@material-ui/lab";
import { formatDuration, getValidLocations } from "utils";

export default function RouteDisplay({ route, locations, matrix }){
    const validLocations = getValidLocations(locations)
    const durations = route?.map((node, index, arr) => index === 0 ? 0 : matrix[arr[index-1]][node])
    const totalDuration = durations?.reduce((acc, curr) => acc + curr)

    return <Box>
        <Typography><strong>Travel Time:</strong> {formatDuration(totalDuration)}</Typography>
        <Timeline>
            {route?.map((node, index) => 
                <TimelineItem key={index}>
                    {index !== 0 &&<TimelineOppositeContent>
                        <Typography variant="subtitle2">
                            {formatDuration(durations[index])}
                        </Typography>
                    </TimelineOppositeContent>}
                    <TimelineSeparator>
                        <Box 
                            display="flex" 
                            width={25} 
                            height={25} 
                            color="secondary.contrastText"
                            bgcolor="secondary.main" 
                            borderRadius="50%"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography color="inherit">
                                {(index + 10).toString(36).toUpperCase()}
                            </Typography>
                        </Box>
                        {/* <TimelineDot color="secondary" /> */}
                        {index < route.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                        {validLocations[node].name}
                    </TimelineContent>
                </TimelineItem>
            )}
        </Timeline>
    </Box>
}
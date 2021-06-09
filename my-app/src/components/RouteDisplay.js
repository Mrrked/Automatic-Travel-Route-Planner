import { Box, Typography } from "@material-ui/core";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@material-ui/lab";
import { formatDuration, getValidLocations } from "utils";

export default function RouteDisplay({ route, locations, matrix }){
    const validLocations = getValidLocations(locations)
    const durations = route?.map((node, index, arr) => index === 0 ? 0 : matrix[arr[index-1]][node])
    const totalDuration = durations?.reduce((acc, curr) => acc + curr)

    return <Box>
        <Typography><strong>Travel Time:</strong> {formatDuration(totalDuration)}</Typography>
        <Timeline>
            {route?.map((node, index, arr) => 
                <TimelineItem>
                    {index !== 0 &&<TimelineOppositeContent>
                        {formatDuration(durations[index])}

                    </TimelineOppositeContent>}
                    <TimelineSeparator>
                        <TimelineDot color="secondary" />
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
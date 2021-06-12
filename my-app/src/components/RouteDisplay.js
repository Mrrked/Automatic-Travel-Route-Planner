import { Box, Typography } from "@material-ui/core";
import { Timeline, TimelineConnector, TimelineContent, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@material-ui/lab";
import { MainContext } from "providers/Main";
import { useContext } from "react";
import { formatDuration } from "utils";

export default function RouteDisplay(){
    const { route, matrix, validLocations } = useContext(MainContext)
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
                        {index < route.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                        {function(){
                            let label = validLocations[node].name || validLocations[node].address
                            
                            if (label.length > 30) label = `${label.substring(0, 30)}...`
                            return label
                        }()}
                    </TimelineContent>
                </TimelineItem>
            )}
        </Timeline>
    </Box>
}
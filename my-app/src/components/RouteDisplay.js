import { Box, Tab, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel, Timeline, TimelineConnector, TimelineContent, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@material-ui/lab";
import { MainContext } from "providers/Main";
import { useContext, useState } from "react";
import { formatDuration, formatDistance } from "utils";

function TimelineDisplay({ totalLabel, totalDisplay, values=[] }){
    const { route, validLocations } = useContext(MainContext)

    return <Box>
        <Typography><strong>{totalLabel}:</strong> {totalDisplay}</Typography>
        <Timeline>
            {route?.map((node, index) => 
                <TimelineItem key={index}>
                    {index !== 0 && <TimelineOppositeContent>
                        <Typography variant="subtitle2">
                            {values?.[index]}
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

export default function RouteDisplay(){
    const { route, matrix } = useContext(MainContext)
    const durations = route?.map((node, index, arr) => index === 0 ? 0 : matrix[arr[index-1]][node].duration)
    const distances = route?.map((node, index, arr) => index === 0 ? 0 : matrix[arr[index-1]][node].distance)
    const totalDuration = durations?.reduce((acc, curr) => acc + curr)
    const totalDistance = distances?.reduce((acc, curr) => acc + curr)

    const [tab, setTab] = useState(0)
    
    return <Box>
        <TabContext value={tab}>
            <TabList 
                centered
                textColor="secondary"
                indicatorColor="secondary"
                onChange={(e, newValue) => setTab(newValue)}
            >
                <Tab label="Distance" />
                <Tab label="Time" />
            </TabList>
            <TabPanel style={{ paddingLeft: 0, paddingRight: 0 }} value={0} >
                <TimelineDisplay 
                    totalLabel="Total Distance"
                    totalDisplay={formatDistance(totalDistance)}
                    values={distances?.map(distance => formatDistance(distance))}
                />
            </TabPanel>
            <TabPanel style={{ paddingLeft: 0, paddingRight: 0 }} value={1}>
                <TimelineDisplay 
                    totalLabel="Total Time"
                    totalDisplay={formatDuration(totalDuration)}
                    values={durations?.map(duration => formatDuration(duration))}
                />
            </TabPanel>
        </TabContext>
    </Box>
}
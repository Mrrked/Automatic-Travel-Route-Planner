import humanizeDuration from "humanize-duration"


export const getValidLocations = (locations) => locations.filter(loc => loc.value)
export const formatDuration = (seconds) => 
humanizeDuration(
    seconds * 1000, 
    { 
        units: ["d", "h", "m"],
        round: true,
    }
)
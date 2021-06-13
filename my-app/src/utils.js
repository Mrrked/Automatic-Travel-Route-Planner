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
export const formatDistance = (meters) =>
meters < 1000 ? `${meters} m`
: `${Math.round(meters / 1000 * 100) / 100} km`
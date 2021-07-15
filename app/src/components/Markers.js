import { Marker } from "@react-google-maps/api";


export default function Markers({ locations }){
    return <>
        {locations.map((location, index) =>
        location.value && 
        <Marker 
            key={location.id}
            position={location.value}
            label={`${index}`}
        />
        )}
    </>
}
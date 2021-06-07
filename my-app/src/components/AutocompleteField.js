import { Autocomplete } from "@react-google-maps/api"
import { TextField } from "@material-ui/core"
import { useState } from "react"

export default function AutocompleteField({onPlaceChanged, value="", ...props}){
    const [autocomplete, setAutocomplete] = useState(null)
    // const [value, setValue] = useState("")
    const [temp, setTemp] = useState(null)

    return <Autocomplete
        onLoad={setAutocomplete}
        onPlaceChanged={_ => {
            if (autocomplete !== null){
                const place = autocomplete.getPlace()
                onPlaceChanged?.({
                    value: {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    },
                    address: place.formatted_address.includes(place.name) ?
                    place.formatted_address : `${place.name}, ${place.formatted_address}`,
                    name: place.name
                })
                setTemp(null)
            }
        }}
        restrictions={{
            country: "PH"
        }}
    >
        <TextField 
            fullWidth 
            size="small"
            variant="outlined"
            value={temp ?? value}
            onChange={e => setTemp(e.target.value)}
            onBlur={_ => onPlaceChanged({
                value: null,
                address: null,
                name: null
            })}
            {...props}
        />
    </Autocomplete>
}
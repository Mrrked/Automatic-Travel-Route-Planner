import { Autocomplete } from "@react-google-maps/api"
import { TextField } from "@material-ui/core"
import { useState } from "react"

export default function AutocompleteField({onPlaceChanged, value="", ...props}){
    const [autocomplete, setAutocomplete] = useState(null)
    const [temp, setTemp] = useState(null)

    return <Autocomplete
        onLoad={setAutocomplete}
        onPlaceChanged={_ => {
            if (autocomplete !== null){
                const place = autocomplete.getPlace()

                if (!place?.geometry) {
                    onPlaceChanged?.({
                        value: null,
                        address: null,
                        name: null,
                    })
                } else {
                    onPlaceChanged?.({
                        value: {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                        },
                        address: place.formatted_address.includes(place.name) ?
                        place.formatted_address : `${place.name}, ${place.formatted_address}`,
                        name: place.name,
                    })
                }
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
            value={temp ?? value ?? ""}
            onChange={e => setTemp(e.target.value)}
            onBlur={_ => {
                if (value){
                    if (temp === "") {
                        onPlaceChanged?.({
                            value: null,
                            address: null,
                            name: null
                        })
                    }
                    setTemp(null)
                }
            }}
            {...props}
        />
    </Autocomplete>
}
import { Tooltip } from "@material-ui/core";
import { Polyline } from "@react-google-maps/api";
import { MainContext } from "providers/Main";
import { useContext } from "react";
import Markers from "./Markers";

export default function Graph(){
    const { validLocations } = useContext(MainContext)
    return <>
        <Markers locations={validLocations} />
        {validLocations.map((loc, index) => 
            validLocations.map((l, i) =>
                i > index &&
                <Tooltip title="Test" style={{ zIndex: 5 }}>
                    <Polyline 
                        path={[loc.value, l.value]}
                    />
                </Tooltip>
            )
        )}
    </>
}
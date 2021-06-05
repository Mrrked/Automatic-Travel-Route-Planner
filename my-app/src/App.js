import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
})); //Material CSS Appbar

const containerStyle = {
  float: 'right',
  width: '1000px',
  height: '615px',
  margin: '0px'
};

const center = {
  lat: 14.599513,
  lng: 120.984222
};

function MyComponent() {
  const classes = useStyles(); //Material CSS

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDr-Sb2ICpI-9HRANMJBLIOEAzAHNNWjbk" //AIzaSyDPCx-DR57YVb-1pYfEwi9EsvWUqLWMKmA
  })                                                            //AIzaSyDr-Sb2ICpI-9HRANMJBLIOEAzAHNNWjbk

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Travel Route Planner
          </Typography>
        </Toolbar>
      </AppBar>
    
    {isLoaded && <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>}
    </div>
  );

  

    
}

export default React.memo(MyComponent)
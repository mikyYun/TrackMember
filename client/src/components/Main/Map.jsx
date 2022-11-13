import React from "react";
import jwtDecode from "jwt-decode";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { fetchMap } from "../../fetch/fetch";
import Loading from "./Loading";


const containerStyle = {
  width: "100vw",
  height: "50vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};
const Map = () => {
  const [key, setKey] = React.useState(null);

  React.useMemo(() => {
    fetchMap()
      .then((res) => res.json())
      .then(({ token }) => {
        setKey(token);
      })
      .catch((err) => console.error("Failed to load map", err));
  }, []);

  // console.log(navigator)
  if (navigator.geolocation) {
    console.log("TEST", navigator.geolocation)
    navigator.geolocation.getCurrentPosition(position => {
      const userLocation = {           
        lat: position.coords.latitude, 
        lng: position.coords.longitude,
      };
      console.log(userLocation)                                // ADDED
    });
  }


  // if (!isLoaded) return <div>Loading...</div>;
  return key ? (
    <LoadScript googleMapsApiKey={jwtDecode(key).key}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  ) : (
    <Loading />
  );
};

export default Map;

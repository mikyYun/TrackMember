import React from "react";
import jwtDecode from "jwt-decode"

// import {GoogleMap, useJsApiLoader} from "@react-google-maps/api"
import { fetchMap } from "../../fetch/fetch";

const Map = () => {
  const loadMap = () => {

  }
  React.useMemo(() => {
    fetchMap()
      .then(res => res.json())
      .then(({token}) => {
        const decoded = jwtDecode(token)
        console.log(decoded)
      })
      .catch(err => console.error("Failed to load map", err))
  }, [])


  return (
    <div id="map">
      This is map component

    </div>
  );
};

export default Map;

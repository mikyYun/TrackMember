import React from "react";
import jwtDecode from "jwt-decode";

import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";
import { fetchMap } from "../../fetch/fetch";
import Loading from "./Loading";
import { color } from "../../helpers/dotStyle";
import Markers from "./Marker";


const CONTAINER_STYLE = {
  width: "100vw",
  height: "50vh",
};

// const CENTER = {
//   lat: 10,
//   lng: 10,
// };

const Map = () => {
  const [key, setKey] = React.useState(null);
  const [CENTER, setCENTER] = React.useState({});
  // const marker = React.useRef(null);

  React.useMemo(() => {
    fetchMap()
      .then((res) => res.json())
      .then(({ token }) => {
        setKey(token);
      })
      .catch((err) => console.error("Failed to load map", err));
    if (navigator.geolocation) {
      // console.log("TEST", navigator.geolocation);
      navigator.geolocation.getCurrentPosition((position) => {
        setCENTER({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        // const errorRange = position.coords.accuracy;
      });
    } else {
      console.error(
        "This browser does not support geolocation. Please try again"
      );
    }
  }, []);

  // console.log(navigator)

  const userColor = {
    fillColor: color.blue,
    fillOpacity: 1,
    // path: new Circle,
    scale: 8,
    strokeColor: color.white,
    strokeWeight: 2,
  };

  const circle = new Circle({
    strokeColor: color.blue,
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: color.blue,
    fillOpacity: 0.35,
    // map: map,
    center: CENTER,
    radius: 100,
  });
  // const svgMarker = {
  //   path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
  //   fillColor: color.blue,
  //   fillOpacity: 1,
  //   strokeWeight: 1,
  //   scale: 2,
  //   // anchor: new Point(15, 30),
  // };
  // if (!isLoaded) return <div>Loading...</div>;
  return key ? (
    <LoadScript googleMapsApiKey={jwtDecode(key).key}>
      <GoogleMap mapContainerStyle={CONTAINER_STYLE} center={CENTER} zoom={10}>
        {/* {setTimeout(() => { */}
        {/* }, 1000)} */}
        <Markers center={CENTER} />
        {/* <Circle
          strokeColor={color.white}
          strokeOpacity="1"
          strokeWeight="2"
          fillColor={"#FF0000"}
          fillOpacity="0.35"
          center={CENTER}
          radius={50}
        /> */}
        {/* <Marker position={CENTER} title="User" /> */}
      </GoogleMap>
    </LoadScript>
  ) : (
    <Loading />
  );
};

export default Map;

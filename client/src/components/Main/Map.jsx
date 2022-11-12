import React from "react";
import jwtDecode from "jwt-decode";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { fetchMap } from "../../fetch/fetch";

// const key = async() => fetchMap()
// .then((res) => res.json())
// .then(({ token }) => {
//   const decoded = jwtDecode(token);
//   console.log(decoded);
//   // key = decoded.key;
//   return decoded.key
// })
// .catch((err) => console.error("Failed to load map", err));
const containerStyle = {
  width: "400px",
  height: "400px",
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
        setKey(token)
        // const decoded = jwtDecode(token);
        // console.log(decoded);
        // key = decoded.key;
        // return decoded.key;
      })
      .catch((err) => console.error("Failed to load map", err));
  }, []);

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: "AIzaSyBDpuazELaF84sQ9JL8De6pkVbTgmw66fQ",
  // });

  // if (!isLoaded) return <div>Loading...</div>;
  return key ? (
    <LoadScript googleMapsApiKey={jwtDecode(key).key}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  ) : (
    <div>Loading...</div>
  );
};

export default Map;

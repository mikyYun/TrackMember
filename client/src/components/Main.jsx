import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Main.scss";
import Map from "./Main/Map";
import Control from "./Main/Control";
import Members from "./Main/Members";

const Main = ({ cookie, navigateTo }) => {
  const [user, setUser] = React.useState("")

  // When Main component rendering, check params for userInfo
  // If no params, check cookies
  React.useEffect(() => {
    const userInfo = cookie.get("TrackOwner");
    if (!userInfo) navigateTo("/");
    setUser(userInfo.username)
  }, []);

  return (
    <div id="main">
      MAIN
      {user}
      <Map />
      <Control />
      <Members />
    </div>
  );
};

export default Main;

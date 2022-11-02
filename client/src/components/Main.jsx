import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Main.scss"

const Main = ({ cookie, navigateTo }) => {
  // When Main component rendering, check params for userInfo
  // If no params, check cookies
  React.useEffect(() => {
    const userInfo = cookie.get("TrackOwner");
    if (!userInfo) navigateTo("/");
  }, []);

  return <div id="main">MAIN</div>;
};

export default Main;
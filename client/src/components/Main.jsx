import React from "react";
import { useNavigate } from "react-router-dom";

const Main = ({ cookie }) => {
  // When Main component rendering, check params for userInfo
  // If no params, check cookies
  const navigate = useNavigate();
  React.useEffect(() => {
    const userInfo = cookie.get("TrackOwner");
    if (!userInfo) navigate("/");
  }, []);

  return <div>MAIN</div>;
};

export default Main;

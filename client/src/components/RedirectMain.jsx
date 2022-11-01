import React from "react";
import { fetchAuth } from "../fetch/fetch";
import { useNavigate } from "react-router-dom";

const RedirectMain = ({ cookie }) => {
  const navigate = useNavigate();
  // When Main component rendering, check params for userInfo
  // If no params, check cookies
  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    // const user = queryParams.get("user");
    // const email = queryParams.get("email");
    const token = queryParams.get("token");
    const userInfo = cookie.get("TrackOwner");
    // console.log(user, email, userInfo)
    if (token) {
      fetchAuth(token)
      .then(() => {

      })
      .catch(err => console.error(err))
    } else if (userInfo) {
      // navigate("/")
    }

  }, []);

  // console.log("UER", userInfo)
  return <div>Redirecting to Main Page</div>;
};

export default RedirectMain;

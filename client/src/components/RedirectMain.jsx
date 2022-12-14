import React from "react";
import { fetchAuth } from "../fetch/fetch";
import { useNavigate } from "react-router-dom";

const RedirectMain = ({ cookie, navigateTo }) => {
  // const navigate = useNavigate();
  // When Main component rendering, check params for userInfo
  // If no params, check cookies

  
  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    
    // const user = queryParams.get("user");
    // const email = queryParams.get("email");
    const token = queryParams.get("token");
    const userInfo = cookie.get("TrackOwner");
    if (token) {
      fetchAuth(token)
      .then((res) => res.json())
      .then((user) => {
        const { username } = user;
        if (!username) return navigateTo("/", 0);
        cookie.set("TrackOwner", { token, username });
          navigateTo("main", 1000);
        })
        .catch((err) => console.error(err));
    } else if (userInfo && userInfo.token && userInfo.username) {
      fetchAuth(userInfo.token)
        .then((res) => res.json())
        .then((user) => {
          const { username } = user;
          if (!username) return navigateTo("/", 0);
          navigateTo("main", 1000);
        })
        .catch((err) => console.error(err));
    } else {
      navigateTo("/", 0);
    }
  }, []);
  // console.log("UER", userInfo)
  return <div>Redirecting to Main Page</div>;
};

export default RedirectMain;

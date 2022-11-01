import React from "react";
import { fetchAuth } from "../fetch/fetch";
import { useNavigate } from "react-router-dom";

const RedirectMain = ({ cookie }) => {
  const navigate = useNavigate();
  // When Main component rendering, check params for userInfo
  // If no params, check cookies
  const navigateTo = (path) => {
    setTimeout(() => navigate(path), 1000);
  };

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
          if (!username) return navigateTo("/");
          cookie.set("TrackOwner", { token, username });
          navigateTo("main");
        })
        .catch((err) => {
          console.error(err);
          navigateTo("/");
        });
    } else if (userInfo && userInfo.token && userInfo.username) {
      fetchAuth(userInfo.token)
        .then((res) => res.json())
        .then((user) => {
          const { username } = user;
          if (!username) return navigateTo("/");
          navigateTo("main");
        })
        .catch((err) => console.error(err));
    } else {
      navigateTo("/");
    }
  }, []);

  // console.log("UER", userInfo)
  return <div>Redirecting to Main Page</div>;
};

export default RedirectMain;

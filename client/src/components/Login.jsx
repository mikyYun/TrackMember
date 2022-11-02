import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.scss";
import { fetchSetToken } from "../fetch/fetch";
import Waiting from "./Waiting";
const COOKIE_AGE = 60 * 60 * 48;

const Login = ({ cookie, navigateTo }) => {
  const [email, setEmail] = React.useState("mkyun2714@gmail.com");
  const [username, setUsername] = React.useState("mike");
  const [waiting, setWaiting] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  // const navigate = useNavigate();

  // const navigateTo = (path) => {
  //   setTimeout(() => navigate(path), 1000);
  // };

  const clearInput = () => {
    setEmail("");
    setUsername("");
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    await fetchSetToken(email, username)
      .then((res) => res.json())
      .then((res) => {
        const { wait, verify } = res.response;
        const { token } = res;
        if (wait || verify) {
          if (verify) {
            // pass
            const user = cookie.get("TrackOwner");
            if (user) {
              // navigate("main");
              navigateTo(`main/token?token=${token}`, 0);
            } else {
              cookie.set(
                "TrackOwner",
                { token, username },
                { path: "/", maxAge: COOKIE_AGE }
              );
              navigateTo("main", 1000);
            }
          }
          if (wait) {
            // waiting for email verification
            setWaiting(true);
          }
          clearInput();
        } else {
          // retry
          setIsError(true);
          setTimeout(() => setIsError(false), 3000);
        }
      })
      .catch((err) => console.error(err));
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="login_container">
      <form action="submit" className="login_form">
        <div className="email_container">
          <input
            type="email"
            placeholder="email@email.com"
            className="email"
            onChange={updateEmail}
            required
            value={email}
          />
          <input
            type="text"
            placeholder="John Doe"
            className="username"
            onChange={updateUsername}
            required
            value={username}
          />
          <br />
          <button onClick={submitEmail}>Login/Register</button>
          <div className={isError ? "error" : "error error_hide"}>
            Please confirm your email or username
          </div>
        </div>
      </form>
      <Waiting waiting={waiting} />
    </div>
  );
};

export default Login;

import React from "react";
import "../styles/Login.scss";
import { fetchSetToken } from "../fetch/fetch";
import Waiting from "./Waiting";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [waiting, setWaiting] = React.useState(true);

  const submitEmail = async (e) => {
    e.preventDefault();
    await fetchSetToken(email, username)
      .then((res) => {
        const code = res.status;
        if (code === 200) {
          // pass
        }
        if (code === 205) {
          // waiting
        }
        if (code === 404) {
          // retry
        }
        console.log("GET", res)
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
          />
          <input
            type="text"
            placeholder="John Doe"
            className="username"
            onChange={updateUsername}
            required
          />
          <button onClick={submitEmail}>Login/Register</button>
        </div>
      </form>
      {waiting ? <Waiting /> : null}
    </div>
  );
};

export default Login;

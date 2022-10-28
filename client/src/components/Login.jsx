import React from "react";
import "../styles/Login.scss"
import { fetchSetToken } from "../fetch/fetch";

const Login = () => {
  const [email, setEmail] = React.useState("")
  const [username, setUsername] = React.useState("")
  console.log("user");

  const submitEmail = (e) => {
    e.preventDefault();
    fetchSetToken(email, username)
  }



  const updateEmail = (e) => {
    setEmail(e.target.value)
  }
  const updateUsername = (e) => {
    setUsername(e.target.value)
  }

  return (
    <div className="login_container">
      <form action="submit" className="login_form">
        <div className="email_container">
          <input type="email" placeholder="email@email.com" className="email" onChange={updateEmail} required/>
          <input type="text" placeholder="John Doe" className="username" onChange={updateUsername} required/>
          <button onClick={submitEmail}>Login</button>
        </div>
      </form>
    </div>
  )
};

export default Login;
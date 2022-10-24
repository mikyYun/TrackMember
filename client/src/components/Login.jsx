import React from "react";
import "../styles/Login.scss"
import { fetchLogin, fetchSet } from "../fetch/fetch";

const Login = () => {
  const [email, setEmail] = React.useState("")
  
  const submitEmail = (e) => {
    e.preventDefault();
    // console.log("SUBMIT", email)
    fetchLogin(email)
    fetchSet(email)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value)
  }

  return (
    <div className="login_container">
      <form action="submit" className="login_form">
        <div className="email_container">
          <input type="email" placeholder="email@email.com" className="email" onChange={updateEmail}/>
          <button onClick={submitEmail}>Login</button>
        </div>
      </form>
    </div>
  )
};

export default Login;
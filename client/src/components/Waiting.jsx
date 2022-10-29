import "../styles/Waiting.scss";
import React from "react";


const Waiting = (waiting) => {
  console.log("WAITING", waiting)
  return (
    <div className="waiting hide">
      {waiting ? <img className="waiting_img" src={require("../resources/gif/emailVerifyAnimation.gif")} alt="emailVerifyAnimation." /> : null}
      <div className="waiting_text">
      Waiting Email Verification
      </div>
    </div>
  )
}

export default Waiting;
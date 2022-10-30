import "../styles/Waiting.scss";
import React from "react";


const Waiting = (waiting) => {
  return (
    <div className="waiting hide">
      {waiting ? <img className="waiting_img" src={require("../resources/gif/emailVerifyAnimation.gif")} alt="emailVerifyAnimation." /> : null}
      <div className="waiting_text">
      Waiting for Email Verification
      </div>
    </div>
  )
}

export default Waiting;
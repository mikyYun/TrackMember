import express from "express";
import Jwt from "jsonwebtoken"
import {User} from "../models/model.js"

// console.log("MD", SchemaModel)
const routes = express.Router();
/************* DB ROUTER *************/
// test
routes.post("/post", (req, res) => {
  const user = new User({"username": "TEST"})
  console.log("USER", user.username)
  res.send("POST API")
})

// clicked email verification button
routes.get("/user/authenticate/:email", (req, res) => {
  if (!req.params.email) return;
  const email = req.params.email;

  if (true) { // 첫번째 요청
    res.status(200).send(`Verified. Thank you.<a href=${process.env.FRONT_URL}>Back to the website</a>`);
  } else { // 첫번째 인증 이후 거절
    res.status(400).send(`Expired request token. Please try login again`)
  }
})

routes.post("/user/authenticate/set", (req, res) => {
  if (!req.params.email) return;
  const email = req.params.email;

  if (true) { // 첫번째 요청
    res.status(200).send(`Verified. Thank you.<a href=${process.env.FRONT_URL}>Back to the website</a>`);
  } else { // 첫번째 인증 이후 거절
    res.status(400).send(`Expired request token. Please try login again`)
  }
})

export default routes;
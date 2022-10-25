import express from "express";
import Jwt from "jsonwebtoken";
// import { User } from "../models/model.js";
import { startVerification } from "../db.js";
import { decodeToken } from "../token/token.js";

// console.log("MD", SchemaModel)
const routes = express.Router();
/************* API ROUTER *************/
// test
routes.post("/post", (req, res) => {
  // // const user = new User({"username": "TEST"})
  // const all = findAll({
  //   collection: "User",
  //   username: "TEST",
  //   email: "mkyun2714@gmail.com"
  // });

  // console.log("USER", all);

  // find matching user
  // const check = find("mkyun2714@gmail.com")
  // console.log("CHECK", check)

  const email = "mkyun2714@gmail.com";
  // const token = createToken(email)
  // console.log("TT", token)
  const back = decodeToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1reXVuMjcxNEBnbWFpbC5jb20iLCJleHAiOjE2NjY3NDg5OTksImlhdCI6MTY2NjY2MjU5OX0.RG-DWnR-UsxKDbC_GSerSB3nKVXnl-iyFXQmSuvW0eI", email);
  console.log("BACK", back);
  res.send("POST API");
});

// clicked email verification button
routes.get("/user/authenticate/:email", (req, res) => {
  if (!req.params.email) return;
  const email = req.params.email;

  if (true) { // 첫번째 요청
    res.status(200).send(`Verified. Thank you.<a href=${process.env.FRONT_URL}>Back to the website</a>`);
  } else { // 첫번째 인증 이후 거절
    res.status(400).send(`Expired request token. Please try login again`);
  }
});

routes.post("/user/authenticate/set", (req, res) => {
  if (!req.params.email) return;
  const email = req.params.email;

  if (true) { // 첫번째 요청
    res.status(200).send(`Verified. Thank you.<a href=${process.env.FRONT_URL}>Back to the website</a>`);
  } else { // 첫번째 인증 이후 거절
    res.status(400).send(`Expired request token. Please try login again`);
  }
});

routes.post("/token/:email", async (req, res) => {
  if (!req.params.email) return;
  const email = req.query.email;
  const username = req.query.username;
  // console.log(req)
  // const email = req.body.email;
  // const username = req.body.username;
  const userInfo = {
    email,
    username
  }
  await startVerification(userInfo)
    .then(() => res.status(200).send(true))
    .catch(err => res.status(400).send(err))
});

export default routes;
import express from "express";
import Jwt from "jsonwebtoken";
// import { User } from "../models/model.js";
import { checkVerification, findUserWith, updateUsername, createUser, updateToken, completeVerify, updateTokenAndIsVerified } from "../db.js";
import { generateToken, decodeToken, isExpired } from "../token/token.js";
import mailer from "../mailer.js";

// console.log("MD", SchemaModel)
const routes = express.Router();
/************* API ROUTER *************/


// clicked email verification button
routes.get("/user/authenticate/:token", async (req, res) => {
  console.log("VERIFICATIPN REQUEST");
  if (!req.params.token) return;
  const token = req.params.token;
  // only true for one time click
  await checkVerification(token)
    .then(isVerified => {
      console.log("THIS", isVerified)
      if (isVerified) {
        return res.status(200).send(`Verified. Thank you.<a href=${process.env.FRONT_URL}>Back to the website</a>`);
      }
      return res.status(404).send(`Token already used or expired. Please try login again`);
    })
    .catch(err => console.error("WRONG TOKEN", err));
  // console.log("VERIFIED", isVerified);

  // if (!isVerified) {
  // } else {
  //   res.status(400).send(`Expired request token. Please try login again`);
  // }
});

// localhost:3001/api
// User Login
routes.post("/login/:email", async (req, res) => {
  console.log("LOGIN REQUEST");
  // res.send('GET request to the homepage')
  if (!req.params.email) return;
  // POSTMAN TEST
  // const email = req.query.email;
  // const username = req.query.username;
  // REAL
  const email = req.body.email;
  const username = req.body.username;

  /** BEFORE SEND MAIL, VERIFY USER ALREADY VERIFIED AND TOKEN IS NOT EXPIRED */
  const userInfo = {
    email,
    username
  };

  await findUserWith(userInfo)
    .then(user => {
      // if user doesn't exist, create one
      if (!user) {
        const token = generateToken(email);
        createUser(userInfo, token);
        mailer(email, token);
        return;
      }
      return user;
    })
    .then(user => {
      if (user) {
        if (username && user.username !== username) updateUsername(user, username);
        // if isVerified = true => check token life
        const { isVerified, email } = user;
        const token = generateToken(email);
        if (isVerified) {
          const decodedToken = decodeToken(token, email);
          const isExpiredToken = isExpired(decodedToken.exp);
          if (isExpiredToken) {
            // if token is expired, update isVerified false, generate new token and send email
            updateTokenAndIsVerified(user, token);
            mailer(email, token);
          } else {
            // if token is valid, update token and send ok to go main page
            updateToken(user, token);
            // res.method = "get";

            // res.writeHead(301, {
            //   // location: process.env.FRONT_URL + "main"
            //   Location: "http://localhost:3000/main"
            // }).end();
            return res.status(200).send({pass: true});
          }
        } else {
          updateTokenAndIsVerified(user, token);
          mailer(email, token);
        }
      }
      return res.status(200).send({pass: false})
    })
    .catch(err => res.status(400).send(err));
  // SEND MAIL WITH TOKEN
  // mailer(email, token);

  // userInfo.token = token;


  // await findUserAndSetToken(userInfo)
  //   .then(() => res.status(200).send(true))
  //   .catch(err => res.status(400).send(err));
});

export default routes;
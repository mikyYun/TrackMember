import express from "express";
import Jwt from "jsonwebtoken";
// import { User } from "../models/model.js";
import { checkVerification, findUserWith, updateUsername, createUser, updateToken, completeVerify, updateTokenAndIsVerified } from "../db.js";
import { generateToken, decodeToken, isExpired } from "../token/token.js";
import mailer from "../mailer.js";

// console.log("MD", SchemaModel)
const routes = express.Router();
/************* API ROUTER *************/


routes.get("/user/:token", (req, res) => {
  console.log("REDIRECT", req.params);
  // return res.writeHead(200, {
  //   Location: process.env.FRONT_URL
  // })
})

// clicked email verification button
routes.get("/user/authenticate/:token", async (req, res) => {
  console.log("VERIFICATIPN REQUEST");
  
  // if (!req.params.token) return;
  // const token = req.params.token;
  const token = "123"
  // await checkVerification(token)
  //   .then(isVerified => {
  //     console.log("THIS", isVerified);
  //     if (isVerified) {
        res.redirect(process.env.BACK_URL + "api/user/" + token)
  //       // return res.status(200).send(`Verified. Thank you.<a href=${process.env.FRONT_URL}>Back to the website</a>`);
  //     }
  //     return res.status(404).send(`Token already used or expired. Please try login again`);
  //   })
  //   .catch(err => console.error("WRONG TOKEN", err));
});

// localhost:3001/api
// User Login
routes.post("/login/:email", async (req, res) => {
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

  console.log("LOGIN REQUEST", userInfo);
  // return res.status(200).send("Email Verification Sent");

  const response = {
    verified: false
  };

  await findUserWith(userInfo)
    .then(user => {
      // if user doesn't exist, create one
      if (!user) {
        const token = generateToken(email);
        createUser(userInfo, token);
        mailer(email, token);
        // waiting for user verification
        res.status(205);
      } else return user;
    })
    .then(user => {
      console.log("USER", user);
      if (user) {
        // if (username && user.username !== username) updateUsername(user, username);
        if (username && user.username !== username) {

          return res.status(404);
        }
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
            // reset content and waiting for user verification
            res.status(205);
          } else {
            // if token is valid, update token and send ok to go main page
            updateToken(user, token);
            // good to redirect
            res.status(200);
          }
        } else {
          updateTokenAndIsVerified(user, token);
          mailer(email, token);
          // reset content and waiting for user verification
          res.status(205);
        }
      }
      // return res.status(200).send({pass: false})
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
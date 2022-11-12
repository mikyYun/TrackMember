import express from "express";
import Jwt from "jsonwebtoken";
// import { User } from "../models/model.js";
import { checkVerification, findUserWith, updateUsername, createUser, updateToken, completeVerify, updateTokenAndIsVerified } from "../db.js";
import { generateToken, decodeToken, isExpired } from "../token/token.js";
import mailer from "../mailer.js";

// console.log("MD", SchemaModel)
const routes = express.Router();

/************* API ROUTER *************/
/** CLICKED EMAIL VERIFICATION BUTTON
 * IF VERIFIED, REDIRECT main/:token which is render RedirectMain
*/
routes.get("/user/auth/:token", async (req, res) => {

  if (!req.params.token) return;
  const token = req.params.token;
  await checkVerification(token)
    .then(isVerified => {
      if (isVerified) {
        // res.redirect(process.env.BACK_URL + "api/user/" + token);
        // return res.status(200).send(`Verified. Thank you.<a href=${process.env.FRONT_URL}main>Go to Main Page</a>`);
        return res.status(302).send(`<a href=${process.env.FRONT_URL}main/${token}>Go Main Page</a>`);
      }
      return res.status(404).send(`Token already used or expired. Please try login again<br />
      <a href=${process.env.FRONT_URL}login>Go Login Page</a>`);
    })
    .catch(err => console.error("WRONG TOKEN", err));
});

// User Login
routes.post("/login/:email", async (req, res) => {
  // res.send('GET request to the homepage')
  if (!req.body.email) return;
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
      userInfo.response = { wait: false, verify: false };
      const token = generateToken(email);
      userInfo.token = token;
      if (!user) {
        createUser(userInfo, token);
        mailer({ email, token });
        // waiting for user verification
        userInfo.response.wait = true;
        return res.status(200).send(userInfo);
      } else {
        // if (username && user.username !== username) updateUsername(user, username);
        if (username && user.username !== username) {
          return res.status(404).send(err);
        }
        // if isVerified = true => check token life
        const { isVerified, email } = user;
        if (isVerified) {
          const decodedToken = decodeToken(token, email);
          const isExpiredToken = isExpired(decodedToken.exp);

          if (isExpiredToken) {
            // if token is expired, update isVerified false, generate new token and send email
            updateTokenAndIsVerified(user, token);
            mailer({ email, token });
            // reset content and waiting for user verification
            userInfo.response.wait = true;
            return res.status(200).send(userInfo);
          } else {
            // if token is valid, update token and send ok to go main page
            updateToken(user, token);
            // good to redirect
            userInfo.response.verify = true;
            return res.status(200).send(userInfo);
          }
        } else {
          updateTokenAndIsVerified(user, token);
          mailer({ email, token });
          // reset content and waiting for user verification
          userInfo.response.wait = true;
          return res.status(200).send(userInfo);
        }
      }
    })
    .catch(err => res.status(500).send(err));
});

/** USER AUTHENTICATE CHECK FROM RedirectMain Component */
routes.post("/auth/:token", async (req, res) => {

  const token = req.params.token;
  if (!token) return res.status(403).send("Unauthrized access");

  await findUserWith({ token })
    .then(user => {
      if (!user) return res.status(404);
      const { isVerified, email, username } = user;
      if (isVerified) {
        const decodedToken = decodeToken(token, email);
        const isExpiredToken = isExpired(decodedToken.exp);
        if (!isExpiredToken) {
          return res.status(200).send({ username });
        }
      }
      return res.status(403);
    })
    .catch(err => res.status(404).send(err));
});

routes.post("/map", (req, res) => {
  const key = process.env.MAP_KEY;
  const exp = Math.floor(Date.now() / 1000) + 60
  const token = Jwt.sign({
    key,
    exp
  }, String(exp))
  res.status(200).send({token})
});

export default routes;
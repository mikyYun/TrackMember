import nodemailer from "nodemailer"
import dotenv from "dotenv"
// const Jwt = require("jsonwebtoken")
import Jwt from "jsonwebtoken"
// import {generateToken} from "./token/token.js"

dotenv.config();
const mailer = async ({email, token}) => {
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587, // single connection
    auth: {
      user: process.env.AUTH_MAIL,
      pass: process.env.AUTH_PASS
    }
  })
  /** GENERATE TOKEN AND SET INTO DB */
  /** SEND MAIL */
  const mailOptions = await transporter.sendMail({
    from: "TrackMember",
    to: email,
    subject: "Please confirm the authentication to login",
    text: "CLICK",
    html: `
      <p>User Verification Email FROM TrackMember</p>
      <p1>This email valid only once</p1>
      <button style="background:#a6a6ff; padding:10px; border-radius:5px;">
      <a href="${process.env.AUTHENTICATE}${token}" style="text-tecoration:none">Authenticate</a>
      </button>
    `
  })

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.log("ERROR", err);
    transporter.close();
  })
}

export default {mailer};
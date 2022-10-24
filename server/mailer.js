import nodemailer from "nodemailer"
import dotenv from "dotenv"
// const Jwt = require("jsonwebtoken")
import Jwt from "jsonwebtoken"

dotenv.config();
const mailer = async (email) => {
  
  /** GENERATE TOKEN FOR 1 DAY */
  const token = Jwt.sign({
    email,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
  }, email)
  console.log("TOKEN", token)
  
  
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
      <p>User Authenticate Confirmation Email FROM TrackMember</p>
      <button style="background:#a6a6ff; padding:10px; border-radius:5px;">
      <a href="${process.env.AUTHENTICATE}${email}" style="text-tecoration:none">Authenticate</a>
      </button>
    `
  })

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.log("ERROR", err);
    transporter.close();
  })


}

export default mailer;
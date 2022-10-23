import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();
const mailer = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.gmail.com",
    port: 587, // single connection
    // posrt: 465 // pooled connections
    // secure: false,
    auth: {
      user: process.env.AUTH_MAIL,
      pass: process.env.AUTH_PASS
    }
  })
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
    console.log("FINISH SENDING EMAIL", info);
    transporter.close();
  })


}

export default mailer;
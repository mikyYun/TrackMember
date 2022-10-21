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
      // user: "TrackMember",
      // pass: process.env.AUTH_PASS
      pass: "omouzfpxltwlxirj"
    }
  })
  console.log(transporter)
  const mailOptions = await transporter.sendMail({
    from: "TrackMember",
    to: email,
    subject: "Please confirm the authentication to login",
    // html: emailTemplete,
    text: "CLICK"
  })

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.log("ERROR", err);
    console.log("FINISH SENDING EMAIL", info);
    transporter.close();
  })


}

export default mailer;
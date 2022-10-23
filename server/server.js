import mailer from "./mailer.js";
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
const app = express();
const PORT = process.env.PORT || 3001;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/", (req, res) => {
  console.log("try login", req.body);
  console.log("END");
  const userEmail = req.body.email;
  mailer(userEmail)
  res.status(200).send({data: "GOOD"});
});

app.get("/user/authenticate/:email", (req, res) => {
  if (!req.params.email) return;
  const email = req.params.email

  res.status(200).send(`Verified. Thank you.<a href=${process.env.FRONT_URL}>Back to the website</a>`)

  console.log("AUTHENTICATE", email)
})

app.listen(PORT, () => {
  console.log(`SERVER start linstening on port ${PORT}`);
});


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

app.listen(PORT, () => {
  console.log(`SERVER start linstening on port ${PORT}`);
});


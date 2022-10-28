import mailer from "./mailer.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/api.js";

// import { generateToken } from "./token/token.js";

// import db from "./db.js";
// import { Models } from "./models/model.js";


const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", routes);

app.post("/", (req, res) => {
  const userEmail = req.body.email;
  mailer(userEmail);
  res.status(200).send({ data: "GOOD" });
});


app.listen(PORT, () => {
  console.log(`SERVER start linstening on port ${PORT}`);
});


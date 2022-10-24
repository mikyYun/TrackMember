import express from "express";
const routes = express.Router();
/************* DB ROUTER *************/
routes.post("/post", (req, res) => {
  res.send("POST API")
})
routes.get("/get/user/authenticate/:email", (req, res) => {
  if (!req.params.email) return;
  const email = req.params.email;

  res.status(200).send(`Verified. Thank you.<a href=${process.env.FRONT_URL}>Back to the website</a>`);
})

export default routes;
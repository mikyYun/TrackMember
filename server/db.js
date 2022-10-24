import mongoose from "mongoose";
const DATABASE_URL = process.env.DATABASE_URL;
const mongo = await mongoose.connect(DATABASE_URL);

const db = mongo.connection;


db.on("error", (err) => {
  console.log(err);
});

db.once("connected", () => console.log("DATABASE CONNECTED"));

export default db;
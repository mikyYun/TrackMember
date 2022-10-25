import mongoose from "mongoose";
import { User, Token } from "./models/model.js";
const DATABASE_URL = process.env.DATABASE_URL;
const mongo = await mongoose.connect(DATABASE_URL);
import Jwt from "jsonwebtoken";
import { generateToken, decodeToken } from "./token/token.js";

const db = mongo.connection;


db.on("error", (err) => {
  console.log(err);
});

db.once("connected", () => {
  console.log("DATABASE CONNECTED");
});

const createCollection = ({ username, email }) => {
  return User.create({ username, email }, (err, doc) => {
    if (err) return console.error("Create Err: ", err);
    console.log("CREATE", doc);
    return doc;
  });
};

const insertUser = (data) => {
  User.insertOne(data); // data = {}
};

const findAll = (collection) => {
  //   User.find({}, (err, doc) => {
  //     if (err) return console.error("No User", err);
  //     console.log("USER DOC", doc);
  //   });

  //   console.log("1");
  //   if (!db[collection.collection]) createCollection(collection);
  //   console.log("2");
  //   // console.log(db);
  //   if (db[collection.collection]) console.log("EXIST");
  //   // return db[collection.collection]?.find({});
};


const find = async (email, username) => {
  return await User.find({ email }, (err, doc) => {
    if (err) return console.error("Finding email failed", err);
    console.log("EXIST EMAIL", doc);
    return doc;
  }).clone()
    .then(userData => {
      if (userData.length === 0) {
        return createCollection({ email, username });
      }
    })
    .catch(err => console.error(err));
};

// console.log("FIND", find({email:"test@test.com"}))
// console.log("THIS")
// const decodeToken = (token, email) => {
//   decodeToken(token, email)
// }

const updateVerify = (email, username) => {
  const token = generateToken(email);

  User.findOneAndUpdate({ email }, { token }, (err, doc) => {
    if (err) return console.error("Verify update failed", err);
    console.log("SUCCESS", doc);
  }).clone();
};


const startVerification = async ({ email, username }) => {
  find(email, username);
  updateVerify(email, username);
};

const verificationProcess = async (email) => {

//   decodeToken(token, email)

}

export { startVerification, verificationProcess };
import mongoose from "mongoose";
import { User } from "./models/model.js";
const DATABASE_URL = process.env.DATABASE_URL;
const mongo = await mongoose.connect(DATABASE_URL);
import Jwt from "jsonwebtoken";
import { generateToken, decodeToken, isExpired } from "./token/token.js";

const db = mongo.connection;


db.on("error", (err) => {
  console.log(err);
});

db.once("connected", () => {
  console.log("DATABASE CONNECTED");
});

const createUser = ({ username, email }, token) => {
  return User.create({ username, email }, (err, user) => {
    if (err) return console.error("Create Err: ", err);
    updateToken(user, token);
    // return doc;
  });
};

const updateUsername = (user, username) => {
  user.username = username;
  user.save(err => {
    if (err) console.error("Update username failed");
  });
};

const updateToken = (user, token) => {
  user.token = token;
  user.save(err => {
    if (err) console.error("Update token failed");
  });
};

const updateTokenAndIsVerified = (user, token) => {
  user.token = token;
  user.isVerified = false;
  user.save(err => {
    if (err) console.error("Update token failed");
  });
};

const completeVerify = (user) => {
  user.isVerified = true;
  user.save(err => {
    if (err) console.error("Update token failed");
  });
};

const setVerify = (user) => {
  user.isVerified = true;
  user.save(err => {
    if (err) console.error("Update token failed");
  });
};

/** FIND USER with email*/
const findUserWith = async (userInfo) => {
  return await User.findOne(userInfo.token ? { token: userInfo.token } : { email: userInfo.email }, (err, user) => {
    if (err) return console.error("Failed finding user with given token", err);
    return user;
  }).clone();
};

/** Email verification button only once */
const checkVerification = (tokenFromEmail) => {
  // find token is expired
  const userInfo = { token: tokenFromEmail };
  return findUserWith(userInfo)
    .then(user => {
      if (!user) return false;
      const { isVerified, email, token } = user;
      if (isVerified) { // reuse email token
        return false;
      } else {
        const decodedToken = decodeToken(token, email);
        const isExpiredToken = isExpired(decodedToken.exp);
        if (tokenFromEmail === token) {
          if (isExpiredToken) {
            return false;
          }
          setVerify(user);
          return true;
        }
      }
    })
    .catch(err => console.error("Verification failed", err));
};


export { checkVerification, findUserWith, updateUsername, createUser, updateToken, completeVerify, updateTokenAndIsVerified };
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserModel = new Schema({
  username: {
    id: String,
    type: String,
    required: true,
  },
  email: {
    id: String,
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  isVerified: {
    type: Boolean,
    require: true,
    index: true,
    default: false
  },
  token: {
    type: String,
    // ref: "Token",
    default: null
  }
})


const User = mongoose.model("UserModel", UserModel)
export {User}


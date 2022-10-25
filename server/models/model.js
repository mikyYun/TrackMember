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

const TokenModel = Schema({
  value: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  expiredAt: {
    type: Date,
    expires: 60 * 60 * 24,
    default: Date.now
  }
})

// const SchemaModel = {
//   UserModel,
//   TokenModel
// }
// export default SchemaModel;

const User = mongoose.model("UserModel", UserModel)
const Token = mongoose.model("TokenModel", TokenModel)
export {User, Token}


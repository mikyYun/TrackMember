import mongoose from "mongoose";

export const EmailModel = new mongoose.Schema({
  email: {
    required: true,
    type: String
  }
})


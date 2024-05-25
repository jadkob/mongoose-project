import mongoose from "mongoose";
import { bacgram } from "../setup";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});

export interface User {
  username: String;
  password: String;
  createdAt: Date;
}
export const User = bacgram.model("User", userSchema);

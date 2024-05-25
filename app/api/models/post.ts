import mongoose from "mongoose";
import { bacgram } from "../setup";

export const postSchema = new mongoose.Schema({
  author: String,
  title: String,
  text: String,
  likes: Number,
  likedUsers: Array<String>,
  createdAt: { type: Date, default: Date.now },
});

export interface Post {
  author: String;
  title: String;
  text: String;
  likes: Number;
  likedUsers: Array<String>;
  createdAt: Date;
  _id: String;
}
export const Post = bacgram.model("Post", postSchema);

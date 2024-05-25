import { Post } from "../models/post";
import { User } from "../models/user";

export async function POST() {
  await Post.deleteMany({});
  await User.deleteMany({});
  return new Response("hi");
}

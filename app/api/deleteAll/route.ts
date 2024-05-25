import { Post } from "../models/post";

export async function POST() {
  await Post.deleteMany({});
  return new Response("hi");
}

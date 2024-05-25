import * as jwt from "jsonwebtoken";
import { Post } from "../models/post";
import { isEmpty } from "../isEmpty";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token || !jwt.verify(token, "secret"))
      return new Response("Unauthorized", { status: 401 });

    const decoded: any = jwt.decode(token);
    const posts = await Post.find({
      author: { $ne: decoded.username },
    });
    if (posts.length == 0)
      return new Response("No posts found", { status: 404 });

    return Response.json(posts);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const { title, text } = await req.json();
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token || !jwt.verify(token, "secret"))
      return new Response("Unauthorized", { status: 401 });

    if (!title || !text || isEmpty([title, text]))
      return new Response("Invalid data", { status: 400 });

    const decoded: any = jwt.decode(token);
    const post = await Post.create({
      title,
      text,
      author: decoded.username,
    });
    return Response.json(post);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

import * as jwt from "jsonwebtoken";
import { Post } from "../../models/post";
import { connectDb } from "../../setup";

export async function POST(req: Request) {
  connectDb();
  try {
    const { postId } = await req.json();
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token || !(await jwt.verify(token, "secret")))
      return new Response("Unauthorized", { status: 401 });
    const decoded: any = jwt.decode(token);
    const post = await Post.findById(postId);
    if (!post) return new Response("Post not found", { status: 404 });

    const likedUsers: string[] = post.likedUsers as unknown as string[];

    const liked = likedUsers.includes(decoded.id);
    if (!liked) return new Response("Post not liked", { status: 400 });
    await Post.updateOne(
      { _id: postId },
      { $inc: { likes: -1 }, $pull: { likedUsers: decoded.id } }
    );
    const newPost = await Post.findById(postId);
    return Response.json(newPost);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

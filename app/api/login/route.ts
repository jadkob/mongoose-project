import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { isEmpty } from "../isEmpty";
import { User } from "../models/user";
import { connectDb } from "../setup";

export async function POST(req: Request) {
  connectDb();
  try {
    const { username, password } = await req.json();

    if (!username || !password || isEmpty([username, password]))
      return new Response("Missing username or password", { status: 400 });

    const user = await User.findOne({ username });

    if (!user) return new Response("User not found", { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) return new Response("Invalid password", { status: 401 });

    const token = jwt.sign({ id: user.id, username }, "secret");
    return Response.json(token);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

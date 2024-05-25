import { User } from "../models/user";
import { isEmpty } from "../isEmpty";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || isEmpty([username, password]))
      return new Response("Invalid data", { status: 400 });

    const userCheck = await User.findOne({ username });

    if (userCheck) return new Response("Username taken", { status: 404 });

    const user = await User.create({
      username,
      password: await bcrypt.hash(password, 10),
    });
    const token = jwt.sign({ id: user._id, username }, "secret");

    return Response.json(token);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

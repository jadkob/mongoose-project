import { User } from "../models/user";
import { isEmpty } from "../isEmpty";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { connectDb } from "../setup";

export async function POST(req: Request) {
  connectDb();
  try {
    const { username, password } = await req.json();

    // Validate input
    if (!username || !password || isEmpty([username, password])) {
      return new Response(JSON.stringify({ message: "Invalid data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if the user already exists
    const userCheck = await User.findOne({ username });
    if (userCheck) {
      return new Response(JSON.stringify({ message: "Username taken" }), {
        status: 409, // Conflict status code
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username },
      process.env.JWT_SECRET || "default_secret", // Use an environment variable for the secret
      { expiresIn: "1h" } // Token expiry time
    );

    // Respond with the token
    return new Response(JSON.stringify({ token }), {
      status: 201, // Created status code
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in signup API:", error); // Log the error
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

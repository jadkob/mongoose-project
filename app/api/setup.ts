import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://kabees:2011@book-db.skdoenm.mongodb.net/?retryWrites=true&w=majority&appName=book-db"
  );
};

export const bacgram = mongoose.connection.useDb("bacgram");

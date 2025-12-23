import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
  email: string;
}

const userSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "enter a valid email"],
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<User>("User", userSchema);

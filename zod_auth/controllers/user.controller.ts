import type { Request, Response } from "express";
import { SigninSchema, SignupSchema } from "../zod";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET , JWT_REFRESH_SECRET } from "../constant";
import bcrypt from "bcrypt";

export const RegisterUser = async (req: Request, res: Response) => {
  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "incorrect inputs",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(parsedData.data?.password, 10);

  try {
    const user = await UserModel.create({
      username: parsedData.data?.username,
      email: parsedData.data?.email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "signup completed",
      id: user._id,
    });
  } catch (error) {
    res.status(411).json({
      message: "user already exist",
    });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "incorrect inputs",
    });
    return;
  }

  try {
    //find user by username as it is in plain text in DB and compare password using bcrypt
    const existingUser = await UserModel.findOne({
      username: parsedData.data.username,
    });

    if (!existingUser) {
      res.status(403).json({
        message: "not authorized",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      parsedData.data.password, // plaintext password
      existingUser.password // hashed password from DB
    );

    if (!isPasswordValid) {
      return res.status(403).json({ message: "not authorized" });
    }

    // short-lived access token
    const accessToken = jwt.sign({ id: existingUser._id }, JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    // long-lived refresh token
    const refreshToken = jwt.sign(
      { id: existingUser._id },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // store refresh token in http-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/api/v1/user/refresh",
    });

    res.status(200).json({
      message: "signin successfull",
      token: accessToken, // frontend stores this in MEMORY
    });
  } catch (error) {
    res.status(411).json({
      message: "No such User",
    });
  }
};

export const Home = (req: Request, res: Response) => {
  res.json({
    message: "welcome to home page",
  });
};

import type { Request, Response } from "express";
import { SigninSchema, SignupSchema } from "../zod";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant";
import { resolve } from "bun";

export const RegisterUser = async (req: Request, res: Response) => {
  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "incorrect inputs",
    });
    return;
  }

  try {
    const user = await UserModel.create({
      username: parsedData.data?.username,
      email: parsedData.data?.email,
      password: parsedData.data?.password,
    });
    res.json({
      message: "signup completed",
      id:  user._id,
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
    const existingUser = await UserModel.findOne({
      username: parsedData.data.username,
      password: parsedData.data.password,
    });
    if (!existingUser) {
      res.status(403).json({
        message: "not authorized",
      });
      return;
    }

    const token = jwt.sign(
      {
        
        id:  existingUser._id
        
      },
      JWT_SECRET
    );
    res.status(200).json({
      message: "signin successfull",
      token: token
    })
  } catch (error) {
    res.status(411).json({
      message: "No such User",
    });
  }
};


export const Home = (req:Request,res:Response) => {
  res.json({
    message:"welcome to home page"
  })
}
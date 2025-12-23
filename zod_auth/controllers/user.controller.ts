import type { Request , Response } from "express"
import { SigninSchema , SignupSchema } from "../zod";
import { UserModel } from "../models/user.model";



export const RegisterUser = async (req :Request, res:Response) => {
   const parsedData = SignupSchema.safeParse(req.body);
   if (!parsedData.success) {
     res.json({
       message: "incorrect inputs",
     });
     return;
   }

    try {
      const user = UserModel.create({
        username: parsedData.data?.username,
        email: parsedData.data?.email,
        password: parsedData.data?.password,
      });
      res.json({
        message: "signup completed",
        id: (await user)._id
      });
    } catch (error) {
       res.status(411).json({
         message: "user already exist",
       });
    }
}



export const LoginUser = async (req: Request, res: Response) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.json({
        message: "incorrect inputs",
      });
      return;
    }
}
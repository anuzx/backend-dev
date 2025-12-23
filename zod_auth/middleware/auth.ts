import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../constant"
import type { NextFunction ,Request , Response } from "express";


export const verifyJwt = (req:Request,res:Response,next:NextFunction) => {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({
            message:"token is missing"
        })
    }
   try {
      jwt.verify(
         token
         , JWT_SECRET)
       

       next()

   } catch (error) {
       res.json({
        message:"inavlid token"
    })
   }
}
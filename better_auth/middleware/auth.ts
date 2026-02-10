import jwt from "jsonwebtoken"
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../constant";
import type { NextFunction ,Request , Response } from "express";

//best practice is to keep access token in memory (in react-app variables or useState) and refresh token in http-only cookie as they are longed lived and access token are short lived

export const verifyJwt = (req:Request,res:Response,next:NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
       
    if (!token) {
        return res.status(401).json({
            message:"token is missing"
        })
    }
   try {
       const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as { id: string };
       //req.userId = decoded.id; // optional but useful
       next();

   } catch (error) {
       res.json({
        message:"inavlid token"
    })
   }
}


export const refreshAccessToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "refresh token missing" });
  }

    try {
      
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
      id: string;
    };
      
//this create a brand new jwt_access_token
    const newAccessToken = jwt.sign({ id: decoded.id }, JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: "invalid refresh token" });
  }
};


//Access tokens authenticate requests.
//Refresh tokens renew access tokens.

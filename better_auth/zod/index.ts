import { z } from "zod";

export const SignupSchema = z.object({
  username: z
    .string()
    .min(3 , {message:"username should atleast be of 3 characters"})
    .max(20)
    .regex(/^[a-zA-Z0-9]+$/),
  
  password: z.string().min(6, {message:"password must be of 6 characters"}),

  email: z.string().email("Enter a valid email"),
});


export const SigninSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6),
});


import express from "express";
import cookieParser from "cookie-parser"
const app = express()

app.use(express.json())
app.use(cookieParser())

//routes
import userRouter from "./routes/user.route"

app.use("/api/v1/user", userRouter)


export {app}
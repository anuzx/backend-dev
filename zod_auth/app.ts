import express from "express";

const app = express()

app.use(express.json())


//routes
import userRouter from "./routes/user.route"

app.use("/api/v1/user", userRouter)


export {app}
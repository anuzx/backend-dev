import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import router from "./routes/index";


mongoose
  .connect("mongodb://127.0.0.1:27017/rest-api")
    .then(() => console.log("mongodb connected"));
  
mongoose.Promise = Promise;
  
const app = express();
const server = http.createServer(app);



app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

//routes
app.use('/',router());




server.listen(8080, () => {
  console.log("server running");
});

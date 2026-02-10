import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import { connectDB } from "./db";



connectDB()
  .then(() => {
    app.listen(3000, () => console.log("server connected at port 3000"));
  })
  .catch((err) => {
    console.error("Mongo connection failed", err);
    process.exit(1);
  });

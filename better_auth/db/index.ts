import mongoose from "mongoose";
import { DB_NAME } from "../constant";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`)
        console.log("DB connected" , connectionInstance.connection.host)
    } catch (error) {
        console.log("MONGO_DB connection ERROR")
        process.exit(1)
    }
}
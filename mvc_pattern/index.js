const express = require("express");
const {connectMongoDb} = require("./connection");
const {logReqRes} = require("./middlewares")

const userrouter = require('./routes/user');

const app = express();
const port = 8000;

//connection

connectMongoDb("mongodb://127.0.0.1:27017/trial-app").then(()=>console.log("mongodb connected"));

//middleware:

app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));


//ROUTES:

app.use("/api/users" , userrouter); //this means for an req on /api/users , use userrouter

app.listen(port , ()=>console.log('server is running'))

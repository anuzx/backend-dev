const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const port = 8000;

//connection
mongoose.connect('mongodb://127.0.0.1:27017/trial-app')
.then(() => console.log("mongoose connected"))
.catch((err)=> console.log("mongo error" , err))

//schema

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender:{
     type: String,

    },
});

const user = mongoose.model('user' , userSchema); //model

//middleware:
//app.use is used to make middleware


app.use(express.urlencoded({ extended: false }));
//this will help to put the form data into body

//if u want to end the res right here , use res ; next is used to refer next middleware


app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
});

//ROUTES:

app.get("/users" , async (req,res)=>{
    const allDbUsers = await user.find({}); //find all users
    const html =`
    <ul>
    ${allDbUsers.map((user)=>`<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>`;
    res.send(html);
});



//REST_API

app.get("/api/users" , async (req,res)=>{
     const allDbUsers = await user.find({});
    return res.json(allDbUsers);
});

//dynamic path parameters 
//:id->variable 
app
.route("/api/users/:id")
.get( async (req,res)=>{
    const user = await user.findById(req.params.id); 
    if(!user)return res.status(404).json({error: "usernot found"});
    return res.json(user);
})

.patch(async(req,res)=>{
    await user.findByIdAndUpdate(req.params.id , {lastName:"changed"});
    return res.json({status: "success"});
})

.delete(async(req,res)=>{
    await user.findByIdAndDelete(req.params.id);
    return res.json({status: "pending"});
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are req..." });
  }

  const result = await user.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({msg: 'success'});
});

   





app.listen(port , ()=>console.log('server is running'))

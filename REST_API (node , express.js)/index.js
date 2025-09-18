const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const port = 8000;

//middleware:

app.use(express.urlencoded({ extended: false }));
//this will help to put the form data into body

//ROUTES:

app.get("/users" , (req,res)=>{
    const html =`
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html);
});



//REST_API

app.get("/api/users" , (req,res)=>{
    return res.json(users);
});

//dynamic path parameters 
//:id->variable 
app
.route("/api/users/:id")
.get( (req,res)=>{
    const id = Number(req.params.id); 
    const user = users.find((user)=> user.id === id );
    return res.json(user);
})

.patch((req,res)=>{
    return res.json({status: "pending"});
})

.delete((req,res)=>{
    return res.json({status: "pending"});
});

app.post('/api/users/',(req,res)=>{
    const body = req.body;   //data from frontend is stored here

    //this will make a new data in mock_data.json
    users.push({...body ,id:users.length+1});
   fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    return res.json({status:"success" , id: users.length});
   })
   
});




app.listen(port , ()=>console.log('server is running'))

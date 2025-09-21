const User = require("../models/user")


async function handleGetAllUsers(req,res){
    const allDbUsers = await user.find({}); //because it is using user so we will need to import /model/user
    return res.json(allDbUsers);
}

async function handleGetUserId(req,res){
    const user = await user.findById(req.params.id); 
    if(!user)return res.status(404).json({error: "usernot found"});
    return res.json(user);
}

async function handleUpdateUserId(req,res){
await user.findByIdAndUpdate(req.params.id , {lastName:"changed"});
    return res.json({status: "success"});
}

async function handleDeleteUserId(req,res){
     await user.findByIdAndDelete(req.params.id);
    return res.json({status: "pending"});
}

async function handleCreateNewUser(req,res){
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

  return res.status(201).json({msg: 'success' , id: result._id});
 }


module.exports={
    handleGetAllUsers,
    handleGetUserId,
    handleUpdateUserId,
    handleDeleteUserId,
    handleCreateNewUser,
}

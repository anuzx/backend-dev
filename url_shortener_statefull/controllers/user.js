const User = require("../models/user");
const { v4: uuidv4 } = require("uuid"); // we gave name to v4 as uuidv4
const { setUser } = require("../service/auth");

//signup

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

//login

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ //this means find a user whose email and pass match with the given email and pass
    email,                          //here User is the variable given to the model/user file 
    password,
  });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  const sessionId = uuidv4(); //in login we must generate a unique id (authentication)
  setUser(sessionId, user); 
  res.cookie("uid", sessionId); // we kept name of cookie as uid
  return res.redirect("/");
}

//now when we have created a cookie after login , now we just need to take this value of cookie in middleware and check for the user  

module.exports = {
  handleUserSignup,
  handleUserLogin,
};

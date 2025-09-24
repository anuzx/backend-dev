const express = require("express");
const router = express.Router();

const URL = require("../models/url");

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
});


router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

//the "home", "signup", and "login" refer to the EJS view files.
//Express with EJS automatically looks for .ejs files inside the views directory 
//(unless you’ve configured a different folder with app.set("views", "somePath")).

module.exports = router;

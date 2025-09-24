const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const {restrictToLoggedinUserOnly,checkAuth} = require("./middlewares/auth")

const app = express();
const port = 8001;

//connection
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// Serve static files
app.use(express.static(path.join(__dirname, "views")));

app.use(express.json()); //middleware to parse incoming body
app.use(express.urlencoded({ extended: false })); //middleware to get form data
app.use(cookieParser());

//route
const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

app.use("/url", restrictToLoggedinUserOnly,urlRoute); //this route will only work when the user is logged in 
app.use("/", checkAuth, staticRoute);
app.use("/user",  userRoute);


app.get("/:shortId", async (req, res) => { // we have to fetch the shortid and then give to user 
     const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { //The $push operator is a fundamental update operator in MongoDB
        //used to append a specified value to an array within a document.
        //{ $push: { <field1>: <value1>, <field2>: <value2>, ... } }  
        $push: { //visit history is an array so we will use $push
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    // CRITICAL FIX: Check if entry exists
    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
  
});

app.listen(port, () => console.log("server started"));

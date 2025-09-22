const express = require("express");
const app = express();
const path = require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const staticRouter = require("./routes/staticRouter");
const port = 8001;

//connection
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// Serve static files
app.use(express.static(path.join(__dirname, "views")));

app.use(express.json()); //middleware
app.use(express.urlencoded({ extended: false })); //middleware

//route
const urlRoute = require("./routes/url");

app.use("/url", urlRoute);
app.use("/", staticRouter);

// FIXED: Added null check and error handling
app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;

    // Skip static files and known routes
    if (shortId.includes(".") || shortId === "favicon.ico") {
      return res.status(404).send("Not found");
    }

    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
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
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => console.log("server started"));

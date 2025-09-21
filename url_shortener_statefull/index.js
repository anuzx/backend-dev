const express = require("express");
const app = express();
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const port = 8001;
//connection
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongodb connected")
);

//middleware
app.use(express.json());

//route
const urlRoute = require("./routes/url");

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
    res.redirect(entry.redirectURL)
});

app.listen(port, () => console.log("server started"));

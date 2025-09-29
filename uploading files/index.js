const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({storage})

//const upload = multer({ dest: "uploads/" }); //it means put the uploaded files by the users in uploads folder (upload is a middleware here)

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false })); //middleware for form data

app.get("/", (req, res) => {
  return res.render("home"); // name of ejs file
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
  //upload.single => to upload single file
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

app.listen(PORT, () => console.log(`server started at port ${PORT}`));

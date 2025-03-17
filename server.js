const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
app.use(express.json()); // to enable it to be used in json
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const multer = require("multer");
const pdfDetails = require("./model/pdfDetails");
const imageDetails = require("./model/imageDetails");
app.use("/files", express.static("Files"));
app.use(cors(corsOptions));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  //the file is referring to the key and value file p from the formData() object
  console.log(req.file);
  res.status(200).json({ message: "File uploaded successfully" });

  const title = req.body.title;
  const filename = req.file.filename;

  try {
    const newFile = await pdfDetails.create({ title: title, pdf: filename });
    res.status(200).json(newFile);
  } catch (err) {}
});

app.get("/get-files", async (req, res) => {
  try {
    const files = await pdfDetails.find();
    res.status(200).json(files);
  } catch (err) {}
});

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/upload-image", async (req, res) => {
  const { base64 } = req.body;
  try {
    const image = await imageDetails.create({
      image: base64,
    });
    res.status(200).json({message: "sent successfully"})
  } catch (err) {}
});
app.get('/get-image', async (req,res) =>{
  try{
    const images = await imageDetails.find({})
    res.status(200).json(images)
  }catch(err){
      res.status(500).json({message:err.message })
  }
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(4500, () => {
      console.log("app listening on port 4500");
    });
  })
  .catch((err) => {
    console.log(err);
  });

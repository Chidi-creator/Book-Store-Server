require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const BookRoutes = require("./routes/bookRoutes");
const UserRoutes = require("./routes/userRoutes");
const Book = require("./models/book");


const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://book-store-five-red.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

//routes

app.use("/books", BookRoutes);
app.use("/user", UserRoutes);

//error handling
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
  
    console.log("app connected to db");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

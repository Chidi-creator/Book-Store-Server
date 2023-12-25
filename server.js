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

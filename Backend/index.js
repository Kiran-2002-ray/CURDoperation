const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser")
const authRoutes = require("./Routes/authRoute"); 

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({ origin: "http://localhost:5173" })); 


mongoose.connect("mongodb://127.0.0.1:27017/client")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Use client routes
app.use("/api", authRoutes);

app.listen(3001, () => {
  console.log("Server is running");
});

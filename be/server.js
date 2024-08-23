require("dotenv").config();

//requiring dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//import routes
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const errorHandler = require("./middleware/errorHandler");

//initialize express
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//configuring mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes)

app.use("/", errorHandler);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`BE Services is active and healthy at http://${HOST}:${PORT}`);
});

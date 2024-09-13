const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path=require('path')
const connectDb = require("./config/connectDb");

dotenv.config();
connectDb();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/transections", require("./routes/transactionRoutes"));

//  static files

app.use(express.static(path.join(__dirname,'./client/build')))

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.cyan);
});




 
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {} = require("jsonwebtoken");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./" });
}

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// use routers
const employeeRouter = require("./src/routes/employeeRoute");
// const customerRouter = require("./src/routes/customerRoute");
// const userRouter = require("./src/routes/userRoute");

// ROUTES
app.use("/employee", employeeRouter);
// app.use("/api/v1", customerRouter);
// app.use("/api/v1", userRouter);

module.exports = app;

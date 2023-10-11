const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const adminRoutes = require("./app/api/v1/admin/admin.routes");
const employeeRoutes = require("./app/api/v1/employee/employee.routes");
const authRoutes = require("./app/api/v1/auth/auth.routes");

//------------------Ruter Skripsi App---------------------------
const submissionRoutes = require("./app/api/v1/submission/submission.routes");


const URL = "/api/v1";

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(`${URL}`, authRoutes);
app.use(`${URL}`, adminRoutes);
app.use(`${URL}`, employeeRoutes);

//------------------Ruter Skripsi App---------------------------
app.use(`${URL}`, submissionRoutes);


app.use("/", (req, res) => {
  res.send({ message: "Welcome to API Filkom Apps" });
});

module.exports = app;

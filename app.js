const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const moment = require("moment");

const authRoutes = require("./app/api/v1/auth/auth.routes");
const adminRoutes = require("./app/api/v1/admin/admin.routes");
const employeeRoutes = require("./app/api/v1/employee/employee.routes");
const sptRoutes = require("./app/api/v1/spt/spt.routes");

//------------------Ruter Skripsi App---------------------------
const studentRoutes = require("./app/api/v1/student/student.routes");
const academicRoutes = require("./app/api/v1/academic_calendar/academic_calendar.routes");
const classroomRoutes = require("./app/api/v1/classroom/classroom.routes");
const submissionRoutes = require("./app/api/v1/submission/submission.routes");
const groupRoutes = require("./app/api/v1/group/group.routes");
const proposalRoutes = require("./app/api/v1/proposal/proposal.routes");

const URL = "/api/v1";

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://filkom-apps-fe-development.vercel.app",
  ],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(`${URL}`, authRoutes);
app.use(`${URL}`, adminRoutes);
app.use(`${URL}`, employeeRoutes);
app.use(`${URL}`, sptRoutes);

//------------------Ruter Skripsi App---------------------------
app.use(`${URL}`, studentRoutes);
app.use(`${URL}`, academicRoutes);
app.use(`${URL}`, classroomRoutes);
app.use(`${URL}`, submissionRoutes);
app.use(`${URL}`, groupRoutes);
app.use(`${URL}`, proposalRoutes);

app.use("/", (req, res) => {
  res.send({ message: "Welcome to API Filkom Apps" });
});

module.exports = app;

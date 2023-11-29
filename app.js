const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const authRoutes = require("./app/api/v1/auth/auth.routes");
const adminRoutes = require("./app/api/v1/admin/admin.routes");
const employeeRoutes = require("./app/api/v1/employee/employee.routes");

// dokumentasi
const {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset,
} = require("swagger-ui-dist");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Load Swagger JSON documentation from a file
const options = {
  swaggerDefinition: require("./public/docs/filkom-api-doc.json"),
  apis: [],
};
const swaggerSpec = swaggerJsdoc(options);

// Middleware untuk menampilkan Spesifikasi API dengan Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.1/swagger-ui.min.css",
  })
);

//--------------------KlabatBridge------------------------------
const sptRoutes = require("./app/api/v1/spt/spt.routes");
const tsRoutes = require("./app/api/v1/tracer_study/ts.routes");
const alumniRoutes = require("./app/api/v1/alumni/alumni.routes");
const dashboardKB = require("./app/api/v1/dashboard_klabatBridge/dashboard_kb.routes");

//------------------Ruter Skripsi App---------------------------
const studentRoutes = require("./app/api/v1/student/student.routes");
const academicRoutes = require("./app/api/v1/academic_calendar/academic_calendar.routes");
const classroomRoutes = require("./app/api/v1/classroom/classroom.routes");
const submissionRoutes = require("./app/api/v1/submission/submission.routes");
const groupRoutes = require("./app/api/v1/group/group.routes");
const proposalRoutes = require("./app/api/v1/proposal/proposal.routes");
const proposalAssessmentRoutes = require("./app/api/v1/proposal_assessment/proposal_assessment.routes");
const proposalChangesRoutes = require("./app/api/v1/proposal_changes/proposal_changes.routes");
const consultationRoutes = require("./app/api/v1/consultation/consultation.routes");
const skripsiRoutes = require("./app/api/v1/skripsi/skripsi.routes");

const URL = "/api/v1";

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://development-filkom-apps-fe.vercel.app",
    "http://localhost:5173",
  ],
};

//-------------------------BIMBINGAN AKADEMIK------------
const certificateRoutes = require("./app/api/v1/certificate/certificate.routes");
const activityRoutes = require("./app/api/v1/activity/activity.routes");
const curriculumRoutes = require("./app/api/v1/curriculum/curriculum.routes");
const subjectRoutes = require("./app/api/v1/subject/subject.routes");
const preRegisRoutes = require("./app/api/v1/pre_regis/preRegis.routes");
const { url } = require("inspector");

//--------------------------------------------------------

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(`${URL}`, authRoutes);
app.use(`${URL}`, adminRoutes);
app.use(`${URL}`, employeeRoutes);

//---------------Router KlabatBridge---------------------------
app.use(`${URL}`, sptRoutes);
app.use(`${URL}`, tsRoutes);
app.use(`${URL}`, alumniRoutes);
app.use(`${URL}`, dashboardKB);

//------------------Ruter Skripsi App---------------------------
app.use(`${URL}`, studentRoutes);
app.use(`${URL}`, academicRoutes);
app.use(`${URL}`, classroomRoutes);
app.use(`${URL}`, submissionRoutes);
app.use(`${URL}`, groupRoutes);
app.use(`${URL}`, proposalRoutes);
app.use(`${URL}`, proposalAssessmentRoutes);
app.use(`${URL}`, proposalChangesRoutes);
app.use(`${URL}`, consultationRoutes);
app.use(`${URL}`, skripsiRoutes);

//--------BIMBINGAN AKADEMIK-------------------------------
app.use(`${URL}`, certificateRoutes);
app.use(`${URL}`, activityRoutes);
app.use(`${URL}`, curriculumRoutes);
app.use(`${URL}`, subjectRoutes);
app.use(`${URL}`, preRegisRoutes);
//---------------------------------------------------

app.use("/", (req, res) => {
  res.send({ message: "Welcome to API Filkom Apps" });
});

module.exports = app;

// THIS LINE ADDED FOR TESTING PURPOSE

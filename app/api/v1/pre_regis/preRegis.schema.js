const Yup = require("yup");

const LatestPreRegistSchema = Yup.object().shape({
  major: Yup.string().oneOf(["SI", "IF", "DKV"]).required("Major is required"),
});

const GetCurriculumSchema = Yup.object().shape({
  id: Yup.string().required("ID is required"),
});

const CreatePreRegistSchema = Yup.object()
  .shape({
    semester: Yup.string()
      .oneOf(["Ganjil", "Genap", "Padat"])
      .required("Semester is required"),
    semesterPeriod: Yup.string()
      .required("Semester Period is required")
      .matches(/\b(\d{4})\/(\d{4})\b/, {
        message: "Semester period must be in format 'YYYY/YYYY'",
        excludeEmptyString: true,
      }),
    major: Yup.string()
      .oneOf(["SI", "IF", "DKV"])
      .required("Major is required"),
    dueDate: Yup.date().required("Due date is required"),
    employeeNik: Yup.string().required("Employee NIK is required"),
  })
  .noUnknown();

const SubmitPreRegistSchema = Yup.object()
  .shape({
    studentId: Yup.string()
      .matches(/^[0-9]+$/, {
        message: "NIM must be a number",
        excludeEmptyString: true,
      })
      .required("Student ID is required"),
    employeeId: Yup.string()
      .matches(/^[0-9]+$/, {
        message: "NIM must be a number",
        excludeEmptyString: true,
      })
      .required("Employee ID is required"),
    description: Yup.string(),
    listOfSubject: Yup.array()
      .of(
        Yup.object().shape({
          subjectId: Yup.string().required("Subject ID is required"),
        })
      )
      .min(1, "List of subject is required")
      .required("List of subject is required"),
  })
  .noUnknown();

const ApprovalSchema = Yup.object()
  .shape({
    id: Yup.string().required("ID is required"),
    status: Yup.string().oneOf(["APPROVED", "REJECTED"]).required(),
    comments: Yup.string().required("Comment is required"),
    approveDate: Yup.date().when("status", {
      is: "APPROVED",
      then: () => Yup.date().required("Approve date is required"),
      otherwise: () =>
        Yup.date()
          .is([null], "Approve date must be null if status is REJECTED")
          .nullable(),
    }),
  })
  .noUnknown();

module.exports = {
  LatestPreRegistSchema,
  CreatePreRegistSchema,
  SubmitPreRegistSchema,
  ApprovalSchema,
  GetCurriculumSchema,
};

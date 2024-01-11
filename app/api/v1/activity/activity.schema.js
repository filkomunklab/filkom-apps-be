const Yup = require("yup");

const CreateActivitySchema = Yup.object()
  .shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    dueDate: Yup.date().required("Date is required"),
    isAttendance: Yup.boolean().required("Attendance type is required"),
    activityType: Yup.string().oneOf(["GUIDANCE_CLASS", "MAJOR", "FACULTY"]),
    employeeNik: Yup.string().required("Employee NIK is required"),
    members: Yup.array().required("Members is required"),
  })
  .noUnknown();

const AttendanceSchema = Yup.object().shape({
  activityId: Yup.string().required("Activity Id is required"),
  members: Yup.array()
    .of(
      Yup.string()
        .required("NIM is required")
        .matches(/^[0-9]+$/, {
          message: "NIM must be a number",
          excludeEmptyString: true,
        })
    )
    .min(1, "Members is required")
    .required("Members is required"),
});

const GetStudentListSchema = Yup.object().shape({
  guidanceClassId: Yup.string(),
  major: Yup.string().oneOf(["SI", "IF", "DKV"]),
  faculty: Yup.string(),
});

module.exports = {
  GetStudentListSchema,
  CreateActivitySchema,
  AttendanceSchema,
};

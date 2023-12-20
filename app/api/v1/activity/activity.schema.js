const Yup = require("yup");

const CreateActivitySchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  dueDate: Yup.date().required("Date is required"),
  isAttendance: Yup.boolean().required("Attendance type is required"),
  guidanceClassId: Yup.string().required("Guidance Class Id is required"),
  members: Yup.array().when("isAttendance", {
    is: true,
    then: () =>
      Yup.array()
        .of(
          Yup.object().shape({
            studentNim: Yup.string().required("NIM is required"),
          })
        )
        .min(1, "Members is required")
        .required("Members is required"),
    otherwise: () =>
      Yup.array()
        .max(0, "Members field must be empty array if attendance is false")
        .nullable()
        .required("Members is required"),
  }),
});

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

module.exports = {
  CreateActivitySchema,
  AttendanceSchema,
};

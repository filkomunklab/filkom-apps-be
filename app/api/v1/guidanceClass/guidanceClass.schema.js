const Yup = require("yup");

const CreateGuidanceClassSchema = Yup.object().shape({
  teacherId: Yup.string().required("Name is required"),
  studentList: Yup.array().of(
    Yup.object().shape({
      studentId: Yup.string().required("studentId is required"),
    })
  ),
});

const GetGuidanceClassDetailSchema = Yup.object().shape({
  id: Yup.string().required("Class id is required"),
});

const AddStudentSchema = Yup.object().shape({
  guidanceClassId: Yup.string().required("Class id is required"),
  studentList: Yup.array().of(
    Yup.object().shape({
      studentId: Yup.string().required("studentId is required"),
    })
  ),
});

const DeleteStudentSchema = Yup.object().shape({
  studentList: Yup.array().of(Yup.string().required("studentId is required")),
});

const GetUnassignedSchema = Yup.object().shape({
  major: Yup.string().oneOf(["DKV", "IF", "SI"]).nonNullable(),
});

module.exports = {
  CreateGuidanceClassSchema,
  AddStudentSchema,
  DeleteStudentSchema,
  GetUnassignedSchema,
  GetGuidanceClassDetailSchema,
};

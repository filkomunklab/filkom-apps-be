const yup = require("yup");

const checkFileFormat = (value) => {
  const fileType = value.mimetype;
  return (
    fileType ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
};

const xlsxFileSchema = yup
  .object()
  .shape({
    file: yup
      .mixed()
      .required("An xlsx file is required")
      .test("check-file-format", "Unsupported Format", checkFileFormat),
  })
  .noUnknown();

module.exports = {
  xlsxFileSchema,
};

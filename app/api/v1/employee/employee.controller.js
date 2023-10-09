//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const employeeService = require("./employee.service");

const getAllEmployees = async (req, res) => {
  const employee = await employeeService.getAllEmployees();
  res.send({ status: "OK", data: employee });
};

const getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await employeeService.getEmployeeById(id);
    //Todo: format data
    res.send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createEmployee = async (req, res) => {
  const payload = req.body;
  const employee = await employeeService.createEmployee(payload);
  res.status(201).send({ status: "OK", data: employee });
};

const deleteEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    await employeeService.deleteEmployeeById(id);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const patchEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const employee = await employeeService.updateOrPatchEmployeeById(
      id,
      payload
    );
    res.send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;

    if (
      !(
        payload.nik &&
        payload.password &&
        payload.firstName &&
        payload.lastName
      )
    ) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const employee = await employeeService.updateOrPatchEmployeeById(
      id,
      payload
    );
    res.send({ status: "OK", data: employee });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployeeById,
  patchEmployeeById,
  updateEmployeeById,
};

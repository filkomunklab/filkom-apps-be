//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

const findEmployees = async () => {
  const employee = await prisma.employee.findMany();
  return employee;
};

// @description     Get employee by id
// @used            Submission, Proposal
const findEmployeeById = async (id) => {
  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
  });
  return employee;
};

const findEmployeeByToken = async (token) => {
  const employee = await prisma.employee.findUnique({
    where: {
      token,
    },
  });
  return employee;
};

const insertEmployee = async (payload) => {
  const { nik, password, firstName, lastName, email, Address, phoneNum } = payload;
  const employee = await prisma.employee.create({
    data: {
      nik,
      password,
      firstName,
      lastName,
      email,
      Address,
      phoneNum,
    },
  });
  return employee;
};

const deleteEmployee = async (id) => {
  await prisma.employee.delete({
    where: {
      id,
    },
  });
};

const updateEmployee = async (id, payload) => {
  const { nik, password, firstName, lastName, token } = payload;
  const employee = await prisma.employee.update({
    where: {
      id,
    },
    data: {
      nik,
      password,
      firstName,
      lastName,
      token,
    },
  });
  return employee;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get employee by nik
// @used            Group
const findEmployeeByNIK = async (nik) => {
  const employee = await prisma.employee.findUnique({
    where: {
      nik,
    },
  });
  return employee;
};

module.exports = {
  findEmployees,
  findEmployeeById,
  findEmployeeByToken,
  insertEmployee,
  deleteEmployee,
  updateEmployee,
  findEmployeeByNIK,
};

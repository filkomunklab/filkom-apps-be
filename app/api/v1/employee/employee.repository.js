//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

const findEmployees = async () => {
  const employee = await prisma.employee.findMany();
  return employee;
};

const findEmployeeById = async (id) => {
  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
  });
  return employee;
};

const insertEmployee = async (payload) => {
  const { nik, password, firstName, lastName } = payload;
  const employee = await prisma.employee.create({
    data: {
      nik,
      password,
      firstName,
      lastName,
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
  const { nik, password, firstName, lastName } = payload;
  const employee = await prisma.employee.update({
    where: {
      id,
    },
    data: {
      nik,
      password,
      firstName,
      lastName,
    },
  });
  return employee;
};

module.exports = {
  findEmployees,
  findEmployeeById,
  insertEmployee,
  deleteEmployee,
  updateEmployee,
};

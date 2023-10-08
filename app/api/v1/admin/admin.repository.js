//komunikasi dengan database
const prisma = require("../../../db");

const findAdmins = async () => {
  const admin = await prisma.admin.findMany();
  return admin;
};

const findAdminById = async (id) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return admin;
};

const insertAdmin = async (payload) => {
  const { username, email, password } = payload;
  const admin = await prisma.admin.create({
    data: {
      username,
      email,
      password,
    },
  });
  return admin;
};

const deleteAdmin = async (id) => {
  await prisma.admin.delete({
    where: {
      id,
    },
  });
};

const updateAdmin = async (id, payload) => {
  const { username, email, password } = payload;
  const admin = await prisma.admin.update({
    where: {
      id,
    },
    data: {
      username,
      email,
      password,
    },
  });
  return admin;
};

module.exports = {
  findAdmins,
  findAdminById,
  insertAdmin,
  deleteAdmin,
  updateAdmin,
};

//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

const findAdmins = async () => {
  const admin = await prisma.admin.findMany();
  return admin;
};

const findAdminById = async (id) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id,
      },
    });
    return admin;
  } catch (error) {
    throw error;
  }
};

const findAdminByToken = async (token) => {
  const admin = await prisma.admin.findUnique({
    where: {
      token,
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
  const { username, email, password, token } = payload;
  const admin = await prisma.admin.update({
    where: {
      id,
    },
    data: {
      username,
      email,
      password,
      token,
    },
  });
  return admin;
};

const updatePasswordAdmin = async (id, password) => {
  try {
    const admin = await prisma.admin.update({
      where: {
        id,
      },
      data: {
        password: password,
      },
    });

    return admin;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAdmins,
  findAdminById,
  findAdminByToken,
  insertAdmin,
  deleteAdmin,
  updateAdmin,
  updatePasswordAdmin,
};

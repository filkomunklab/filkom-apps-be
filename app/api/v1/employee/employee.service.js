//Layer untuk handle business logic

const employeeRepository = require("./employee.repository");
const userManagement = require("../user_management/user_namagement.repository");
const studentRepository = require("../student/student.repository");
const userRoleRepository = require("../user_management/user_namagement.repository");
const bcrypt = require("bcrypt");
const prisma = require("../../../database");
const { createHttpStatusError, extractXlsx } = require("../../../utils");

const getAllEmployees = async () => {
  try {
    let employees = await employeeRepository.findEmployees();

    // Gunakan Promise.all untuk menunggu semua promise selesai
    employees = await Promise.all(
      employees.map(async (employee) => {
        try {
          // Dapatkan role untuk setiap employee
          let role = await userRoleRepository.FindUserRoleByUserId(employee.id);
          return { ...employee, role };
        } catch (error) {
          throw error;
        }
      })
    );
    return employees;
  } catch (error) {
    throw error;
  }
};

const getEmployeeById = async (id) => {
  const employee = await employeeRepository.findEmployeeById(prisma, id);
  if (!employee) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return employee;
};

const createEmployee = async (payload) => {
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(payload.password, salt);
  payload = { ...payload, password };
  const employee = await employeeRepository.insertEmployee(payload);
  return employee;
};

const createManyEmployee = async (data) => {
  try {
    let salt, password;
    let userRole = [];

    // push user role untuk keperluan pembuatan create many role
    // role tidak ada di tabel employee jadi di pisahkan untuk keperluan crate many employee
    const dataWithoutRole = data.map((itemEmployee) => {
      salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(itemEmployee.password, salt);

      const { role, ...itemEmployeeWithoutRole } = itemEmployee;
      return {
        ...itemEmployeeWithoutRole,
        password,
      };
    });

    const employee = await employeeRepository.insertManyEmployee(
      prisma,
      dataWithoutRole
    );

    // menggunakan primsa transaction untuk make sure semua proses berhasil baru commit
    // jika ada yang gagal maka akan rollback sehingga consistency data dijaga
    const result = await prisma.$transaction(async (prisma) => {
      try {
        let dataEmployeeWithId = await employeeRepository.findEmployees();

        // pembuatan user role berdasarkan id user employee
        // looping pertama untuk ambil data all employee tanpa role dengan user id
        // looping kedua untuk all employee dengan role tanpa user id
        // looping ketiga untuk push user role
        dataEmployeeWithId.forEach((itemEmployeeWithoutRole) => {
          data.forEach((itemEmployeeWithRole) => {
            if (itemEmployeeWithRole.nik === itemEmployeeWithoutRole.nik) {
              itemEmployeeWithRole.role.forEach((itemRole) => {
                userRole.push({
                  userId: itemEmployeeWithoutRole.id,
                  role: itemRole,
                });
              });
            }
          });
        });
        console.log("ini user role: ", userRole);
        await userRoleRepository.CreateManyRole(prisma, userRole);

        return employee;
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteEmployeeById = async (id) => {
  try {
    await prisma.$transaction(async (prisma) => {
      const employee = await employeeRepository.findEmployeeById(prisma, id);
      await employeeRepository.deleteEmployee(prisma, id);
      await userRoleRepository.deleteUserRoles(prisma, employee.id);
      return;
    });
  } catch (error) {
    throw error;
  }
};

const updateOrPatchEmployeeById = async (id, payload) => {
  await getEmployeeById(id);
  if (payload.password) {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(payload.password, salt);
    payload = { ...payload, password };
  }

  const employee = await employeeRepository.updateEmployee(id, payload);
  return employee;
};

const getEmployeeByMajor = async (major) => {
  try {
    const employee = await employeeRepository.findEmployeeByMajor(major);
    return employee;
  } catch (error) {
    return error;
  }
};

const getDosenDetailProfile = async (classId) => {
  try {
    const employee = await employeeRepository.findDosenDetailProfile(classId);
    return employee;
  } catch (error) {
    return error;
  }
};

const getDekanAndKaprodiByMajor = async (major) => {
  try {
    // ambil nik
    const dekan = await employeeRepository.selectDekan();
    const kaprodi = await employeeRepository.selectKaprodi();

    console.log("ini dekan: ", dekan);
    console.log("ini kaprodi: ", kaprodi);

    // ambil nama dekan berdasarkan nik kemudian tambah key role
    let dekanName = await employeeRepository.selectDekanName(dekan);
    dekanName = dekanName.map((value) => {
      return {
        ...value,
        role: "dekan",
      };
    });

    // ambil nama kaprodi berdasarkan nik dan major kemudian tambah key role
    let kaprodiNameByMajor = await employeeRepository.selectKaprodiNameByMajor(
      major,
      kaprodi
    );
    kaprodiNameByMajor = kaprodiNameByMajor.map((value) => {
      return {
        ...value,
        role: "kaprodi",
      };
    });

    // gabung array dekan dan kaprodi jadi satu array
    const employees = dekanName.concat(kaprodiNameByMajor);

    return employees;
  } catch (error) {
    throw error.message;
  }
};

const assignStudentGuidance = async (payload) => {
  try {
    const employee = await employeeRepository.addStudentGuidanceForLecturer(
      payload
    );
    return employee;
  } catch (error) {
    throw error;
  }
};

const getSupervisorHasStudent = async () => {
  try {
    const employee = await employeeRepository.selectAllSupervisor();

    const employeeHasStudent = employee
      .filter((item) => item.student.length > 0)
      .map((item) => ({
        numberOfStudent: item.student.length,
        ...item,
      }));
    return employeeHasStudent;
  } catch (error) {
    throw error.message;
  }
};

const getSupervisorNoStudent = async () => {
  try {
    const employee = await employeeRepository.selectAllSupervisor();

    const employeeNoStudent = employee
      .filter((item) => item.student.length === 0)
      .map((item) => {
        const { student, ...itemWithoutStudent } = item;
        return itemWithoutStudent;
      });
    return employeeNoStudent;
  } catch (error) {
    throw error.message;
  }
};

const assignSupervisorToStudents = async (employeeNik, nims) => {
  try {
    const updatedRows = await studentRepository.updateEmployeeNikStudentByNim(
      employeeNik,
      nims
    );

    return updatedRows;
  } catch (error) {
    throw error.message;
  }
};

const updateStudentSupervisor = async (employeeNik, nims) => {
  try {
    const updatedRows = await employeeRepository.updateStudentSupervisor(
      employeeNik,
      nims
    );

    return updatedRows;
  } catch (error) {
    throw error.message;
  }
};

const getSupervisorByNik = async (nik) => {
  try {
    const employee = await employeeRepository.getSupervisorByNik(nik);

    return employee;
  } catch (error) {
    throw error.message;
  }
};

const updateEmployeePassword = async (nik, payload) => {
  try {
    if (payload.newPassword !== payload.confirmPassword) {
      throw {
        status: 400,
        message: "Password not match",
      };
    }
    const hashedPassword = await bcrypt.hash(payload.newPassword, 10);
    const data = {
      password: hashedPassword,
    };
    await employeeRepository.updateEmployeeByNik(nik, data);
  } catch (error) {
    throw error;
  }
};
const changeStudentStatus = async (nim, payload) => {
  try {
    return await employeeRepository.setStudentStatus(nim, payload);
  } catch (error) {
    throw error;
  }
};

//--------------------skripsi app-------------------------

//===================================================================
// @description     Get all dosen skripsi
// @route           GET /employee/dosen-skripsi
// @access          OPERATOR_FILKOM
const getAllDosenSkripsi = async () => {
  const dosenSkripsiData = [];
  const dosenSkripsis = await userManagement.findAllUserByRole("DOSEN_MK");
  if (dosenSkripsis) {
    for (const entry of dosenSkripsis) {
      const employee = await employeeRepository.findEmployeeByNIK(entry.userId);
      if (employee) {
        let fullName = employee.firstName;
        if (employee.lastName) {
          fullName += ` ${employee.lastName}`;
        }

        if (employee.degree) {
          fullName += `, ${employee.degree}`;
        }
        const data = {
          employee_id: employee.id,
          role_id: entry.id,
          fullName,
          nidn: employee.nidn,
        };
        dosenSkripsiData.push(data);
      }
    }
  }
  return dosenSkripsiData;
};

//===================================================================
// @description     Get all dosen not dosen skripsi
// @route           GET /employee/dosen
// @access          OPERATOR_FILKOM
const getAllDosen = async () => {
  const dosen = [];
  const employees = await employeeRepository.findEmployees();
  if (employees) {
    for (const entry of employees) {
      // cek jika sudah jadi dosen skripsi
      const isDosenSkripsi = await userManagement.findUserByNIKAndRole(
        entry.nik,
        "DOSEN_MK"
      );
      if (!isDosenSkripsi) {
        // cek jika dosen
        const isDosen = await userManagement.findUserByNIKAndRole(
          entry.nik,
          "DOSEN"
        );
        if (isDosen) {
          let name = entry.firstName;
          // Tambahkan lastName jika ada
          if (entry.lastName) {
            name += ` ${entry.lastName}`;
          }
          // Tambahkan degree jika tidak null
          if (entry.degree) {
            name += `, ${entry.degree}`;
          }
          const data = {
            id: entry.id,
            name,
          };
          dosen.push(data);
        }
      }
    }
  }
  return dosen;
};

//===================================================================
// @description     Create dosen skripsi
// @route           POST /employee/dosen-skripsi
// @access          OPERATOR_FILKOM
const createDosenSkripsi = async (payload) => {
  const employee = await employeeRepository.findEmployeeById(
    payload.employee_id
  );
  if (employee) {
    const existingDosenSkripsi = await userManagement.findUserByNIKAndRole(
      employee.nik,
      "DOSEN_MK"
    );
    if (existingDosenSkripsi) {
      throw {
        status: 400,
        message: `Dosen already has a Dosen Skipsi`,
      };
    }
    const dosenSkripsi = await userManagement.inputRoleByNIK(
      employee.nik,
      "DOSEN_MK"
    );
    return dosenSkripsi;
  } else {
    throw {
      status: 400,
      message: `Dosen not found`,
    };
  }
};

//===================================================================
// @description     Delete dosen skripsi by id
// @route           DELETE /employee/dosen-skripsi/:id
// @access          OPERATOR_FILKOM
const deleteDosenSkripsiById = async (id) => {
  await userManagement.deleteRoleById(id);
};

// employee change password
const changePasswordByEmployee = async (id, payload) => {
  try {
    const employee = await employeeRepository.findEmployeeById(prisma, id);

    if (!employee) {
      throw createHttpStatusError("Your Account is not found!!");
    }

    const checkPassword = bcrypt.compareSync(
      payload.oldPassword,
      employee.password
    );

    if (checkPassword) {
      if (payload.newPassword === payload.confirmationNewPassword) {
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(payload.newPassword, salt);

        const updatePasswordEmployee = await employeeRepository.updateEmployee(
          id,
          { password }
        );

        return updatePasswordEmployee;
      } else {
        throw createHttpStatusError(
          "New Password and Confirmation Do Not Match",
          400
        );
      }
    } else {
      throw createHttpStatusError("Incorrect Old Password", 400);
    }
  } catch (error) {
    throw error;
  }
};

const insertByXlsx = async (file) => {
  const data = extractXlsx(file);
  const normalize = data.map((item) => ({
    nik: item.nik?.toString(),
    firstName: item?.firstName,
    lastName: item.lastName,
    role: item.role,
    major: item.major,
    email: item.email,
    phoneNum: item.phoneNum?.toString(),
  }));

  await prisma.$transaction(async (prisma) => {
    const employeePayload = normalize.map((item) => {
      const { role, ...rest } = item;
      return rest;
    });
    await prisma.employee.createMany({
      data: employeePayload,
      skipDuplicates: true,
    });

    const employees = await prisma.employee.findMany({
      where: {
        nik: {
          in: normalize.map((item) => item.nik),
        },
      },
      select: {
        nik: true,
      },
    });

    const rolePayload = employees.map((employee) => {
      return {
        userId: employee.nik,
        role: normalize.find((item) => item.nik === employee.nik).role,
      };
    });

    await prisma.userRole.createMany({
      data: rolePayload,
      skipDuplicates: true,
    });
  });
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployeeById,
  updateOrPatchEmployeeById,
  getEmployeeByMajor,
  getDosenDetailProfile,
  getDekanAndKaprodiByMajor,
  assignStudentGuidance,
  getSupervisorHasStudent,
  getSupervisorNoStudent,
  assignSupervisorToStudents,
  updateStudentSupervisor,
  getSupervisorByNik,
  createManyEmployee,
  updateEmployeePassword,
  changeStudentStatus,
  insertByXlsx,
  //-----------skripsi app-----------
  getAllDosenSkripsi,
  getAllDosen,
  createDosenSkripsi,
  deleteDosenSkripsiById,
  changePasswordByEmployee,
};

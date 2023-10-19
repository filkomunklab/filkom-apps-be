//Layer untuk handle business logic

const classroomRepository = require("./classroom.repository")
const studentRepository = require("../student/student.repository")
const thesisStudentRepository = require("../thesis_student/thesis_student.repository")

const getExistingClassroom = async (userId, payload) => {
    const classroom = await classroomRepository.findExistingClassroom(userId, payload);
    if (classroom) {
      throw {
        status: 409,
        message: `Data already exists`,
      };
    }
    return classroom;
};

const createClassroom = async (userId, payload) => {
    await getExistingClassroom(userId, payload);
    const classroom = await classroomRepository.insertClassroom(userId, payload);
    return classroom;
};

const getListClassroom = async (userId) => {
  const classroom = await classroomRepository.findListClassroom(userId);
  if (!classroom) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return classroom;
};

const getClassroomById = async (id) => {
  const classroom = await classroomRepository.findClassroomById(id);
  if (!classroom) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return classroom;
};

const getExistStudent = async (student_id) => {
  const thesis_student = await thesisStudentRepository.findThesisStudentByStudentId(student_id);
  if (thesis_student) {
    throw {
      status: 400,
      message: `Some data already exists`,
    };
  }
  return thesis_student;
};

const getExistProposalStudent = async (student_id) => {
  const thesis_student = await thesisStudentRepository.findThesisStudentByStudentId(student_id);
  if (!thesis_student) {
    throw {
      status: 400,
      message: `Some data were not found`,
    };
  }
  return thesis_student;
};

const getExistSkripsiStudent = async (student_id, classroom_id) => {
  const thesis_student = await thesisStudentRepository.findExistSkripsiStudent(student_id, classroom_id);
  if (thesis_student) {
    throw {
      status: 400,
      message: `Some data already exists`,
    };
  }
  return thesis_student;
};

const inputStudents = async (payload) => {
  const {
    classroom_id,
    students,
  } = payload;

  const insertedStudents = [];

  for (const student of students) {
    const nim = student.nim;
    const studentRecord = await studentRepository.findStudentByNim(nim);

    if (studentRecord) {
      const classroom = await classroomRepository.findClassroomById(classroom_id);
      const classroomName = classroom.name;

      if (classroomName === 'Proposal') {
        const existStudent = await getExistStudent(studentRecord.id);

        if (!existStudent) {
          const proposalStudent = await thesisStudentRepository.insertProposalStudent(studentRecord.id, classroom_id);
          insertedStudents.push({ id: proposalStudent.id });
        }
      } else if (classroomName === 'Skripsi') {
        const existProposalStudent = await getExistProposalStudent(studentRecord.id);
        await getExistSkripsiStudent(studentRecord.id, classroom_id);
        
        if (existProposalStudent) {
          const skripsiStudent = await thesisStudentRepository.insertSkripsiStudent(studentRecord.id, classroom_id);
          insertedStudents.push({ id: skripsiStudent.id });
        }
      }
    }
  }
  return insertedStudents;
};

const getAllClassroom = async (userId) => {
  const classrooms = await classroomRepository.findClassroomsByDosenMk(userId);

  // Pisahkan kelas Proposal dan Skripsi
  const proposalClassrooms = classrooms.filter((classroom) => classroom.name === 'Proposal');
  const skripsiClassrooms = classrooms.filter((classroom) => classroom.name === 'Skripsi');

  // Dapatkan mahasiswa untuk setiap kelas
  const proposalClassroomsWithStudents = await getClassroomsWithStudents(proposalClassrooms, 'Proposal');
  const skripsiClassroomsWithStudents = await getClassroomsWithStudents(skripsiClassrooms, 'Skripsi');

  // Gabungkan kelas Proposal dan Skripsi
  const allClassrooms = [...proposalClassroomsWithStudents, ...skripsiClassroomsWithStudents];

  return {
    status: "OK",
    data: allClassrooms,
  };
};

const getClassroomsWithStudents = async (classrooms, classroomName) => {
  const classroomsWithStudents = await Promise.all(
    classrooms.map(async (classroom) => {
      // Dapatkan mahasiswa di kelas ini
      let students;
      if (classroomName === 'Proposal') {
        students = await thesisStudentRepository.findProposalStudentsByClassroomId(classroom.id);
      } else if (classroomName === 'Skripsi') {
        students = await thesisStudentRepository.findSkripsiStudentsByClassroomId(classroom.id);
      }

      const studentData = students.map((student) => ({
        student_id: student.student.id,
        fullname: `${student.student.firstName} ${student.student.lastName || ''}`,
        nim: student.student.nim,
        major: student.student.major,
      }));

      return {
        id: classroom.id,
        dosen_mk_id: classroom.dosen_mk_id,
        academic_id: classroom.academic_id,
        name: classroom.name,
        Students: studentData,
      };
    })
  );

  // Urutkan berdasarkan academic_id dan nama
  const sortedClassrooms = classroomsWithStudents.sort((a, b) => {
    if (a.academic_id === b.academic_id) {
      return a.name.localeCompare(b.name);
    }
    return a.academic_id.localeCompare(b.academic_id);
  });

  return sortedClassrooms;
};


const getExistStudentInProposalClassroom = async (skripsi_class_id) => {
  const classroom = await thesisStudentRepository.findExistStudentInProposalClassroomByClassroomId(skripsi_class_id);
  if (classroom) {
    throw {
      status: 400,
      message: `There are still students in the class`,
    };
  }
  return classroom;
};

const getExistStudentInSkripsiClassroom = async (skripsi_class_id) => {
  const classroom = await thesisStudentRepository.findExistStudentInSkripsiClassroomByClassroomId(skripsi_class_id);
  if (classroom) {
    throw {
      status: 400,
      message: `There are still students in the class`,
    };
  }
  return classroom;
};

const deleteClassroomById = async (id) => {
  const classroom = await getClassroomById(id);
  const classroomName = classroom.name;
  if (classroomName === 'Proposal') {
    await getExistStudentInProposalClassroom(id);
    await classroomRepository.deleteClassroomById(id);
  } else if (classroomName === 'Skripsi') {
    await getExistStudentInSkripsiClassroom(id);
    await classroomRepository.deleteClassroomById(id);
  }
};

const deleteStudentById = async (id) => {
  // await getClassroomById(id);
  await thesisStudentRepository.deleteStudentById(id);
};

module.exports = {
  createClassroom,
  getListClassroom,
  getClassroomById,
  getAllClassroom,
  inputStudents,
  deleteClassroomById,
  deleteStudentById,

}
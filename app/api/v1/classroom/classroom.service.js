//Layer untuk handle business logic

const classroomRepository = require("./classroom.repository")

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

// const getClassroomById = async (id) => {
//   const classroom = await classroomRepository.findClassroomById(id);
//   if (!classroom) {
//     throw {
//       status: 400,
//       message: `Not found`,
//     };
//   }
//   return classroom;
// };

const inputStudents = async (payload) => {
  const {
    classroom_id,
    students,
  } = payload;

  const insertedStudents = [];

  for (const student of students) {
    const nim = student.nim;
    const studentRecord = await classroomRepository.findByNim(nim);

    if (studentRecord) {
      const classroomName = await classroomRepository.findClassroomNameById(classroom_id);

      if (classroomName === 'Proposal') {
        const proposalStudent = await classroomRepository.insertProposalStudent(studentRecord.id, classroom_id);
        insertedStudents.push({ id: proposalStudent.id });
      } else if (classroomName === 'Skripsi') {
        const skripsiStudent = await classroomRepository.insertSkripsiStudent(studentRecord.id, classroom_id);
        insertedStudents.push({ id: skripsiStudent.id });
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
  const proposalClassroomsWithStudents = await getClassroomsWithStudents(proposalClassrooms);
  const skripsiClassroomsWithStudents = await getClassroomsWithStudents(skripsiClassrooms);

  // Gabungkan kelas Proposal dan Skripsi
  const allClassrooms = [...proposalClassroomsWithStudents, ...skripsiClassroomsWithStudents];

  return allClassrooms;
};

const getClassroomsWithStudents = async (classrooms) => {
  const classroomsWithStudents = await Promise.all(
    classrooms.map(async (classroom) => {
      // Dapatkan mahasiswa di kelas ini
      const students = await classroomRepository.findStudentsByClassroomId(classroom.id);

      return {
        ...classroom,
        Students: students,
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

module.exports = {
  createClassroom,
  getAllClassroom,
  inputStudents,

}
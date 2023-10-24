//Layer untuk handle business logic

const classroomRepository = require("./classroom.repository");
const studentRepository = require("../student/student.repository");
const thesisStudentRepository = require("../thesis_student/thesis_student.repository");
const academicCalendarRepository = require("../academic_calendar/academic_calendar.repository");
const proposalStudentRepository = require("../proposal_student/proposal_student.repository");
const skripsiStudentRepository = require("../skripsi_student/skripsi_student.repository");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get existing classroom
// @used            createClassroom,
const getExistingClassroom = async (userId, payload) => {
  const classroom = await classroomRepository.findExistingClassroom(
    userId,
    payload
  );
  if (classroom) {
    throw {
      status: 409,
      message: `Data already exists`,
    };
  }
  return classroom;
};

//===================================================================
// @description     Create classroom
// @route           POST /classroom
// @access          DOSEN_MK
const createClassroom = async (userId, payload) => {
  // find existing classroom
  await getExistingClassroom(userId, payload);

  // create classroom
  const classroom = await classroomRepository.insertClassroom(userId, payload);
  return classroom;
};

//===================================================================
// @description     Get list classroom
// @route           GET /classroom/list
// @access          DOSEN_MK
const getListClassroom = async (userId) => {
  const classroom = await classroomRepository.findListClassroom(userId);
  return classroom;
};

//===================================================================
// @description     Get classroom by id
// @route           GET /classroom/:id
// @access          DOSEN_MK
const getClassroomById = async (id) => {
  const classroom = await classroomRepository.findClassroomById(id);
  if (!classroom) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  // Modify the structure of the classroom object
  classroom.semester = classroom.academic.semester;
  classroom.year = classroom.academic.year;
  delete classroom.academic;

  if (classroom.name === "Proposal") {
    const dataProposalStudents =
      await proposalStudentRepository.findProposalStudentByClassroomId(id);

    classroom.students = dataProposalStudents.map((proposalStudent) => ({
      id: proposalStudent.id,
      student_id: proposalStudent.student.id,
      firstName: proposalStudent.student.firstName,
      lastName: proposalStudent.student.lastName,
      nim: proposalStudent.student.nim,
      major: proposalStudent.student.major,
    }));
  }
  if (classroom.name === "Skripsi") {
    const skripsiStudents =
      await skripsiStudentRepository.findSkripsiStudentByClassroomId(id);

    classroom.students = skripsiStudents.map((skripsiStudent) => ({
      id: skripsiStudent.id,
      student_id: skripsiStudent.student.id,
      firstName: skripsiStudent.student.firstName,
      lastName: skripsiStudent.student.lastName,
      nim: skripsiStudent.student.nim,
      major: skripsiStudent.student.major,
    }));
  }
  // Hapus properti academic_id
  delete classroom.academic_id;

  return classroom;
};

//===================================================================
// @description     Get all classroom
// @route           GET /classroom
// @access          DOSEN_MK
const getAllClassroom = async (userId) => {
  // find all dosen classroom
  const classrooms = await classroomRepository.findClassroomsByDosenMk(userId);
  if (!classrooms || classrooms.length === 0) {
    return classrooms;
  }

  // Iterate through classrooms and fetch students for each classroom
  for (const classroom of classrooms) {
    // Modify the structure of the classroom object
    classroom.semester = classroom.academic.semester;
    classroom.year = classroom.academic.year;
    delete classroom.academic;

    if (classroom.name === "Proposal") {
      // Fetch proposal students for the classroom
      const proposalStudents =
        await proposalStudentRepository.findProposalStudentByClassroomId(
          classroom.id
        );

      classroom.students = proposalStudents.map((proposalStudent) => ({
        id: proposalStudent.id,
        student_id: proposalStudent.student.id,
        firstName: proposalStudent.student.firstName,
        lastName: proposalStudent.student.lastName,
        nim: proposalStudent.student.nim,
        major: proposalStudent.student.major,
      }));
    }
    if (classroom.name === "Skripsi") {
      // Fetch skripsi students for the classroom
      const skripsiStudents =
        await skripsiStudentRepository.findSkripsiStudentByClassroomId(
          classroom.id
        );

      classroom.students = skripsiStudents.map((skripsiStudent) => ({
        id: skripsiStudent.id,
        student_id: skripsiStudent.student.id,
        firstName: skripsiStudent.student.firstName,
        lastName: skripsiStudent.student.lastName,
        nim: skripsiStudent.student.nim,
        major: skripsiStudent.student.major,
      }));
    }
    // Hapus properti academic_id
    delete classroom.academic_id;
  }

  // Sort classrooms based on Academic_Calendar and name
  classrooms.sort((classroomA, classroomB) => {
    if (classroomA.year !== classroomB.year) {
      // Sort by year
      return classroomA.year.localeCompare(classroomB.year);
    } else if (classroomA.semester !== classroomB.semester) {
      // Sort by semester
      return classroomA.semester.localeCompare(classroomB.semester);
    } else {
      // Sort by name
      return classroomA.name.localeCompare(classroomB.name);
    }
  });

  return classrooms;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get existing classroom by id
// @used            inputStudents,
const getExistingClassroomById = async (id) => {
  const classrooom = await classroomRepository.findClassroomById(id);
  if (!classrooom) {
    throw {
      status: 400,
      message: `Classroom doesn't exist`,
    };
  }
  return classrooom;
};

//===================================================================
// @description     Input student into classroom
// @route           POST /classroom/insert-student
// @access          DOSEN_MK
const inputStudents = async (payload) => {
  // check classroom if exist
  const classroom = await getExistingClassroomById(payload.classroom_id);

  // mahasiswa yang berhasil diinput
  const insertedStudents = { classroom_id: classroom.id, students: [] };

  for (const student of payload.students) {
    const nim = student.nim;
    // find student exist in student table
    const existStudent = await studentRepository.findStudentByNim(nim);

    // if input success
    if (existStudent) {
      if (classroom.name === "Proposal") {
        // check exist student in proposal_student
        const existProposalStudent =
          await proposalStudentRepository.findProposalStudentByStudentId(
            existStudent.id,
            classroom.id
          );
        if (existProposalStudent) {
          throw {
            status: 400,
            message: `Student are already in classroom`,
          };
        } else {
          const proposalStudent =
            await proposalStudentRepository.insertProposalStudentByStudentIdAndClassroomId(
              existStudent.id,
              classroom.id
            );
          insertedStudents.students.push({
            id: proposalStudent.id,
            student_id: proposalStudent.student_id,
          });
        }
      }
      if (classroom.name === "Skripsi") {
        // check exist student in skripsi_student
        const existProposalStudent =
          await skripsiStudentRepository.findSkripsiStudentByStudentId(
            existStudent.id,
            classroom.id
          );
        if (existProposalStudent) {
          throw {
            status: 400,
            message: `Student are already in classroom`,
          };
        } else {
          const proposalStudent =
            await skripsiStudentRepository.insertSkripsiStudentByStudentIdAndClassroomId(
              existStudent.id,
              classroom.id
            );
          insertedStudents.students.push({
            id: proposalStudent.id,
            student_id: proposalStudent.student_id,
          });
        }
      }
    } else {
      throw {
        status: 400,
        message: `One or more students doesn't exist`,
      };
    }
  }
  return insertedStudents;
};

//----------------------------------------------------------------------
const getExistingStudentInProposalStudentByProposalId = async (
  classroom_id
) => {
  const proposal_student =
    await proposalStudentRepository.findProposalStudentByProposalId(
      classroom_id
    );
  if (proposal_student) {
    throw {
      status: 400,
      message: `There are still students in the class`,
    };
  }
  return proposal_student;
};

const getExistingStudentInSkripsiStudentByProposalId = async (classroom_id) => {
  const skripsi_student =
    await skripsiStudentRepository.findSkripsiStudentByProposalId(classroom_id);
  if (skripsi_student) {
    throw {
      status: 400,
      message: `There are still students in the class`,
    };
  }
  return skripsi_student;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get existing classroom
// @used            deleteClassroomById,
const getExistClassroomById = async (id) => {
  const classroom = await classroomRepository.findClassroomById(id);
  if (!classroom) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return classroom;
};

//===================================================================
// @description     Delete classroom by id
// @route           DELETE /classroom/:id
// @access          DOSEN_MK
const deleteClassroomById = async (id) => {
  // find if classroom is exist
  const classroom = await getExistClassroomById(id);

  if (classroom.name === "Proposal") {
    // check if classroom is empty
    await getExistingStudentInProposalStudentByProposalId(id);

    // delete classroom
    await classroomRepository.deleteClassroomById(id);
  } else if (classroom.name === "Skripsi") {
    // check if classroom is empty
    await getExistingStudentInSkripsiStudentByProposalId(id);

    // delete classroom
    await classroomRepository.deleteClassroomById(id);
  }
};

//===================================================================
// @description     Delete student by id
// @route           DELETE /classroom/delete-student/:id"
// @access          DOSEN_MK
const deleteStudentById = async (id) => {
  // check if student exist in proposal_student
  const proposalStudent =
    await proposalStudentRepository.findProposalStudentById(id);
  // check if student exist in proposal_student
  const skripsiStudent = await skripsiStudentRepository.findSkripsiStudentById(
    id
  );

  if (proposalStudent) {
    await proposalStudentRepository.deleteProposalStudentById(id);
  }

  if (skripsiStudent) {
    await skripsiStudentRepository.deleteSkripsiStudentById(id);
  }

  if (!proposalStudent && !skripsiStudent) {
    throw {
      status: 400,
      message: `Student not found`,
    };
  }
};

module.exports = {
  createClassroom,
  getListClassroom,
  getClassroomById,
  getAllClassroom,
  inputStudents,
  deleteClassroomById,
  deleteStudentById,
};

//Layer untuk handle business logic

const classroomRepository = require("./classroom.repository");
const studentRepository = require("../student/student.repository");
const thesisStudentRepository = require("../thesis_student/thesis_student.repository");
const academicCalendarRepository = require("../academic_calendar/academic_calendar.repository");
const proposalStudentRepository = require("../proposal_student/proposal_student.repository");
const skripsiStudentRepository = require("../skripsi_student/skripsi_student.repository");
const skripsiRepository = require("../skripsi/skripsi.repository");
const groupStudentRepository = require("../group_student/group_student.repository");
const groupRepository = require("../group/group.repository");
const proposalRepository = require("../proposal/proposal.repository");

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
  const classrooms = await classroomRepository.findListClassroom(userId);
  const classroomList = [];
  for (const entry of classrooms) {
    const classroom = `${entry.name} - Semester ${entry.academic.semester} ${entry.academic.year}`;
    const classroomData = {
      id: entry.id,
      dosen_mk_id: entry.dosen_mk_id,
      classroom,
    };
    classroomList.push(classroomData);
  }
  return classroomList;
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

  const classroomData = {
    id: classroom.id,
    dosen_mk_id: classroom.dosen_mk_id,
    classroom: `${classroom.name} - Semester ${classroom.academic.semester} ${classroom.academic.year}`,
    students: [], // inisialisasi array untuk students
  };

  if (classroom.name === "Proposal") {
    const dataProposalStudents =
      await proposalStudentRepository.findProposalStudentByClassroomId(id);

    // Map and modify student data
    classroomData.students = dataProposalStudents.map((proposalStudent) => {
      const student = proposalStudent.student;
      let fullName = student.firstName;

      if (student.lastName) {
        fullName += ` ${student.lastName}`;
      }

      return {
        id: proposalStudent.id,
        student_id: student.id,
        fullName,
        nim: student.nim,
        major: student.major,
      };
    });
  }
  if (classroom.name === "Skripsi") {
    const skripsiStudents =
      await skripsiStudentRepository.findSkripsiStudentByClassroomId(id);

    // Map and modify student data
    classroomData.students = skripsiStudents.map((skripsiStudent) => {
      const student = skripsiStudent.student;
      let fullName = student.firstName;

      if (student.lastName) {
        fullName += ` ${student.lastName}`;
      }

      return {
        id: skripsiStudent.id,
        student_id: student.id,
        fullName,
        nim: student.nim,
        major: student.major,
      };
    });
  }

  return classroomData;
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

  const classroomsData = [];

  // Iterate through classrooms and fetch students for each classroom
  for (const classroom of classrooms) {
    const classroomData = {
      id: classroom.id,
      dosen_mk_id: classroom.dosen_mk_id,
      classroom: `${classroom.name} - Semester ${classroom.academic.semester} ${classroom.academic.year}`,
      students: [],
      academic: classroom.academic, // Tambahkan properti academic ke dalam classroomData
    };

    if (classroom.name === "Proposal") {
      const proposalStudents =
        await proposalStudentRepository.findProposalStudentByClassroomId(
          classroom.id
        );

      classroomData.students = proposalStudents.map((proposalStudent) => {
        const student = proposalStudent.student;
        let fullName = student.firstName;

        if (student.lastName) {
          fullName += ` ${student.lastName}`;
        }

        return {
          id: proposalStudent.id,
          student_id: student.id,
          fullName,
          nim: student.nim,
          major: student.major,
        };
      });
    }
    if (classroom.name === "Skripsi") {
      const skripsiStudents =
        await skripsiStudentRepository.findSkripsiStudentByClassroomId(
          classroom.id
        );

      classroomData.students = skripsiStudents.map((skripsiStudent) => {
        const student = skripsiStudent.student;
        let fullName = student.firstName;

        if (student.lastName) {
          fullName += ` ${student.lastName}`;
        }

        return {
          id: skripsiStudent.id,
          student_id: student.id,
          fullName,
          nim: student.nim,
          major: student.major,
        };
      });
    }

    classroomsData.push(classroomData);
  }

  // Sort classroomsData based on the specified criteria
  classroomsData.sort((classroomA, classroomB) => {
    // Sort by year (descending order)
    const yearComparison = classroomB.academic.year.localeCompare(
      classroomA.academic.year
    );

    // Sort by semester (ganjil, genap, padat)
    const semesterOrder = { Ganjil: 1, Genap: 2, Padat: 3 };
    const semesterComparison =
      semesterOrder[classroomA.academic.semester] -
      semesterOrder[classroomB.academic.semester];

    // Sort by name (proposal, skripsi)
    const nameOrder = { Proposal: 1, Skripsi: 2 };
    const nameComparison =
      nameOrder[classroomA.name] - nameOrder[classroomB.name];

    if (yearComparison !== 0) {
      return yearComparison;
    } else if (semesterComparison !== 0) {
      return semesterComparison;
    } else {
      return nameComparison;
    }
  });

  return classroomsData;
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
          // get group_student by student id (many)
          const groupStudents =
            await groupStudentRepository.findGroupStudentByStudentId(
              existStudent.id
            );
          // looping to get proposal active/finish
          for (const entry of groupStudents) {
            // get group by id
            const group = await groupRepository.findGroupById(entry.group_id);
            // check if proposal is not fail an
            if (group.progress === "Skripsi") {
              const skripsi = await skripsiRepository.findSkripsiById(
                group.skripsi_id
              );
              if (skripsi.is_pass !== "Fail") {
                // insert student skripsi
                const skripsiStudent =
                  await skripsiStudentRepository.insertSkripsiStudentByStudentIdAndClassroomId(
                    existStudent.id,
                    classroom.id
                  );
                insertedStudents.students.push({
                  id: skripsiStudent.id,
                  student_id: skripsiStudent.student_id,
                });

                if (skripsiStudent) {
                  // get skripsi
                  await skripsiRepository.updateSkripsiClassroomById(
                    group.skripsi_id,
                    classroom.id
                  );
                }
              }
            }
          }
          throw {
            status: 400,
            message: `Student haven't completed proposal`,
          };
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

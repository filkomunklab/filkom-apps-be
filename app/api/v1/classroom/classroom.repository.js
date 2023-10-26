//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get existing classroom
// @used            getExistingClassroom,
const findExistingClassroom = async (userId, payload) => {
  const { academic_id, name } = payload;
  const academic = await prisma.classroom.findFirst({
    where: {
      dosen_mk_id: userId,
      academic_id,
      name,
    },
  });
  return academic;
};

//===================================================================
// @description     Create classroom
// @route           POST /classroom
// @access          DOSEN_MK
const insertClassroom = async (userId, payload) => {
  const { academic_id, name } = payload;
  const academic = await prisma.classroom.create({
    data: {
      dosen_mk_id: userId,
      academic_id,
      name,
    },
  });

  return academic;
};

//===================================================================
// @description     Get list classroom
// @route           GET /classroom/list
// @access          DOSEN_MK
const findListClassroom = async (dosen_mk_id) => {
  const classroom = await prisma.classroom.findMany({
    where: {
      dosen_mk_id,
    },
  });
  return classroom;
};

//===================================================================
// @description     Get classroom by id
// @route           GET /classroom/:id
// @access          DOSEN_MK
// @used            getClassroomById, getExistingClassroomById, getExistClassroomById
const findClassroomById = async (id) => {
  const classroom = await prisma.classroom.findUnique({
    where: {
      id,
    },
    include: {
      academic: true,
    },
  });
  return classroom;
};

//===================================================================
// @description     Get all classroom
// @route           GET /classroom
// @access          DOSEN_MK
// @used            Group
const findClassroomsByDosenMk = async (dosen_mk_id) => {
  const classrooms = await prisma.classroom.findMany({
    where: {
      dosen_mk_id,
    },
    include: {
      academic: true,
    },
  });
  return classrooms;
};

//===================================================================
// @description     Delete classroom by id
// @route           DELETE /classroom/:id
// @access          DOSEN_MK
const deleteClassroomById = async (id) => {
  await prisma.classroom.delete({
    where: {
      id,
    },
  });
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get classroom by id & dosen_mk_id
// @used            Submission
const findClassroomByIdAndDosenMK = async (id, dosen_mk_id) => {
  const classroom = await prisma.classroom.findFirst({
    where: {
      id,
      dosen_mk_id,
    },
  });
  return classroom;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get classroom by dosen_mk_id & name
// @used            Submission
const findClassroomsByDosenMkAndName = async (dosen_mk_id, name) => {
  const classrooms = await prisma.classroom.findMany({
    where: {
      dosen_mk_id,
      name,
    },
    include: {
      academic: true,
    },
  });
  return classrooms;
};

module.exports = {
  findExistingClassroom,
  insertClassroom,
  findListClassroom,
  findClassroomById,
  findClassroomsByDosenMk,
  findClassroomById,
  deleteClassroomById,
  findClassroomByIdAndDosenMK,
  findClassroomsByDosenMkAndName,
};

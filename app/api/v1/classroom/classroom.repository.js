//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// Fungsi untuk mencari data classroom yang sudah ada
const findExistingClassroom = async (userId, payload) => {
    const {
        academic_id,
        name,
    } = payload;
    const academic = await prisma.classroom.findFirst({
        where: {
            dosen_mk_id: userId,
            academic_id,
            name,
        },
    });
    return academic;
}

// create classroom
const insertClassroom = async (userId, payload) => {
    const {
        academic_id,
        name,
    } = payload;
    const academic = await prisma.classroom.create({
      data: {
        dosen_mk_id: userId,
        academic_id,
        name,
      },
    });
  
    return academic;
};

// get all academic
const findListClassroom = async (dosen_mk_id) => {
    const classroom = await prisma.classroom.findMany({
        where:{
            dosen_mk_id
        }
    });
    return classroom;
};

// Mendapatkan nama classroom berdasarkan classroom_id
const findClassroomById = async (id) => {
    const classroom = await prisma.classroom.findUnique({
        where: {
            id,
        }
    });
    console.log("classroom name: ", classroom.name);
    return classroom;
}

// mencari classroom dari dosenMK
const findClassroomsByDosenMk = async (dosen_mk_id) => {
    const classrooms = await prisma.classroom.findMany({
      where: {
        dosen_mk_id,
      },
    });
    return classrooms;
};

// hapus 1 classroom
const deleteClassroomById = async (id) => {
    await prisma.classroom.delete({
        where: {
            id,
        },
    });
};

module.exports = {
    findExistingClassroom,
    insertClassroom,
    findListClassroom,
    findClassroomById,
    findClassroomsByDosenMk,
    findClassroomById,
    deleteClassroomById,

}
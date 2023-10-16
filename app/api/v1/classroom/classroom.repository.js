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

// Menemukan student berdasarkan NIM
const findByNim = async (nim) => {
    const student = await prisma.student.findUnique({
        where: {
            nim,
        },
    });
    console.log("student: ", student.id);
    return student;
}

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

// Fungsi untuk mencari data student yang sudah ada di thesis_student
const findExistStudent = async (student_id) => {
    const thesis_student = await prisma.thesis_Student.findUnique({
        where: {
            student_id
        },
    });
    return thesis_student;
}

// Fungsi untuk mencari data student yang sudah ada di thesis_student
const findExistSkripsiStudent = async (student_id, classroom_id) => {
    const thesis_student = await prisma.thesis_Student.findUnique({
        where: {
            student_id,
            skripsi_class_id: classroom_id,
        },
    });
    return thesis_student;
}

// Menyisipkan data student ke dalam proposal_student
const insertProposalStudent = async (student_id, classroom_id) => {
    const proposalStudent = await prisma.thesis_Student.create({
        data: {
            student_id,
            proposal_class_id: classroom_id,
        },
    });
    console.log("proposal student: ", proposalStudent.id);
    return proposalStudent;
}

// Menyisipkan data student ke dalam skripsi_student
const insertSkripsiStudent = async (student_id, classroom_id) => {
    const skripsiStudent = await prisma.thesis_Student.update({
        where: {
            student_id
        },
        data: {
            skripsi_class_id: classroom_id,
        },
    });
    console.log("skripsi student: ", skripsiStudent.id);
    return skripsiStudent;
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

// mencari proposal student berdasarkan classroom
const findProposalStudentsByClassroomId = async (classroomId) => {
    const students = await prisma.thesis_Student.findMany({
      where: {
        proposal_class_id: classroomId,
      },
      include: {
        student: true,
      },
    });
    return students;
};

// mencari skripsi student berdasarkan classroom
const findSkripsiStudentsByClassroomId = async (classroomId) => {
    const students = await prisma.thesis_Student.findMany({
      where: {
        skripsi_class_id: classroomId,
      },
      include: {
        student: true,
      },
    });
    return students;
};

const findExistStudentInProposalClassroom = async (proposal_class_id) => {
    const students = await prisma.thesis_Student.findFirst({
        where: {
          proposal_class_id,
        },
    });
    return students;
}

const findExistStudentInSkripsiClassroom = async (skripsi_class_id) => {
    const students = await prisma.thesis_Student.findFirst({
        where: {
          skripsi_class_id,
        },
    });
    return students;
}

// hapus 1 classroom
const deleteClassroomById = async (id) => {
    await prisma.classroom.delete({
        where: {
            id,
        },
    });
};

// hapus 1 thesis_student
const deleteStudentById = async (student_id) => {
    await prisma.thesis_Student.delete({
        where: {
            student_id,
        },
    });
};

module.exports = {
    findExistingClassroom,
    insertClassroom,
    findListClassroom,
    findClassroomById,
    findClassroomsByDosenMk,
    findProposalStudentsByClassroomId,
    findSkripsiStudentsByClassroomId,
    findByNim,
    findClassroomById,
    findExistStudent,
    findExistSkripsiStudent,
    insertProposalStudent,
    insertSkripsiStudent,
    deleteClassroomById,
    findExistStudentInProposalClassroom,
    findExistStudentInSkripsiClassroom,
    deleteStudentById,

}
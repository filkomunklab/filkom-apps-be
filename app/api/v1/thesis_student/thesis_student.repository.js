//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// find student
const findThesisStudentByStudentId = async (student_id) => {
    const thesis_student = await prisma.thesis_Student.findUnique({
      where: {
        student_id,
      },
    });
    return thesis_student;
};

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

const findExistStudentInProposalClassroomByClassroomId = async (proposal_class_id) => {
    const students = await prisma.thesis_Student.findFirst({
        where: {
          proposal_class_id,
        },
    });
    return students;
}

const findExistStudentInSkripsiClassroomByClassroomId = async (skripsi_class_id) => {
    const students = await prisma.thesis_Student.findFirst({
        where: {
          skripsi_class_id,
        },
    });
    return students;
}

// hapus 1 thesis_student
const deleteStudentById = async (student_id) => {
    await prisma.thesis_Student.delete({
        where: {
            student_id,
        },
    });
};
module.exports = {
    findThesisStudentByStudentId,
    findExistSkripsiStudent,
    insertProposalStudent,
    insertSkripsiStudent,
    findProposalStudentsByClassroomId,
    findSkripsiStudentsByClassroomId,
    findExistStudentInProposalClassroomByClassroomId,
    findExistStudentInSkripsiClassroomByClassroomId,
    deleteStudentById,
    
}
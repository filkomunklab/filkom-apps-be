//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// @description     Get thesis student by student_id
// @used            Classroom
const findThesisStudentByStudentId = async (student_id) => {
    const thesis_student = await prisma.thesis_Student.findUnique({
      where: {
        student_id,
      },
    });
    return thesis_student;
};

// @description     Get exist skripsi student by student_id & classroom_id
// @used            Classroom
const findExistSkripsiStudent = async (student_id, classroom_id) => {
    const thesis_student = await prisma.thesis_Student.findUnique({
        where: {
            student_id,
            skripsi_class_id: classroom_id,
        },
    });
    return thesis_student;
}

// @description     Create thesis_student by student_id & classroom_id
// @used            Classroom
const insertProposalStudent = async (student_id, classroom_id) => {
    const proposalStudent = await prisma.thesis_Student.create({
        data: {
            student_id,
            proposal_class_id: classroom_id,
        },
    });
    return proposalStudent;
}

// @description     Update skripsi_classroom by student_id & classroom_id
// @used            Classroom
const insertSkripsiStudent = async (student_id, classroom_id) => {
    const skripsiStudent = await prisma.thesis_Student.update({
        where: {
            student_id
        },
        data: {
            skripsi_class_id: classroom_id,
        },
    });
    return skripsiStudent;
}

// @description     Get all student in proposal_classroom by classroom_id
// @used            Classroom
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

// @description     Get all student in skripsi_classroom by classroom_id
// @used            Classroom
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

// @description     Get exist student in proposal_classroom by classroom_id
// @used            Classroom
const findExistStudentInProposalClassroomByClassroomId = async (proposal_class_id) => {
    const students = await prisma.thesis_Student.findFirst({
        where: {
          proposal_class_id,
        },
    });
    return students;
}

// @description     get exist student in skripsi_classroom by classroom_id
// @used            Classroom
const findExistStudentInSkripsiClassroomByClassroomId = async (skripsi_class_id) => {
    const students = await prisma.thesis_Student.findFirst({
        where: {
          skripsi_class_id,
        },
    });
    return students;
}

// @description     Delete thesis_student by student_id
// @used            Classroom
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
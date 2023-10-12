//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// Main - get kelompok mahasiswa
const findSubmissionListById = async (student_id) => {
    // Mengambil semua entri dalam tabel Group_Student yang memiliki student_id yang sesuai
    const group_students = await prisma.group_Student.findMany({
        where: {
            student_id,
        },
    });

    // Untuk setiap entri dalam group_students, Anda dapat mengambil ID grupnya
    const groupIds = group_students.map((groupStudent) => groupStudent.group_id);

    // await findGroup(groupIds);
    const groups = await findGroup(groupIds);

    return groups;
};

// Mencari grup dengan data submission
const findGroup = async (groupIds) => {
    const groups = await findGroupsByIds(groupIds);
    const groupsWithSubmissionData = await combineSubmissionData(groups);
    return groupsWithSubmissionData;
}

// Mencari grup berdasarkan ID grup
const findGroupsByIds = async (groupIds) => {
    const groups = await prisma.group.findMany({
        where: {
            id: {
                in: groupIds,
            },
        },
        select: {
            id: true,
            progress: true,
            title: true,
            submission_id: true,
        },
    });
    return groups;
}

// Menggabungkan data submission ke dalam grup
const combineSubmissionData = async (groups) => {
    for (const group of groups) {
        const submissionId = group.submission_id;
        if (submissionId) {
            group.submission = await findSubmissionById(submissionId);
        }
    }
    return groups;
}

// Mencari data submission berdasarkan submission_id
const findSubmissionById = async (submissionId) => {
    const submission = await prisma.submission.findUnique({
        where: {
            id: submissionId,
        },
        select: {
            is_approve: true,
        },
    });
    return submission;
}

// Main - get submission details - beranda
// const findSubmissionDetailsById = async

// // get kelompok mahasiswa
// const findGroupStudentById = async (id) => {
//     const group_student = await prisma.group_Student.findUnique({
//         where: {
//             id,
//         },
//     });
//     return group_student;
// };

// // mengisi/memberbarui metadata
// const updateMetadata = async (id, payload) => {
//     const {
//         keywords,
//         abstrak,
//         reference,
//     } = payload;
//     const group = await prisma.group.update({
//         where: {
//             id,
//         },
//         data: {
//             keywords,
//             abstrak,
//             reference,
//         },
//     });
//     return group;
// };

// // get metadata
// const findMetadataById = async (id) => {
//     const group = await prisma.group.findUnique({
//         where: {
//             id,
//         },
//     });
//     return group;
// };

module.exports = {
    findSubmissionListById,
    // findGroupStudentById,
    // updateMetadata,
    // findMetadataById,
}
//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// @description     Get group by submission_id
// @used            Submission
const findGroupBySubmissionId = async (submission_id) => {
    const group = await prisma.group.findUnique({
      where: {
        submission_id,
      },
    });
    return group;
};

// @description     Create group from submission by title & submission_id
// @used            Submission
const insertGroup = async (payload, submission_id) => {
    const {
      title
    } = payload;
    const group = await prisma.group.create({
      data: {
        title,
        progress: "Submission",
        submission_id
      },
    });
  
    return group;
};

// @description     Update group title by submission_id
// @used            Submission
const updateGroupTitleBySubmissionId = async (id, payload) => {
    const { title } = payload;
        const group = await prisma.group.update({
            where: {
            submission_id: id,
            },
            data: {
                title,
                updated_at: new Date(),
            },
    });
    return group;
}

// @description     Update proposal_id by submission_id
// @used            Submission
const updateGroupProposalIdBySubmissionId = async (submission_id, proposal_id) => {
    const group = await prisma.group.update({
        where: {
            submission_id,
        },
        data: {
            proposal_id,
        },
    });
    return group;
}

// @description     Update proposal_id by submission_id
// @used            Submission
const updateGroupSkripsiIdBySubmissionId = async (submission_id, skripsi_id) => {
    const group = await prisma.group.update({
        where: {
            submission_id,
        },
        data: {
            skripsi_id,
        },
    });

    return group;
}



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
const findSubmissionDetailsById = async (id) => {
    const students = await prisma.group_Student.findMany({
        where: {
            group_id: id,
        },
        select: {
            student_id: true,
        },
    });

    // const studentIds = students.map((groupStudent) => groupStudent.student_id);
    const group = await findTitleById(id);
    submission_id = group.submission_id;
    const submission = await findSubmissionById(submission_id);
    const groupData = {
        group_id: group.id, 
        title: group.title,
        students: students.map(student => student.student_id),
        is_approve: submission.is_approve,
    };

    return groupData;
}

const findTitleById =  async (id) => {
    const group = await prisma.group.findUnique({
        where: {
            id,
        },
    });

    // const { id: submission_id } = group;

    // const submission = await findSubmissionById(submission_id);

    return group;
}

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
    findGroupBySubmissionId,
    insertGroup,
    updateGroupTitleBySubmissionId,
    updateGroupProposalIdBySubmissionId,
    updateGroupSkripsiIdBySubmissionId,
    
    findSubmissionListById,
    findSubmissionDetailsById,
    // findGroupStudentById,
    // updateMetadata,
    // findMetadataById,
}
//Layer untuk handle business logic

const consultationRepository = require("./consultation.repository");
const groupRepository = require("../group/group.repository");
const proposalRepository = require("../proposal/proposal.repository");
const employeeRepository = require("../employee/employee.repository");

//===================================================================
// @description     Create consultation
// @route           POST /consultation
// @access          DOSEN
const createConsultation = async (userId, payload) => {
  // check group
  const group = await groupRepository.findGroupById(payload.group_id);
  if (!group) {
    throw {
      status: 400,
      message: `Group not found`,
    };
  }
  // check proposal
  const proposal = await proposalRepository.findProposalById(group.proposal_id);
  if (
    userId === proposal.advisor_id ||
    userId === proposal.co_advisor1_id ||
    userId === proposal.co_advisor2_id
  ) {
    // Mengonversi format tanggal
    const userDate = payload.date;
    const [day, month, year] = userDate.split("/");
    const isoDate = `${year}-${month}-${day}T00:00:00.000Z`;
    const consultation = await consultationRepository.insertConsultation(
      { ...payload, date: isoDate }, // Menggunakan tanggal yang telah dikonversi
      userId
    );
    return consultation;
  }
  if (
    !userId === proposal.advisor_id &&
    !userId === proposal.co_advisor1_id &&
    !userId === proposal.co_advisor2_id
  ) {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }
};

//===================================================================
// @description     Get all consultation by group id
// @route           GET /consultation/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getAllConsultationByGroupId = async (id) => {
  const consultations =
    await consultationRepository.findAllConsultationByGroupId(id);
  if (!consultations) {
    throw {
      status: 400,
      message: `Consultation not found`,
    };
  }

  const consultationData = {
    group_id: id,
    constultation: [],
  };
  for (const entry of consultations) {
    const employee = await employeeRepository.findEmployeeById(entry.dosen_id);
    let name = employee.firstName;

    if (employee.lastName) {
      name += ` ${employee.lastName}`;
    }

    if (employee.degree) {
      name += `, ${employee.degree}`;
    }
    const data = {
      id: entry.id,
      description: entry.description,
      date: entry.date,
      dosen: name,
    };
    consultationData.constultation.push(data);
  }
  return consultationData;
};

module.exports = {
  createConsultation,
  getAllConsultationByGroupId,
};

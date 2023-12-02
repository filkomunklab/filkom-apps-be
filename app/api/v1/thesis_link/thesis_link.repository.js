//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

//===================================================================
// @description     Create link
// @route           POST /skripsi/link
// @access          MAHASISWA
const insertLink = async (group_id, payload) => {
  const { name, link } = payload;
  const thesisLink = await prisma.thesis_Link.create({
    data: {
      group_id,
      name,
      link,
      date: new Date(),
    },
  });
  return thesisLink;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get link by id
// @used            Group
const findLinkById = async (id) => {
  const thesisLink = await prisma.thesis_Link.findUnique({
    where: {
      id,
    },
  });
  return thesisLink;
};

//===================================================================
// @description     Update link
// @route           PUT /skripsi/link/:id
// @access          MAHASISWA
const updateLinkByLinkId = async (id, payload) => {
  const { name, link } = payload;
  const thesisLink = await prisma.thesis_Link.update({
    where: {
      id,
    },
    data: {
      name,
      link,
      date: new Date(),
    },
  });
  return thesisLink;
};

//===================================================================
// @description     Delete link
// @route           DELETE /skripsi/link/:id
// @access          MAHASISWA
const deleteLinkByLinkId = async (id) => {
  await prisma.thesis_Link.delete({
    where: {
      id,
    },
  });
};

//===================================================================
// @description     Get link all link
// @route           GET /group/skripsi/all-link/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN
const findAllLinkById = async (group_id) => {
  const thesisLink = await prisma.thesis_Link.findMany({
    where: {
      group_id,
    },
  });
  return thesisLink;
};

module.exports = {
  insertLink,
  findLinkById,
  updateLinkByLinkId,
  deleteLinkByLinkId,
  findAllLinkById,
};

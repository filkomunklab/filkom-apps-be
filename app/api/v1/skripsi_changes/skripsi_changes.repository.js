//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Create empty change for group by panelist team
// @used            Skripsi,
const insertEmptySkripsiChanges = async (skripsi_id, dosen_id) => {
  const skripsiChanges = await prisma.skripsi_Changes.create({
    data: {
      skripsi_id,
      dosen_id,
    },
  });

  return skripsiChanges;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get skripsi_changes by skripsi_id, & dosen_id
// @used            Skripsi,
const findSkripsiChangesBySkripsiIdAndDosenId = async (
  skripsi_id,
  dosen_id
) => {
  const skripsiChanges = await prisma.skripsi_Changes.findFirst({
    where: {
      skripsi_id,
      dosen_id,
    },
  });
  return skripsiChanges;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Update skripsi change by id
// @used            Skripsi,
const updateSkripsiChangeById = async (id, changes) => {
  const skripsiChanges = await prisma.skripsi_Changes.update({
    where: {
      id,
    },
    data: {
      changes,
    },
  });

  return skripsiChanges;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get all skripsi_changes by skripsi_id
// @used            Skripsi
const findAllSkripsiChangesBySkripsiId = async (skripsi_id) => {
  const skripsiChanges = await prisma.skripsi_Changes.findMany({
    where: {
      skripsi_id,
    },
  });
  return skripsiChanges;
};

module.exports = {
  insertEmptySkripsiChanges,
  findSkripsiChangesBySkripsiIdAndDosenId,
  updateSkripsiChangeById,
  findAllSkripsiChangesBySkripsiId,
};

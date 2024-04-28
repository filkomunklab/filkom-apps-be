const { get } = require("firebase/database");
const prisma = require("../../../database");

//======================ACADEMIC GUIDE=======================
//Create Academic Guide
const postAcademicGuide = async (payload) => {
  const { data } = payload;
  return await prisma.aKAD_guide.createMany({
    data,
  });
};

const changeAcademicGuide = async (content, id) => {
  return await prisma.aKAD_guide.updateMany({
    where: {
      id,
    },
    data: {
      content,
    },
  });
};

const getAcademicGuide = async () => {
  return await prisma.aKAD_guide.findMany({
    orderBy: { number: "asc" },
    select: {
      type: true,
      number: true,
      title: true,
      content: true,
    },
  });
};

//======================VISI, MISI, & TUJUAN=======================
//Create Visi, misi, dan Tujuan
const postVmt = async (payload) => {
  const { data } = payload;
  return await prisma.aKAD_Vmt.createMany({
    data,
  });
};

//visi misi tujuan universitas
const getVisiMisiTujuan = async () => {
  return await prisma.aKAD_Vmt.findMany({
    where: {
      level: "universitas",
    },
    orderBy: { number: "asc" },
  });
};

const getVisiMisiTujuanFakultas = async () => {
  return await prisma.aKAD_Vmt.findMany({
    where: {
      AND: [{ level: "filkom" }, { major: null }],
    },
    orderBy: { number: "asc" },
  });
};

const getVisiMisiTujuanProdiIF = async () => {
  return await prisma.aKAD_Vmt.findMany({
    where: {
      AND: [{ level: "prodi" }, { major: "IF" }],
    },
    orderBy: { number: "asc" },
  });
};

const getVisiMisiTujuanSI = async () => {
  return await prisma.aKAD_Vmt.findMany({
    where: {
      major: "SI",
    },
    orderBy: { number: "asc" },
  });
};

const getVisiMisiTujuanTI = async () => {
  return await prisma.aKAD_Vmt.findMany({
    where: {
      major: "TI",
    },
    orderBy: { number: "asc" },
  });
};

//update visi, misi, dan tujuan
const changeVmt = async (payload, id) => {
  const { type, major, level, content } = payload;
  return await prisma.aKAD_Vmt.updateMany({
    where: {
      id,
    },
    data: {
      type,
      major,
      level,
      content,
    },
  });
};

module.exports = {
  postAcademicGuide,
  postVmt,
  changeAcademicGuide,
  changeVmt,
  getAcademicGuide,
  getVisiMisiTujuan,
  getVisiMisiTujuanFakultas,
  getVisiMisiTujuanProdiIF,
  getVisiMisiTujuanSI,
  getVisiMisiTujuanTI,
};

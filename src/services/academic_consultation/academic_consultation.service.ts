import prisma from "@database";
import { Prisma } from "@prisma/client";

const create = async (
  data: Prisma.AKAD_Academic_ConsultationUncheckedCreateInput
) => {
  return await prisma.aKAD_Academic_Consultation.create({
    data,
  });
};

const getByUID = async (userId: string) => {
  return await prisma.aKAD_Academic_Consultation.findMany({
    where: {
      OR: [{ studentId: userId }, { receiverId: userId }],
    },
  });
};

const getDetail = async (userId: string, id: string) => {
  return await prisma.aKAD_Academic_Consultation.findUnique({
    where: {
      id,
      OR: [{ studentId: userId }, { receiverId: userId }],
    },
  });
};

const update = async (
  id: string,
  data: Prisma.AKAD_Academic_ConsultationUncheckedUpdateInput
) => {
  return await prisma.aKAD_Academic_Consultation.update({
    where: { id },
    data,
  });
};

export default { create, getByUID, getDetail, update };

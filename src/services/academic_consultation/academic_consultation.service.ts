import prisma from "@database";
import { Prisma } from "@prisma/client";

const create = async (
  data: Prisma.AKAD_Academic_ConsultationUncheckedCreateInput
) => {
  return await prisma.aKAD_Academic_Consultation.create({
    data,
  });
};

export default { create };

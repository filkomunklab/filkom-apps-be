const sptRepository = require("./spt.repository");

const getAllSPT = async () => {
    return await sptRepository.findSPT();
};

const getSPTById = async (id) => {
    const spt = await sptRepository.findSPTById(id);
    if (!spt) {
        throw {
            status: 404,
            message: `Not found`,
        };
    }
    return spt;
};

const createSPT = async (dataSPT) => {
    return await sptRepository.insertSPT(dataSPT);
}

module.exports = {
    getAllSPT,
    getSPTById,
    createSPT,
}

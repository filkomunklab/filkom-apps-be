//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const sptService = require("./spt.service");

const getAllSPT = async (req, res) => {
    try {
        const spt = await sptService.getAllSPT();
        res.send({ status: "OK", data: spt });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getSPTById = async (req, res) => {
    try {
        const id = req.params.id;
        const spt = await sptService.getSPTById(id);
        res.send({ status: "OK", data: spt });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const submitSPT = async (req, res) => {
    try {
        const dataSPT = req.body;
        const spt = await sptService.createSPT(dataSPT);
        res.status(201).send({ status: "OK", data: spt });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllSPT,
    getSPTById,
    submitSPT,
}

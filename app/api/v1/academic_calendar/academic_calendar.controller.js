//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const academicService = require("./academic_calendar.service");
const { policyFor } = require("../policy");

const createAcademic = async (req, res) => {
    try {
        const policy = policyFor(req.user);
        if (policy.can("create", "Academic_Calendar")) {
            const payload = req.body;
            if (
                !(
                    payload.semester  &&
                    payload.year
                )
            ) {
                return res
                .status(400)
                .send({ status: "FAILED", data: { error: "Some field is missing" } });
            }
            const academic = await academicService.createAcademic(payload);
            res.status(201).send({ status: "OK", data: academic });
        } else {
            res.status(403).send({
                status: "FAILED",
                data: { message: "You don't have permission to create new academic calendar" },
            });
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
    
};

const getAcademicById = async (req, res) => {
    try {
        const policy = policyFor(req.user);
        if (policy.can("read", "Academic_Calendar")) {
            const id = req.params.id;
            const academic = await academicService.getAcademicById(id);
            res.status(200).send({ status: "OK", data: academic });
        } else {
            res.status(403).send({
                status: "FAILED",
                data: { message: "You don't have permission to get academic calendar" },
            });
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getAllAcademic = async (req, res) => {
    try {
        const policy = policyFor(req.user);
        if (policy.can("read", "Academic_Calendar")) {
            const academic = await academicService.getAllAcademic();
            res.status(200).send({ status: "OK", data: academic });
        } else {
            res.status(403).send({
                status: "FAILED",
                data: { message: "You don't have permission to get all academic calendar" },
            });
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    createAcademic,
    getAcademicById,
    getAllAcademic,

}
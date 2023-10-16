//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const classroomService = require("./classroom.service");
const { policyFor } = require("../policy");

const createClassroom = async (req, res) => {
    try {
        const policy = policyFor(req.user);
        if (policy.can("create", "Classroom")) {
            const userId = req.user.user.id;
            const payload = req.body;
            if (
                !(
                    payload.academic_id  &&
                    payload.name
                )
            ) {
                return res
                .status(400)
                .send({ status: "FAILED", data: { error: "Some field is missing" } });
            }
            const classroom = await classroomService.createClassroom(userId, payload);
            res.status(201).send({ status: "OK", data: classroom });
        } else {
            res.status(403).send({
                status: "FAILED",
                data: { message: "You don't have permission to perform this action" },
            });
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
    
};

const getListClassroom = async (req, res) => {
    try {
        const policy = policyFor(req.user);
        if (policy.can("read", "Classroom")) {
            const userId = req.user.user.id;
            const classroom = await classroomService.getListClassroom(userId);
            res.status(200).send({ status: "OK", data: classroom });
        } else {
            res.status(403).send({
                status: "FAILED",
                data: { message: "You don't have permission to perform this action" },
            });
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getClassroomById = async (req, res) => {
    try {
        const policy = policyFor(req.user);
        if (policy.can("read", "Classroom")) {
            const id = req.params.id;
            const classroom = await classroomService.getClassroomById(id);
            res.status(200).send({ status: "OK", data: classroom });
        } else {
            res.status(403).send({
                status: "FAILED",
                data: { message: "You don't have permission to perform this action" },
            });
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getAllClassroom = async (req, res) => {
    try {
        const policy = policyFor(req.user);
        if (policy.can("read", "Classroom")) {
            const userId = req.user.user.id;
            const classroom = await classroomService.getAllClassroom(userId);
            res.status(200).send({ status: "OK", data: classroom });
        } else {
            res.status(403).send({
                status: "FAILED",
                data: { message: "You don't have permission to perform this action" },
            });
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const inputStudent = async (req, res) => {
    try {
        const policy = policyFor(req.user);
        if (policy.can("create", "Thesis_Student")) {
            const payload = req.body;
            if (
                !(
                    payload.classroom_id  &&
                    payload.students
                )
            ) {
                return res
                .status(400)
                .send({ status: "FAILED", data: { error: "Some field is missing" } });
            }
            const thesis_student = await classroomService.inputStudents(payload);
            res.status(201).send({ status: "OK", data: thesis_student });
        } else {
            res.status(403).send({
                status: "FAILED",
                data: { message: "You don't have permission to perform this action" },
            });
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteClassroomById = async (req, res) => {
    try {
        const policy = policyFor(req.user);
        if (policy.can("delete", "Classroom")) {
            const id = req.params.id;
            await classroomService.deleteClassroomById(id);
            res.status(200).send({ status: "OK" });
        } else {
            res.status(403).send({
                status: "FAILED",
                data: { message: "You don't have permission to perform this action" },
            });
        }
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteStudentById = async (req, res) => {
    try {
        const policy = policyFor(req.user);
        if (policy.can("delete", "Thesis_Student")) {
            const id = req.params.id;
            await classroomService.deleteStudentById(id);
            res.status(200).send({ status: "OK" });
        } else {
            res.status(403).send({
                status: "FAILED",
                data: { message: "You don't have permission to perform this action" },
            });
        }
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    createClassroom,
    getListClassroom,
    getClassroomById,
    getAllClassroom,
    inputStudent,
    deleteClassroomById,
    deleteStudentById,

}



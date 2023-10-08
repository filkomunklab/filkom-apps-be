//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const express = require("express");
const router = express.Router();
const adminService = require("./admin.service");

const getAllAdmins = async (req, res) => {
  const admin = await adminService.getAllAdmins();
  res.send({ status: "OK", data: admin });
};

const getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await adminService.getAdminById(id);
    //Todo: format data
    res.send({ status: "OK", data: admin });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createAdmin = async (req, res) => {
  const payload = req.body;
  const admin = await adminService.createAdmin(payload);
  res.status(201).send({ status: "OK", data: admin });
};

const deleteAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    await adminService.deleteAdminById(id);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const patchAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const admin = await adminService.updateOrPatchAdminById(id, payload);
    res.send({ status: "OK", data: admin });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;

    if (!(payload.username && payload.email && payload.password)) {
      return res.status(400).send("some field is missing");
    }
    const admin = await adminService.updateOrPatchAdminById(id, payload);
    res.send({ status: "OK", data: admin });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  deleteAdminById,
  patchAdminById,
  updateAdminById,
};

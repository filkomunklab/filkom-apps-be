//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const adminService = require("./admin.service");
const { policyFor } = require("../policy");

const getAllAdmins = async (req, res) => {
  const policy = policyFor(req.user);
  if (policy.can("read", "Admin")) {
    const admin = await adminService.getAllAdmins();
    res.status(200).send({ status: "OK", data: admin });
  } else {
    res.status(500).send({
      status: "FAILED",
      data: { message: "You dont have permission to get all admins" },
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const policy = policyFor(req.user);
    if (policy.can("read", "Admin")) {
      const id = req.params.id;
      const admin = await adminService.getAdminById(id);
      //Todo: format data
      res.status(200).send({ status: "OK", data: admin });
    } else {
      res.status(500).send({
        status: "FAILED",
        data: { message: "You dont have permission to get all admins" },
      });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createAdmin = async (req, res) => {
  const policy = policyFor(req.user);
  if (policy.can("create", "Admin")) {
    const payload = req.body;
    const admin = await adminService.createAdmin(payload);
    res.status(201).send({ status: "OK", data: admin });
  } else {
    res.status(500).send({
      status: "FAILED",
      data: { message: "You dont have permission to create new admin" },
    });
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const policy = policyFor(req.user);
    if (policy.can("delete", "Admin")) {
      const id = req.params.id;
      await adminService.deleteAdminById(id);
      res.status(200).send({ status: "OK" });
    } else {
      res.status(500).send({
        status: "FAILED",
        data: { message: "You dont have permission to delete admin" },
      });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const patchAdminById = async (req, res) => {
  try {
    const policy = policyFor(req.user);
    if (policy.can("update", "Admin")) {
      const id = req.params.id;
      const payload = req.body;
      const admin = await adminService.updateOrPatchAdminById(id, payload);
      res.send({ status: "OK", data: admin });
    } else {
      res.status(500).send({
        status: "FAILED",
        data: { message: "You dont have permission to delete admin" },
      });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateAdminById = async (req, res) => {
  try {
    const policy = policyFor(req.user);
    if (policy.can("update", "Admin")) {
      const id = req.params.id;
      const payload = req.body;
      if (!(payload.username && payload.email && payload.password)) {
        return res
          .status(400)
          .send({ status: "FAILED", data: { error: "some field is missing" } });
      }
      const admin = await adminService.updateOrPatchAdminById(id, payload);
      res.send({ status: "OK", data: admin });
    } else {
      res.status(500).send({
        status: "FAILED",
        data: { message: "You dont have permission to delete admin" },
      });
    }
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

const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/* GET users listing. */
router.get("/users", async function (req, res) {
  const user = await prisma.user.findMany();
  res.status(200).send({ data: user });
});

router.post("/users", async (req, res) => {
  const newUserData = req.body;
  const user = await prisma.user.create({
    data: {
      name: newUserData.name,
      email: newUserData.email,
      password: newUserData.password,
    },
  });

  res.status(200).send("create user success");
});

module.exports = router;

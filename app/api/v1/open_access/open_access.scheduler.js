const cron = require("node-cron");
const accessRepository = require("./open_access.repository");

cron.schedule("0 0 * * *", async () => {
  try {
    await accessRepository.automateCloesGradesAccess();
  } catch (error) {
    console.log(error);
  }
});

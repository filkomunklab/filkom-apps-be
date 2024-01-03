const cron = require("node-cron");
const preRegisRepository = require("./preRegis.repository");

cron.schedule("0 0 * * *", async () => {
  try {
    await preRegisRepository.automateClosePreRegist();
  } catch (error) {
    console.log(error);
  }
});

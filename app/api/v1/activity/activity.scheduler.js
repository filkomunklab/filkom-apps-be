const cron = require("node-cron");
const activitiyRepository = require("./activity.repository");

cron.schedule("0 0 * * *", async () => {
  try {
    await activitiyRepository.automateCloseActivity();
  } catch (error) {
    console.log(error);
  }
});

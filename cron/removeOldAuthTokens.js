const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { authService } = require('../services');

dayJs.extend(utc);

module.exports = async () => {
  try {
    const oneMonthBeforeNow = dayJs()
      .utc()
      .subtract(1,'month'); //minus one hour/month from date of create token

    const deleteInfo = await authService.deleteMany({
      createdAt: { $lte: oneMonthBeforeNow}
    });

    console.log(deleteInfo);
  } catch (e) {
    console.log(e);
  }
};

const cron = require('node-cron');

const removeOldAuthTokens = require('./removeOldAuthTokens');

module.exports = () => {
  // cron.schedule('*/10 * * * * *', removeOldAuthTokens); //start every 10 seconds
  cron.schedule('0 4 * * * *', removeOldAuthTokens); //start every day at 4:00

};

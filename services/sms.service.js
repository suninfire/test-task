const twilio = require('twilio');

const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID} = require('../сonfigs/config');

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = {
  sendSMS: async (phone,body) => {

    try {
      await client.messages.create({
        body,
        messagingServiceSid: TWILIO_SERVICE_SID,
        to: phone});
    } catch (e) {
      console.log(e.message);
    }
  }
};


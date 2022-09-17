const {emailActionEnum} = require('../constants');
module.exports = {
  [emailActionEnum.WELCOME]: {
    subject: 'Welcome',
    templateName: 'welcome'
  },

  [emailActionEnum.FORGOT_PASSWORD]: {
    subject: 'Forgot password',
    templateName: 'forgot_pass'
  },

  [emailActionEnum.ORDER_ARRIVED]: {
    subject: 'Order arr',
    templateName: 'order_arrived'
  },

};

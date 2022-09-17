const {emailActionEnum} = require('../constants');
module.exports = {
  [emailActionEnum.WELCOME]: {
    subject: 'Welcome',
    templateName: 'welcome'
  },

  [emailActionEnum.ORDER_ARRIVED]: {
    subject: 'Order arr',
    templateName: 'order_arrived'
  },

};

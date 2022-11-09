const {emailActionEnum} = require('../constants');

module.exports = {

  [emailActionEnum.ADDED]: {
    subject: 'position_added',
    templateName: 'position_added'
  },
  [emailActionEnum.REMOVED]: {
    subject: 'position_removed',
    templateName: 'position_removed'
  }
};

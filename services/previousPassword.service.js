const { PreviousPassword } = require('../dataBase');

module.exports = {
  savePassword(oldPassInfo) {
    return PreviousPassword.create(oldPassInfo);
  },

  getByUserId(userId) {
    return PreviousPassword.find({ user: userId}).lean();
  },

  deleteManyBeforeDate(date) {
    return PreviousPassword.deleteMany({ createdAt: { $lte: date }});
  },

};

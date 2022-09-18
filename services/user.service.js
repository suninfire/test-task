const {User} = require('../dataBase');

module.exports = {

  getAllUsers(filter = {}) {
    return User.find(filter);
  },

  getOneByParams(filter) {
    return User.findOne(filter); //  filter is object
  },

  getOneById(id) { // id is params (userId)
    return User
      .findById(id)
      .select('+cars')
      .populate('cars');
  },

  updateUserById(userId, newUserObject) {
    return User.findOneAndUpdate({_id: userId}, newUserObject, {new: true}); // new:true - returned new object(user)
  },

  deleteUserById(userId) {
    return User.deleteOne({_id: userId});
  }
};

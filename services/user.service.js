const {User} = require('../dataBase');

module.exports = {

  getAllUsers(filter = {}) {
    return User.find(filter);
  },

  createUser(userObject) {
    return User.create(userObject);
  },

  getOneByParams(filter) {
    return User.findOne(filter); //  filter is object
  },

  getOneById(id) {
    return User.findById(id).select(['+cars'])
      .populate('cars'); // id is params (userId)
  },

  updateUserById(userId, newUserObject) {
    return User.findOneAndUpdate({_id: userId}, newUserObject, {new: true}); // new:true - returned new object(user)
  },

  deleteUserById(userId) {
    return User.deleteOne({_id: userId});
  }
};
